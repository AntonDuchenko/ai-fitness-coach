# Architect Plan: Task 6.5 — Free Tier Enforcement

## Overview
Add premium subscription checks across all feature endpoints. Chat already has free tier limits (5 msgs/day). We need a reusable `PremiumGuard` + `@RequiresPremium()` decorator, then apply tier-based restrictions to workouts, nutrition, and progress.

## Endpoint Protection Strategy

| Module | Endpoint | Free | Premium |
|--------|----------|------|---------|
| **Chat** | POST /send | 5/day (already done) | Unlimited |
| **Chat** | GET /history, /usage, DELETE /clear | Yes | Yes |
| **Workouts** | POST /generate, /regenerate | @RequiresPremium | Yes |
| **Workouts** | GET /plan, /plans, /plan/:id, /today, /day/:dayOfWeek | Yes | Yes |
| **Workouts** | POST /log, GET /logs, /log/:id, DELETE /log/:id, GET /stats | Yes | Yes |
| **Nutrition** | POST /generate, /regenerate | @RequiresPremium | Yes |
| **Nutrition** | POST /swap-meal, /swap-meal/apply, /recipe/generate | @RequiresPremium | Yes |
| **Nutrition** | GET /recipes (search) | @RequiresPremium | Yes |
| **Nutrition** | GET /plan, /plans, /plan/:id | Yes | Yes |
| **Progress** | GET /strength/:exercise, /volume, /consistency | @RequiresPremium | Yes |
| **Progress** | POST /weight, GET /weight, /summary | Yes | Yes |

## File Changes

### New files:
1. `apps/api/src/common/guards/premium.guard.ts` — PremiumGuard (CanActivate), injects UsersService, throws ForbiddenException with upgradeUrl
2. `apps/api/src/common/decorators/requires-premium.decorator.ts` — Composite decorator: @UseGuards(PremiumGuard) + @ApiResponse(403)
3. `apps/api/src/common/exceptions/forbidden-premium.exception.ts` — ForbiddenPremiumException with upgradeUrl in response
4. `apps/api/src/common/constants/tier-limits.ts` — Centralized free tier limit constants

### Modified files:
5. `apps/api/src/modules/users/users.module.ts` — Make global so PremiumGuard can inject UsersService
6. `apps/api/src/modules/workouts/workouts.controller.ts` — Add @RequiresPremium() to generate, regenerate
7. `apps/api/src/modules/nutrition/nutrition.controller.ts` — Add @RequiresPremium() to generate, regenerate, swap-meal, swap-meal/apply, recipe/generate, recipes
8. `apps/api/src/modules/progress/progress.controller.ts` — Add @RequiresPremium() to strength, volume, consistency
9. `apps/api/src/modules/chat/chat.service.ts` — Use ForbiddenPremiumException with upgradeUrl

## Guard Design
- PremiumGuard reads `req.user.id`, calls `UsersService.findById()`, checks `isPremium`
- If not premium → throws `ForbiddenPremiumException`
- UsersModule made `@Global()` so guard works without explicit imports in every module
