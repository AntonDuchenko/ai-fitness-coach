# Architect Plan — Task 2.6: Nutrition Plan Generation (AI)

## Overview
Implement AI-powered nutrition plan generation following the workout plan generation pattern. Calculate TDEE/macros, call OpenAI, validate response, save to DB.

## Files to Create
1. `apps/api/src/modules/nutrition/dto/nutrition-plan-response.dto.ts`

## Files to Modify
2. `apps/api/src/modules/nutrition/nutrition.service.ts` — Generation logic
3. `apps/api/src/modules/nutrition/nutrition.controller.ts` — REST endpoints
4. `apps/api/src/modules/nutrition/nutrition.module.ts` — Import AiModule

## TDEE: Mifflin-St Jeor + activity multiplier + goal adjustment
## Macros: Goal-based splits (weight_loss 40/30/30, muscle_gain 30/45/25, default 30/40/30)
## Validation: Profile fields + AI response structure + meal structure
