# Test Report: Task 1.3 — Onboarding Backend (User Profile)

## Verdict: PASSED

## Test Iteration: 1/3

## TDEE/Macro Calculation Verification
Verified with known values (80kg male, 175cm, 25yo, 4 days/week, muscle_gain):
- BMR: 10*80 + 6.25*175 - 5*25 + 5 = 1773.75 (matches Mifflin-St Jeor male formula)
- TDEE: 1773.75 * 1.55 = 2749 (rounded)
- Goal calories: 2749 + 400 = 3149
- Protein: 80 * 2.2 = 176g
- Fat: 80 * 1.0 = 80g
- Carbs: (3149 - 704 - 720) / 4 = 431g
- All formulas match PRD exactly.

## Code Quality Checks
- [x] Controller is thin — delegates to service
- [x] Business logic in service — calculations, error handling
- [x] class-validator on all DTO fields
- [x] Swagger decorators on all endpoints
- [x] JwtAuthGuard protects all endpoints
- [x] Proper HTTP codes (201, 200, 404, 409)
- [x] No `any` types
- [x] No `console.log`
- [x] Recalculates on profile update when relevant fields change

## Build Verification
- [x] `pnpm build` — passes (5 tasks successful)
- [x] `pnpm lint` — no new lint errors in users module

## Acceptance Criteria (from TASKS.md)
- [x] Profile can be created/updated — POST and PATCH /users/profile
- [x] TDEE calculated correctly — Mifflin-St Jeor equation
- [x] Macros calculated correctly — 2.2g/kg protein, 1.0g/kg fat
- [x] Validation works (age 16-80, etc.) — @Min/@Max/@IsEnum
- [x] onboardingCompleted flag set on create
