# Architect Plan: Task 2.2 — AI Context Building

## Overview
Create a `ContextService` in the AI module that builds a rich context object from the user's profile, conversation history, workout plans, nutrition plans, and recent workouts. This context is used to construct a system prompt for the AI chat. Context is cached for 5 minutes to reduce DB load.

## Files to Create/Modify

### New Files
1. **`apps/api/src/modules/ai/types/ai-context.type.ts`** — AiContext interface
2. **`apps/api/src/modules/ai/context.service.ts`** — ContextService

### Modified Files
3. **`apps/api/src/modules/workouts/workouts.service.ts`** — Add `getCurrentPlan(userId)` method
4. **`apps/api/src/modules/nutrition/nutrition.service.ts`** — Add `getCurrentPlan(userId)` method
5. **`apps/api/src/modules/workouts/workouts.module.ts`** — Import PrismaModule
6. **`apps/api/src/modules/nutrition/nutrition.module.ts`** — Import PrismaModule
7. **`apps/api/src/modules/ai/ai.module.ts`** — Import PrismaModule, WorkoutsModule, NutritionModule; register ContextService

## Architecture Decisions

1. **Cache Strategy**: In-memory Map with TTL (5 min). No new deps needed. `@nestjs/cache-manager` not installed. Simple Map<userId, {data, expiresAt}> pattern.

2. **Context Size Optimization** (<4000 tokens target):
   - Keep last 10 messages verbatim; if >10, prepend a one-line summary of older messages
   - Truncate workout logs: only exercise names + sets/reps/weight, no notes
   - Estimate tokens as `Math.ceil(text.length / 4)`

3. **Dependency Flow**: ContextService → PrismaService (profile, chat history), WorkoutsService (getCurrentPlan), NutritionService (getCurrentPlan)

4. **No controller changes** — ContextService is internal, consumed by future chat endpoints (Task 2.3)

## Implementation Order
1. Add PrismaModule imports + `getCurrentPlan()` to WorkoutsService and NutritionService
2. Create AiContext type
3. Create ContextService with buildContext, buildSystemPrompt, caching, optimization
4. Update AiModule imports/exports

## Acceptance Criteria Match
- Context fetches all relevant data (profile, history, plans, workouts)
- System prompt includes profile
- Context size optimized (<4000 tokens)
