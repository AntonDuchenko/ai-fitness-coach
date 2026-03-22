# Architect Plan — Task 2.5: Workout Plan Generation (AI)

## Overview
Implement AI-powered workout plan generation. The system takes a user's profile (goals, equipment, schedule, fitness level, injuries) and calls OpenAI to generate a personalized multi-day workout plan in structured JSON. The plan is saved to the database and returned.

## Existing Infrastructure
- `AiService.createChatCompletion()` — calls OpenAI with retry logic, error mapping
- `ContextService` — builds AI context from user profile
- `WorkoutsService` — has `getCurrentPlan(userId)`, used by ContextService
- `WorkoutsModule` — registered in AppModule, exports WorkoutsService
- `WorkoutsController` — empty scaffold with `@ApiTags("Workouts")`
- Prisma `WorkoutPlan` model — `id, userId, name, weeklySchedule (Json), startDate, durationWeeks, progressionScheme, deloadWeek, notes, isActive`
- Prisma `UserProfile` model — has all profile fields needed for prompt building
- `AiModule` imports WorkoutsModule and NutritionModule, exports AiService + ContextService

## Architecture Decisions

### Where to put generation logic
The workout plan **generation** logic belongs in `WorkoutsService` since it's workout domain logic. `WorkoutsService` will depend on `AiService` for the OpenAI call. This keeps AI as a utility and domain logic in the domain module.

### Module dependency
`WorkoutsModule` needs to import `AiModule` to get `AiService`. Currently `AiModule` imports `WorkoutsModule` (for ContextService). This creates a circular dependency.

**Solution:** Extract the plan generation prompt building into `WorkoutsService` directly (no ContextService needed — the prompt is workout-specific, not chat-specific). Use `forwardRef` to break the circular dependency between AiModule and WorkoutsModule, OR better: have WorkoutsModule import AiModule's `AiService` directly via a shared approach. Since `AiModule` already exports `AiService`, we can use `forwardRef(() => AiModule)` in WorkoutsModule.

### JSON response handling
Use `response_format: { type: 'json_object' }` in the OpenAI call. Add a dedicated method in `AiService` for JSON completions: `createJsonCompletion()`. Add retry on JSON parse failure (up to 2 retries).

## Files to Create/Modify

### 1. New: `apps/api/src/modules/workouts/dto/generate-plan-response.dto.ts`
Response DTO for the generated workout plan:
- `GeneratePlanResponseDto` — `{ id, name, weeklySchedule, durationWeeks, progressionScheme, deloadWeek, notes, startDate, isActive, createdAt }`

### 2. New: `apps/api/src/modules/workouts/dto/workout-plan-response.dto.ts`
Shared DTO for returning a workout plan:
- `WorkoutPlanResponseDto` — same structure, reusable for GET endpoints

### 3. Modify: `apps/api/src/modules/ai/ai.service.ts`
Add `createJsonCompletion()` method:
- Same as `createChatCompletion()` but adds `response_format: { type: 'json_object' }`
- Parses JSON from response, retries if parse fails
- Returns parsed object (typed as `T` generic)

### 4. Modify: `apps/api/src/modules/workouts/workouts.service.ts`
Add methods:
- `generatePlan(userId: string)` — main orchestration:
  1. Fetch user profile from Prisma
  2. Validate profile exists and has required fields
  3. Build workout prompt via `buildWorkoutPlanPrompt()`
  4. Call `AiService.createJsonCompletion()` with GPT-4o and temperature 0.8
  5. Validate the response structure
  6. Deactivate any existing active plan
  7. Save new plan to DB with `isActive: true`, `startDate: now`
  8. Return saved plan
- `buildWorkoutPlanPrompt(profile: UserProfile)` — builds the prompt per task spec
- `validatePlanStructure(data: unknown)` — validates JSON has required fields
- `getActivePlan(userId: string)` — get current active plan (rename from getCurrentPlan for clarity, keep getCurrentPlan as alias)
- `getPlanById(userId: string, planId: string)` — get specific plan
- `getUserPlans(userId: string)` — list all plans for user

### 5. Modify: `apps/api/src/modules/workouts/workouts.controller.ts`
Add endpoints:
- `POST /workouts/generate` — trigger plan generation, 201 response
- `GET /workouts/plan` — get current active plan, 200 response
- `GET /workouts/plans` — list all plans, 200 response
- `GET /workouts/plan/:id` — get specific plan, 200 response

All guarded with `JwtAuthGuard`, Swagger-decorated.

### 6. Modify: `apps/api/src/modules/workouts/workouts.module.ts`
- Import `AiModule` (via `forwardRef`)
- Inject `AiService` into WorkoutsService

## Prompt Design
The prompt follows the task spec exactly — includes user profile data (age, gender, goal, experience, training days, session duration, equipment, injuries) and requests a structured JSON response with weekly schedule, exercises (with sets/reps/rest/notes/alternatives), progression scheme, and deload week.

Key additions to the spec prompt:
- System message establishing AI as a certified trainer
- Explicit instruction to return ONLY valid JSON (no markdown wrapping)
- Use `max_tokens: 4000` for complete plans

## Validation
After receiving AI response:
- Verify `name` is string
- Verify `weeklySchedule` is array with correct number of days
- Verify each day has `dayOfWeek`, `focus`, `exercises` array
- Verify each exercise has `name`, `muscleGroup`, `sets`, `reps`
- If validation fails, throw `BadGatewayException`

## Error Handling
- Profile not found → 404 `NotFoundException`
- Profile incomplete (missing critical fields) → 422 `UnprocessableEntityException`
- AI service failure → 502 `BadGatewayException` (from AiService)
- Invalid JSON from AI → 502 `BadGatewayException` with retry

## Implementation Order
1. Add `createJsonCompletion()` to AiService
2. Create response DTOs
3. Implement WorkoutsService methods (prompt builder, validator, generatePlan)
4. Implement WorkoutsController endpoints
5. Update WorkoutsModule imports

## Convention Compliance
- Thin controller — all logic in WorkoutsService
- class-validator on DTOs, Swagger on every endpoint
- HTTP codes: 201 (generate), 200 (get), 404 (not found), 422 (validation)
- JwtAuthGuard on all endpoints
- No `any` types — use generics for JSON completion
- Proper Logger usage (NestJS Logger)
