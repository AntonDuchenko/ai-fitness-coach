# Architect Plan: Task 3.3 — Workout Logging Backend

## Overview
Add workout logging endpoints to the existing workouts module: log completed workouts, fetch history, get specific logs, delete logs, calculate streaks, and track personal records (PRs).

## Data Model
Already exists in Prisma schema (`WorkoutLog` model) — no schema changes needed. The `exercises` field is a JSON column storing `ExerciseLog[]`.

## DTOs to Create

### Input DTOs (`dto/`)

1. **`set-log.dto.ts`** — `SetLogDto`
   - `setNumber: number` (@IsInt)
   - `weight: number` (@IsNumber)
   - `reps: number` (@IsInt)
   - `rpe?: number` (@IsInt, @Min(1), @Max(10), @IsOptional)

2. **`exercise-log.dto.ts`** — `ExerciseLogDto`
   - `exerciseName: string` (@IsString)
   - `sets: SetLogDto[]` (@IsArray, @ValidateNested, @Type)
   - `notes?: string` (@IsString, @IsOptional)

3. **`create-workout-log.dto.ts`** — `CreateWorkoutLogDto`
   - `workoutPlanId: string` (@IsString)
   - `workoutName: string` (@IsString)
   - `exercises: ExerciseLogDto[]` (@IsArray, @ValidateNested, @Type)
   - `duration?: number` (@IsNumber, @IsOptional)
   - `rating?: number` (@IsInt, @Min(1), @Max(5), @IsOptional)
   - `notes?: string` (@IsString, @IsOptional)

### Response DTOs

4. **`workout-log-response.dto.ts`** — `WorkoutLogResponseDto`
   - Maps from WorkoutLog entity
   - All fields from the model with Swagger decorators

5. **`workout-stats-response.dto.ts`** — `WorkoutStatsResponseDto`
   - `totalWorkouts: number`
   - `currentStreak: number`
   - `longestStreak: number`
   - `personalRecords: PersonalRecordDto[]`

6. **`personal-record.dto.ts`** — `PersonalRecordDto`
   - `exerciseName: string`
   - `maxWeight: number`
   - `maxReps: number`
   - `achievedAt: Date`

## Controller Endpoints (add to existing `WorkoutsController`)

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| POST | `/workouts/log` | Log completed workout | 201 |
| GET | `/workouts/logs` | Get workout history (query: `limit`, `offset`) | 200 |
| GET | `/workouts/log/:id` | Get specific log | 200 |
| DELETE | `/workouts/log/:id` | Delete a log | 204 |
| GET | `/workouts/stats` | Get streaks + PRs | 200 |

All endpoints: `@UseGuards(JwtAuthGuard)`, `@ApiBearerAuth()`, full Swagger decorators.

## Service Methods (add to existing `WorkoutsService`)

1. **`logWorkout(userId, dto)`** — Creates WorkoutLog, returns response DTO
2. **`getWorkoutLogs(userId, limit, offset)`** — Paginated history, ordered by completedAt desc
3. **`getWorkoutLog(userId, logId)`** — Single log by ID, scoped to user
4. **`deleteWorkoutLog(userId, logId)`** — Delete log, scoped to user
5. **`getWorkoutStats(userId)`** — Calculates:
   - Total workout count
   - Current streak (consecutive days with logged workouts, allowing 1-day gaps for rest days)
   - Longest streak
   - Personal records (max weight per exercise across all logs)

### Streak Calculation Logic
- Fetch all log dates for user, ordered desc
- Group by calendar date
- Count consecutive days (a gap of exactly 1 day is allowed — rest day)
- A gap of 2+ days breaks the streak

### Personal Records Logic
- Flatten all exercise logs across all workout logs
- For each unique exercise, find the max weight lifted (with reps)
- Return as PersonalRecordDto[]

## Files to Create/Modify

### New files:
- `apps/api/src/modules/workouts/dto/set-log.dto.ts`
- `apps/api/src/modules/workouts/dto/exercise-log.dto.ts`
- `apps/api/src/modules/workouts/dto/create-workout-log.dto.ts`
- `apps/api/src/modules/workouts/dto/workout-log-response.dto.ts`
- `apps/api/src/modules/workouts/dto/workout-stats-response.dto.ts`
- `apps/api/src/modules/workouts/dto/personal-record.dto.ts`

### Modified files:
- `apps/api/src/modules/workouts/workouts.controller.ts` — Add 5 new endpoints
- `apps/api/src/modules/workouts/workouts.service.ts` — Add 5 new methods + streak/PR helpers

## Convention Compliance
- Thin controller: validate -> delegate to service -> return response
- class-validator decorators on all DTOs
- Swagger decorators on all endpoints
- JwtAuthGuard on all endpoints
- Proper HTTP codes (201 create, 200 success, 204 no content, 404 not found)
- Structured error responses via NestJS exceptions
- No `any` types
- NestJS Logger for logging
