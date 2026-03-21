# Architect Plan: Task 1.5 — Plan Generation Trigger

## Overview
Implement a queue-based plan generation system triggered after onboarding completion. Uses Bull + Redis for async job processing. The backend queues a job when a profile is created, and exposes a status endpoint for frontend polling. The frontend is updated to call the API and poll for real progress.

## Current State
- `POST /users/profile` creates profile and immediately sets `onboardingCompleted: true`
- Frontend `useOnboarding` saves data to localStorage and fakes generation progress with a timer
- No API call is made from the frontend to submit onboarding data
- No queue system exists

## Architecture Decisions
1. **Bull + Redis** for job queue — standard NestJS pattern
2. **Separate `plan-generation` module** to keep queue logic isolated from users module
3. **Store `planGenerationJobId` on UserProfile** — allows status lookups without extra tables
4. **Profile creation no longer sets `onboardingCompleted: true`** — the job processor does this
5. **Frontend uses TanStack Query** — `useMutation` for profile submission, `useQuery` with polling for status
6. **Simulated progress** — the processor adds artificial delays to simulate AI work (will be replaced in Phase 2)

## Files to Create/Modify

### Backend

#### 1. Dependencies
- Install: `@nestjs/bull bull ioredis @types/bull`
- Add `REDIS_URL` to env validation (optional, default `redis://localhost:6379`)

#### 2. New Module: `apps/api/src/modules/plan-generation/`

**`plan-generation.module.ts`**
- Register Bull queue named `plan-generation`
- Import PrismaModule, UsersModule
- Export PlanGenerationService

**`plan-generation.processor.ts`**
- `@Processor('plan-generation')`
- `@Process('generate-plans')` handler:
  1. Simulate AI work with delays (5 steps, ~1s each)
  2. Update UserProfile: `onboardingCompleted: true`, `onboardingCompletedAt: now()`
  3. Job progress reported via `job.progress()`

**`plan-generation.service.ts`**
- `triggerPlanGeneration(userId: string): Promise<{ jobId: string }>` — adds job to queue
- `getJobStatus(jobId: string): Promise<{ status, progress }>` — returns job state

#### 3. Modify: `apps/api/src/modules/users/users.service.ts`
- `createProfile()`: Remove `onboardingCompleted: true` and `onboardingCompletedAt` from create data
- Add `setOnboardingComplete(userId: string)` method for the processor to call

#### 4. Modify: `apps/api/src/modules/users/users.controller.ts`
- `POST /users/profile` response now includes `jobId` from plan generation trigger
- New endpoint: `GET /users/onboarding-status` — returns `{ status: 'pending' | 'processing' | 'complete', progress: 0-100 }`

#### 5. New DTO: `apps/api/src/modules/users/dto/onboarding-status-response.dto.ts`
- `status: 'pending' | 'processing' | 'complete' | 'failed'`
- `progress: number` (0-100)

#### 6. Modify: `apps/api/src/config/env.validation.ts`
- Add `REDIS_URL` optional field with default

#### 7. Modify: `apps/api/src/app.module.ts`
- Import `BullModule.forRoot()` with Redis config
- Import `PlanGenerationModule`

#### 8. Prisma Schema
- Add `planGenerationJobId String?` to UserProfile model
- Run migration

### Frontend

#### 9. New Hook: `apps/web/src/features/onboarding/hooks/useOnboardingSubmit.ts`
- `useMutation` calling `POST /users/profile` with onboarding data
- On success, stores jobId and triggers status polling
- `useQuery` with `refetchInterval: 2000` polling `GET /users/onboarding-status`
- Returns: `{ submit, isSubmitting, jobStatus, progress, error }`

#### 10. Modify: `apps/web/src/features/onboarding/hooks/useOnboarding.ts`
- Replace fake progress timer with real API submission
- On last step "Generate My Plan", call `submit()` from useOnboardingSubmit
- Map API status/progress to existing `isGenerating` and `generationProgress` state

#### 11. Modify: `apps/web/src/features/onboarding/components/GeneratingScreen.tsx`
- Add error state handling (show error message + retry button)
- "Go to Dashboard" navigates to `/dashboard` (or `/` for now) on completion

#### 12. Modify: `apps/web/src/features/onboarding/components/OnboardingScreen.tsx`
- Pass submit error state down
- Handle submission loading state on the "Generate My Plan" button

## Data Flow

```
[Frontend: Last Step]
  → POST /users/profile (onboarding data)
  → Backend creates profile + queues job
  → Returns { profile, jobId }

[Frontend: GeneratingScreen]
  → GET /users/onboarding-status (poll every 2s)
  → Backend checks Bull job progress
  → Returns { status, progress }

[Backend: Job Processor]
  → Simulates 5 steps with delays
  → Reports progress via job.progress()
  → On complete: sets onboardingCompleted = true
  → Clears localStorage on frontend when complete
```

## Error Handling
- 401: Missing/invalid JWT on all endpoints
- 409: Profile already exists (profile creation)
- 404: No active job found (status endpoint returns `{ status: 'complete', progress: 100 }` if profile is already complete)
- 500: Queue/Redis connection failure — graceful fallback: create profile synchronously and return complete status
- Frontend: Show error state in GeneratingScreen with retry option

## Acceptance Criteria Match
- ✅ Job is queued after onboarding → Bull job triggered in createProfile
- ✅ Frontend can poll status → GET /users/onboarding-status with useQuery polling
- ✅ User marked as complete when done → Processor sets onboardingCompleted = true
