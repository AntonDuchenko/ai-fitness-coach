# Architect Plan: Task 4.1 — Nutrition Plan Display Backend

## Overview
Complete the nutrition module by adding missing endpoints: `POST /nutrition/plan/regenerate` and `GET /nutrition/recipes`. The module already has `generatePlan`, `getActivePlan`, `getPlanById`, `getUserPlans`. We need regeneration (mirroring the workouts pattern) and recipe search/generation.

## Existing Code Analysis
- **Controller:** `nutrition.controller.ts` — 4 endpoints: POST generate, GET plan, GET plans, GET plan/:id
- **Service:** `nutrition.service.ts` — Full implementation with TDEE/macro calculation, AI prompt building, plan validation
- **DTO:** `nutrition-plan-response.dto.ts` — Maps NutritionPlan entity
- **Module:** Imports AiModule, exports NutritionService

## What's Missing (from Task Requirements)

### 1. `POST /nutrition/plan/regenerate`
Regenerate nutrition plan (archives current, generates new). Follow same pattern as `WorkoutsController.regeneratePlan` — simply call `generatePlan` which already deactivates the current plan first.

### 2. `GET /nutrition/recipes?search=&type=`
On-demand recipe search/generation via AI. Returns recipe suggestions matching search criteria and meal type.

## New DTOs

### `dto/recipe-request-query.dto.ts` — `RecipeRequestQueryDto`
- `search?: string` (@IsString, @IsOptional) — search term/keyword
- `type?: string` (@IsString, @IsOptional) — meal type filter: "breakfast", "lunch", "dinner", "snack"

### `dto/recipe-response.dto.ts` — `RecipeResponseDto`
- `name: string`
- `mealType: string`
- `calories: number`
- `protein: number`
- `carbs: number`
- `fat: number`
- `prepTime: number`
- `cookTime: number`
- `difficulty: string`
- `servings: number`
- `ingredients: { amount: number; unit: string; name: string }[]`
- `instructions: string`

## New Controller Endpoints

| Method | Path | Description | Status |
|--------|------|-------------|--------|
| POST | `/nutrition/plan/regenerate` | Regenerate nutrition plan | 201 |
| GET | `/nutrition/recipes` | Search/generate recipes via AI | 200 |

All endpoints: `@UseGuards(JwtAuthGuard)`, `@ApiBearerAuth()`, full Swagger decorators.

## New Service Methods

### `regeneratePlan(userId: string)`
- Log the regeneration
- Delegate to existing `generatePlan(userId)` (which already deactivates the old plan)

### `searchRecipes(userId: string, search?: string, type?: string)`
- Fetch user profile for dietary restrictions context
- Build AI prompt for recipe generation based on search/type/restrictions
- Call `aiService.createJsonCompletion` to generate 3 matching recipes
- Validate response structure
- Return `RecipeResponseDto[]`

## Files to Create
- `apps/api/src/modules/nutrition/dto/recipe-request-query.dto.ts`
- `apps/api/src/modules/nutrition/dto/recipe-response.dto.ts`

## Files to Modify
- `apps/api/src/modules/nutrition/nutrition.controller.ts` — Add 2 endpoints
- `apps/api/src/modules/nutrition/nutrition.service.ts` — Add 2 methods + recipe prompt builder + recipe validation

## Convention Compliance
- Thin controller: validate -> delegate to service -> return response
- class-validator decorators on all DTOs
- Swagger decorators on all endpoints
- JwtAuthGuard on all endpoints
- Proper HTTP codes (201 for regenerate, 200 for recipes)
- Structured error responses via NestJS exceptions
- No `any` types
- NestJS Logger for logging
