# Architect Plan — Task 5.2: Progress Analytics Backend

## Overview
Extend the existing Progress module with analytics endpoints for strength progression, training volume, workout consistency (heatmap), streaks, and a combined summary. All endpoints are backend-only (no frontend in this task).

## Current State
- `ProgressModule` exists with weight logging (`POST /progress/weight`, `GET /progress/weight?period=`)
- `WorkoutsService` has `calculateStreaks()` and `calculatePersonalRecords()` for workout stats
- `WorkoutLog` model stores exercises as JSON array of `{ exerciseName, sets: [{ setNumber, weight, reps, rpe? }], notes? }`
- `WeightLog` model tracks weight over time
- `UserProfile` has `targetWeight`

## New Endpoints

### 1. `GET /progress/strength/:exercise?period=`
Returns strength progression data for a specific exercise over time.

**Response DTO: `StrengthProgressResponseDto`**
```
{
  exercise: string;
  data: Array<{
    date: string;        // ISO date of workout
    maxWeight: number;   // heaviest set weight
    totalVolume: number; // sum(weight * reps) across all sets
    bestSet: { weight: number; reps: number; }
  }>;
  startMaxWeight: number | null;
  currentMaxWeight: number | null;
  improvementKg: number | null;
  improvementPercent: number | null;
}
```

### 2. `GET /progress/volume?period=`
Returns total training volume over time (weekly aggregated).

**Response DTO: `VolumeProgressResponseDto`**
```
{
  weeklyData: Array<{
    weekStart: string;  // ISO date (Monday)
    totalVolume: number; // sum of all weight*reps across all exercises
    workoutCount: number;
    avgVolumePerWorkout: number;
  }>;
  totalVolume: number;
  avgWeeklyVolume: number;
}
```

### 3. `GET /progress/consistency?period=`
Returns workout consistency data (calendar heatmap format).

**Response DTO: `ConsistencyResponseDto`**
```
{
  dailyData: Array<{
    date: string;        // ISO date
    workoutCount: number;
    totalDuration: number; // minutes
  }>;
  totalWorkouts: number;
  workoutsPerWeek: number; // average
  currentStreak: number;
  bestStreak: number;
}
```

### 4. `GET /progress/summary`
Returns combined summary stats (no period filter — all-time + recent).

**Response DTO: `ProgressSummaryResponseDto`**
```
{
  weight: {
    startWeight: number | null;
    currentWeight: number | null;
    targetWeight: number | null;
    change: number | null;
    changePercent: number | null;
  };
  workouts: {
    totalCompleted: number;
    thisWeek: number;
    thisMonth: number;
    currentStreak: number;
    bestStreak: number;
  };
  volume: {
    thisWeekVolume: number;
    lastWeekVolume: number;
    changePercent: number | null;
  };
  personalRecords: Array<{
    exerciseName: string;
    maxWeight: number;
    repsAtMax: number;
    achievedAt: string;
  }>;
}
```

## Implementation Plan

### DTOs to Create (in `apps/api/src/modules/progress/dto/`)
1. `strength-progress-response.dto.ts` — StrengthProgressResponseDto + StrengthDataPointDto
2. `volume-progress-response.dto.ts` — VolumeProgressResponseDto + WeeklyVolumeDto
3. `consistency-response.dto.ts` — ConsistencyResponseDto + DailyConsistencyDto
4. `progress-summary-response.dto.ts` — ProgressSummaryResponseDto + nested DTOs

### Service Methods to Add (in `progress.service.ts`)
1. `getStrengthProgress(userId, exercise, period)` — Query WorkoutLogs, filter by exercise name, extract max weight + volume per workout date
2. `getVolumeProgress(userId, period)` — Query WorkoutLogs, aggregate by week (Mon-Sun), compute total volume per week
3. `getConsistency(userId, period)` — Query WorkoutLogs, group by date, compute daily counts + durations, calculate streaks
4. `getSummary(userId)` — Combine weight history, workout counts, volume comparison, personal records

### Controller Endpoints to Add (in `progress.controller.ts`)
4 new GET endpoints with `@ApiTags("Progress")`, `@ApiBearerAuth()`, `@UseGuards(JwtAuthGuard)`, appropriate `@ApiOperation`, `@ApiResponse`, `@ApiQuery`, `@ApiParam` decorators.

### Helper Methods (private in service)
- `getStartDate(period)` — already exists
- `calculateStreaks(dates)` — adapted from WorkoutsService
- `getWeekStart(date)` — returns Monday of the given date's week
- Exercise JSON parsing helper — type-safe extraction from WorkoutLog.exercises

## File Changes

### New Files
1. `apps/api/src/modules/progress/dto/strength-progress-response.dto.ts`
2. `apps/api/src/modules/progress/dto/volume-progress-response.dto.ts`
3. `apps/api/src/modules/progress/dto/consistency-response.dto.ts`
4. `apps/api/src/modules/progress/dto/progress-summary-response.dto.ts`

### Modified Files
5. `apps/api/src/modules/progress/progress.controller.ts` — add 4 new endpoints
6. `apps/api/src/modules/progress/progress.service.ts` — add 4 service methods + helpers

### No Changes Needed
- `progress.module.ts` — no new dependencies needed (all queries via PrismaService)
- `app.module.ts` — ProgressModule already registered

## Convention Compliance
- Thin controller: validate input, call service, return response
- Service: all business logic, data transformation
- DTOs: Swagger decorators on all fields (`@ApiProperty`/`@ApiPropertyOptional`)
- Endpoints: `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiQuery`, `@ApiParam`
- Proper HTTP codes: 200 for all GET endpoints, 401 for unauthorized
- Guards: `@UseGuards(JwtAuthGuard)` on controller class (already applied)
- No `any` types — typed interfaces for JSON exercise data
- Logger for key operations
