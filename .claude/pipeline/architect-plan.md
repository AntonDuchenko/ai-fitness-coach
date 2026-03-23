# Architect Plan — Task 4.4: Meal Swapping

## Overview

Add a backend `POST /nutrition/swap-meal` endpoint that generates 3 AI-powered alternative meals with similar macros, and a `POST /nutrition/swap-meal/apply` endpoint that persists the chosen swap to the nutrition plan. Update the frontend to show macro comparisons and use optimistic UI updates.

## Current State

- **Backend:** No swap endpoint. `NutritionService` has `generateRecipe()` and `searchRecipes()`. `NutritionPlan.mealPlan` is stored as JSON in Prisma.
- **Frontend:** `SwapMealPanel.tsx` exists as a presentational component. `useNutritionPlanView` hook has local-only swap logic via `onUseAlternative()` — updates `localMealPlan` state but does NOT persist. Alternatives fetched via generic `GET /nutrition/recipes?type=...`.

## Backend Changes

### 1. New DTO: `SwapMealDto` (`dto/swap-meal.dto.ts`)
```typescript
{
  mealIndex: number;     // @IsInt, @Min(0) — index in mealPlan array
  currentMeal: {         // nested validated object
    name: string;        // @IsString
    mealType: string;    // @IsString
    calories: number;    // @IsInt, @Min(0)
    protein: number;     // @IsInt, @Min(0)
    carbs: number;       // @IsInt, @Min(0)
    fat: number;         // @IsInt, @Min(0)
  }
}
```

### 2. New DTO: `ApplySwapDto` (`dto/apply-swap.dto.ts`)
```typescript
{
  planId: string;        // @IsString
  mealIndex: number;     // @IsInt, @Min(0)
  recipe: {              // the chosen alternative
    name: string;
    mealType: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: { amount: number; unit: string; name: string }[];
    instructions: string;
    prepTime?: number;
    cookTime?: number;
  }
}
```

### 3. New Service Methods

**`generateSwapAlternatives(userId, dto)`:**
1. Load active plan, validate mealIndex in range
2. Load user profile for dietary restrictions
3. Build targeted AI prompt: "Generate 3 alternative [mealType] meals with similar macros (~calories kcal, ~protein P, ~carbs C, ~fat F)"
4. Call `aiService.createJsonCompletion` with model `gpt-4o-mini`
5. Return 3 `RecipeResponseDto[]`

**`applyMealSwap(userId, dto)`:**
1. Load plan by planId, verify ownership
2. Validate mealIndex
3. Replace mealPlan[mealIndex] with the new recipe data
4. `prisma.nutritionPlan.update({ data: { mealPlan: updated } })`
5. Return updated `NutritionPlanResponseDto`

### 4. New Controller Endpoints

| Method | Path | Body | Response | Status |
|--------|------|------|----------|--------|
| POST | `/nutrition/swap-meal` | `SwapMealDto` | `RecipeResponseDto[]` | 201 |
| POST | `/nutrition/swap-meal/apply` | `ApplySwapDto` | `NutritionPlanResponseDto` | 200 |

Both guarded with `@UseGuards(JwtAuthGuard)`, full Swagger decorators.

## Frontend Changes

### 1. New Hook: `useSwapMeal` (`hooks/useSwapMeal.ts`)
- `generateAlternatives` — `useMutation` calling `POST /nutrition/swap-meal`
- `applySwap` — `useMutation` calling `POST /nutrition/swap-meal/apply`
  - Optimistic update: immediately update plan query cache, rollback on error
- State: `swapMealIndex`, `alternatives`, `isGenerating`, `isApplying`

### 2. Update `SwapMealPanel.tsx`
- Add macro comparison section: for each alternative, show diff vs current meal
  - Format: "+20 kcal", "-5g P", etc. with color coding (green = better for goals, red = worse)
- "Generate Alternatives" button (replaces auto-fetch)
- Keep loading skeletons and empty state

### 3. Update `useNutritionPlanView.ts`
- Remove `swapAlternativesQuery` (was auto-fetching generic recipes)
- Remove `onUseAlternative` local handler
- Integrate `useSwapMeal` — expose its state/actions

### 4. Update `NutritionPlanScreen.tsx`
- Wire SwapMealPanel to useSwapMeal data instead of old swap props

## File Changes

### New Files
1. `apps/api/src/modules/nutrition/dto/swap-meal.dto.ts`
2. `apps/api/src/modules/nutrition/dto/apply-swap.dto.ts`
3. `apps/web/src/features/nutrition/hooks/useSwapMeal.ts`
4. `apps/web/src/features/nutrition/components/MacroComparison.tsx`

### Modified Files
1. `apps/api/src/modules/nutrition/nutrition.controller.ts` — 2 new endpoints
2. `apps/api/src/modules/nutrition/nutrition.service.ts` — 2 new methods
3. `apps/web/src/features/nutrition/hooks/useNutritionPlanView.ts` — remove old swap, integrate new
4. `apps/web/src/features/nutrition/components/SwapMealPanel.tsx` — macro comparison, generate button
5. `apps/web/src/features/nutrition/components/NutritionPlanScreen.tsx` — wire new hook

## Convention Compliance
- DTOs: class-validator decorators, nested validation with @ValidateNested + @Type
- Swagger: @ApiTags, @ApiOperation, @ApiResponse on all endpoints
- Business logic in service (backend) / hooks (frontend)
- All API calls via TanStack Query useMutation
- UI uses shadcn/ui Badge for macro comparison
- Semantic design tokens only (no hardcoded hex)
- Optimistic UI via queryClient.setQueryData + onError rollback
- All components under 150 lines
- 4 async states: loading skeleton, error message, empty state, success
