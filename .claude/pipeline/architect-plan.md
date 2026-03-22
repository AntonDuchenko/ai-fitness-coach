# Architect Plan: Task 2.7 — Plan Generation in Onboarding

## Overview
Replace the stub `PlanGenerationProcessor` with real AI plan generation that calls WorkoutsService, NutritionService, and ChatService during onboarding.

## Changes Required

### 1. Update `PlanGenerationModule` (plan-generation.module.ts)
- Import `WorkoutsModule`, `NutritionModule`, `ChatModule`, `UsersModule` using `forwardRef` where needed
- These modules export their services which the processor needs

### 2. Update `PlanGenerationProcessor` (plan-generation.processor.ts)
- Inject `WorkoutsService`, `NutritionService`, `ChatService`, `UsersService`
- Replace setTimeout stubs with real calls:
  - Step 1: `workoutsService.generatePlan(userId)` (progress 30%)
  - Step 2: `nutritionService.generatePlan(userId)` (progress 60%)
  - Step 3: `chatService.sendWelcomeMessage(userId)` (progress 90%)
  - Step 4: `usersService.setOnboardingComplete(userId)` (progress 100%)
- Add proper error logging per step
- Remove the old simulated loop

### 3. Add `sendWelcomeMessage()` to `ChatService` (chat.service.ts)
- New public method that fetches user profile and creates a welcome assistant message
- Uses the private `saveMessage()` method already available
- Message content personalized with profile data (training days, primary goal, calories)

### 4. Configure Bull retry logic (plan-generation.service.ts)
- Pass job options: `attempts: 3`, `backoff: { type: 'exponential', delay: 5000 }`
- On final failure (all retries exhausted), log error and save a failure chat message

### 5. Handle final failure in processor
- Add `@OnQueueFailed` handler to detect when all retries exhausted
- Save error message to chat and log

## Files to Modify
1. `apps/api/src/modules/plan-generation/plan-generation.module.ts`
2. `apps/api/src/modules/plan-generation/plan-generation.processor.ts`
3. `apps/api/src/modules/plan-generation/plan-generation.service.ts`
4. `apps/api/src/modules/chat/chat.service.ts`

## No Changes Needed
- Schema, Frontend, Users module, Workout/Nutrition services

## Circular Dependency
- `UsersModule` imports `PlanGenerationModule` already
- `PlanGenerationModule` needs `UsersModule` → use `forwardRef`
