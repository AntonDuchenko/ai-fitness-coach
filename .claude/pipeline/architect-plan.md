# Architect Plan: Task 4.3 — Recipe Generator (AI)

## Overview
Add a dedicated `POST /nutrition/recipe/generate` endpoint that generates a single recipe based on specific meal type, target macros, and dietary restrictions. Unlike the existing `GET /nutrition/recipes` (which is a general search), this endpoint takes precise macro targets and validates the generated recipe hits them within 10%.

## Existing Code Analysis
- **Controller:** `nutrition.controller.ts` — Has POST generate, GET plan, GET plans, GET plan/:id, POST plan/regenerate, GET recipes
- **Service:** `nutrition.service.ts` — Has `searchRecipes` (general), `generatePlan`, TDEE/macro calculation, AI prompt building
- **DTOs:** `RecipeResponseDto` (already has full recipe fields), `RecipeRequestQueryDto` (for search endpoint)
- **AI Service:** `createJsonCompletion<T>()` — JSON completion with retry logic
- **Redis:** Available via Bull/ioredis (used for plan-generation queue). Will use `ConfigService` to get Redis URL and ioredis directly for caching.

## Task 4.3 Requirements
1. `POST /nutrition/recipe/generate` with body `{ mealType, targetMacros, restrictions }`
2. AI prompt with specific macro targets, restrictions, cooking level, prep time
3. Use GPT-4o-mini for cost efficiency
4. Validate macro accuracy within 10%
5. Cache common recipes in Redis
6. Save to database (optional — skip for now since no Recipe model in schema)

## New DTO

### `dto/generate-recipe.dto.ts` — `GenerateRecipeDto`
```typescript
{
  mealType: string;        // 'breakfast' | 'lunch' | 'dinner' | 'snack' — @IsIn
  calories: number;        // @IsInt, @Min(100), @Max(5000)
  protein: number;         // @IsInt, @Min(0)
  carbs: number;           // @IsInt, @Min(0)
  fat: number;             // @IsInt, @Min(0)
  restrictions?: string[]; // @IsOptional, @IsArray, @IsString({ each: true })
  disliked?: string[];     // @IsOptional, @IsArray, @IsString({ each: true })
  cookingLevel?: string;   // @IsOptional, @IsIn(['beginner', 'regular', 'advanced'])
  maxPrepTime?: number;    // @IsOptional, @IsInt, @Min(5), @Max(120)
}
```

## New Controller Endpoint

| Method | Path | Body | Description | Status |
|--------|------|------|-------------|--------|
| POST | `/nutrition/recipe/generate` | `GenerateRecipeDto` | Generate a single recipe matching macro targets | 201 |

Decorators: `@UseGuards(JwtAuthGuard)`, `@ApiBearerAuth()`, `@ApiOperation`, `@ApiResponse(201/400/404/502)`, `@ApiBody({ type: GenerateRecipeDto })`

## New Service Method

### `generateRecipe(userId: string, dto: GenerateRecipeDto): Promise<RecipeResponseDto>`
1. Fetch user profile (for dietary context fallback if restrictions not provided)
2. Build cache key from `mealType + macros + restrictions` (sorted, normalized)
3. Check Redis cache — if hit, return cached recipe
4. Build recipe generation prompt (from task spec) with:
   - Meal type, calorie target (±50), protein (±5g), carbs (±10g), fat (±5g)
   - Restrictions, disliked foods, cooking level, max prep time
5. Call `aiService.createJsonCompletion` with `model: "gpt-4o-mini"`, `temperature: 0.9`
6. Validate response structure (name, macros, ingredients, instructions)
7. **Validate macro accuracy** — each macro must be within 10% of target:
   - `|generated.calories - target.calories| / target.calories <= 0.10`
   - Same for protein, carbs, fat
   - If out of range: log warning, but still return (don't fail — AI can be approximate)
8. Cache result in Redis with 1-hour TTL
9. Return `RecipeResponseDto`

### Redis Caching Strategy
- Key format: `recipe:generate:{hash}` where hash = MD5/simple hash of `{mealType, calories, protein, carbs, fat, restrictions, disliked}`
- TTL: 3600 seconds (1 hour)
- Use ioredis directly via a small `RecipeCacheService` or inline in NutritionService
- Since ioredis is already a dependency and Redis config exists, inject ConfigService to create a Redis client

## Implementation Approach
Rather than creating a separate cache service (over-engineering for one use case), inject `ConfigService` in NutritionService, create a lazy Redis client, and add `getCachedRecipe`/`setCachedRecipe` private methods.

## Files to Create
- `apps/api/src/modules/nutrition/dto/generate-recipe.dto.ts`

## Files to Modify
- `apps/api/src/modules/nutrition/nutrition.controller.ts` — Add POST recipe/generate endpoint
- `apps/api/src/modules/nutrition/nutrition.service.ts` — Add generateRecipe method, Redis caching, macro validation
- `apps/api/src/modules/nutrition/nutrition.module.ts` — Add ConfigModule if needed (already global)

## Convention Compliance
- Thin controller: validate DTO → delegate to service → return response
- class-validator decorators on DTO with proper constraints
- Full Swagger decorators on endpoint
- JwtAuthGuard protection
- HTTP 201 for creation
- GPT-4o-mini model for cost efficiency
- NestJS Logger for all operations
- No `any` types
- Structured error responses via NestJS exceptions
