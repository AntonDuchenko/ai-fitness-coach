# Architect Plan: Task 3.1 — Workout Plan Display Backend

## Overview
Add missing endpoints to the existing Workouts module to support the frontend workout display: get today's workout by day of week, and an explicit regenerate endpoint.

## Gap Analysis
The workouts module already has:
- `POST /workouts/generate` — generates plan, archives old ones
- `GET /workouts/plan` — gets active plan
- `GET /workouts/plan/:id` — gets specific plan
- `GET /workouts/plans` — lists all plans
- `getCurrentPlan()`, `getActivePlan()`, `getPlanById()`, `getUserPlans()`

**Missing per Task 3.1:**
1. `GET /workouts/day/:dayOfWeek` — get a specific day's workout from the active plan
2. `POST /workouts/plan/regenerate` — explicit regenerate (alias for generate, semantic clarity)
3. `getTodaysWorkout(userId, dayOfWeek)` service method
4. `WorkoutDayResponseDto` — typed response DTO for a single workout day

## Implementation Steps

### 1. Create `WorkoutDayResponseDto` (`dto/workout-day-response.dto.ts`)
- Fields: `dayOfWeek`, `focus`, `duration`, `exercises` (typed array)
- Nested `ExerciseDto` class with Swagger decorators
- Constructor that maps from the JSON weeklySchedule entry

### 2. Add `getTodaysWorkout()` to `WorkoutsService`
```typescript
async getTodaysWorkout(userId: string, dayOfWeek?: string): Promise<WorkoutDayResponseDto | null> {
  const plan = await this.getCurrentPlan(userId);
  if (!plan) return null;

  const targetDay = dayOfWeek || new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const schedule = plan.weeklySchedule as GeneratedWorkoutDay[];
  const workout = schedule.find(w => w.dayOfWeek.toLowerCase() === targetDay.toLowerCase());

  return workout ? new WorkoutDayResponseDto(workout) : null;
}
```

### 3. Add `regeneratePlan()` to `WorkoutsService`
- Delegates to `generatePlan()` — same behavior, explicit name for semantic clarity

### 4. Add controller endpoints
- `GET /workouts/day/:dayOfWeek` → calls `getTodaysWorkout()`
  - Returns 200 with workout day data, or 404 if no plan or no workout for that day
  - Swagger: `@ApiParam` for dayOfWeek with enum of weekday names
- `POST /workouts/plan/regenerate` → calls `regeneratePlan()`
  - Returns 201 with new plan
  - Swagger decorators matching existing generate endpoint

### 5. Add `GET /workouts/today` convenience endpoint
- No params, auto-resolves current day of week
- Returns workout for today or 404 with "Rest day" message

## Files to Create
1. `apps/api/src/modules/workouts/dto/workout-day-response.dto.ts`

## Files to Modify
1. `apps/api/src/modules/workouts/workouts.service.ts`
2. `apps/api/src/modules/workouts/workouts.controller.ts`

## No Changes Needed
- Schema (WorkoutPlan model already has weeklySchedule JSON)
- Module file (no new imports needed)
- Frontend (Task 3.2)
