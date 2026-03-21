# Architect Plan: Task 1.3 — Onboarding Backend (User Profile)

## Overview
Implement profile CRUD endpoints and nutrition calculations (TDEE, BMR, macros) in the Users module. The Prisma schema already has the `UserProfile` model. Auth (JWT) is already working.

## Files to Create/Modify

### 1. DTOs (`apps/api/src/modules/users/dto/`)

**`create-profile.dto.ts`** — Full profile creation DTO with all onboarding fields:
- Basic info: age (16-80), gender (enum), height (cm), weight (kg), targetWeight (optional)
- Goals: primaryGoal (enum), secondaryGoals (string[])
- Experience: fitnessLevel (enum), nutritionKnowledge (enum)
- Schedule: trainingDaysPerWeek (1-7), sessionDuration (int), preferredTime (enum)
- Equipment: trainingLocation (enum), equipment (string[])
- Health: injuries?, medicalConditions?, medications?, dietaryRestrictions (string[])
- Nutrition: mealsPerDay (2-6), cookingLevel (enum), cuisinePreferences (string[]), dislikedFoods (string[]), foodBudget (float)
- Motivation: motivation (string), previousAttempts (bool), previousAttemptsDetails?, biggestChallenges (string[])
- All fields validated with class-validator decorators

**`update-profile.dto.ts`** — PartialType of CreateProfileDto for PATCH updates

**`profile-response.dto.ts`** — Response DTO with all profile fields + calculated values (tdee, bmr, targetCalories, macros) + onboardingCompleted flag. Uses @Exclude/@Expose for serialization.

### 2. Service (`apps/api/src/modules/users/users.service.ts`)

Add methods:
- `getProfile(userId: string)` — Find profile by userId, throw 404 if not found
- `createProfile(userId: string, dto: CreateProfileDto)` — Create profile, calculate TDEE/BMR/macros, set onboardingCompleted=true
- `updateProfile(userId: string, dto: UpdateProfileDto)` — Partial update, recalculate TDEE/macros if relevant fields changed
- `calculateBMR(profile)` — Mifflin-St Jeor equation
- `calculateTDEE(bmr, trainingDaysPerWeek)` — BMR x activity multiplier
- `getActivityMultiplier(trainingDays)` — Map days to multiplier
- `getGoalCalories(tdee, primaryGoal)` — Goal-based adjustment
- `calculateMacros(weight, goalCalories)` — Protein, fat, carbs

### 3. Controller (`apps/api/src/modules/users/users.controller.ts`)

Endpoints (all protected with `@UseGuards(JwtAuthGuard)`, `@ApiBearerAuth()`):
- `GET /users/profile` — Get current user's profile (200 or 404)
- `POST /users/profile` — Create profile / onboarding (201, 409 if exists)
- `PATCH /users/profile` — Update profile (200 or 404)

All with full Swagger decorators.

### 4. Module
Already imports PrismaService via global PrismaModule. No changes needed.

## Calculation Formulas

### BMR (Mifflin-St Jeor)
- Male: `10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5`
- Female/Other: `10 * weight(kg) + 6.25 * height(cm) - 5 * age - 161`

### Activity Multiplier
| Training Days | Multiplier |
|---------------|------------|
| 0             | 1.2        |
| 1-2           | 1.375      |
| 3-4           | 1.55       |
| 5-6           | 1.725      |
| 7             | 1.9        |

### Goal Adjustment
| Goal          | Adjustment  |
|---------------|-------------|
| weight_loss   | TDEE - 500  |
| muscle_gain   | TDEE + 400  |
| recomp        | TDEE - 200  |
| health        | TDEE        |
| performance   | TDEE + 200  |

### Macros
- Protein: `weight(kg) * 2.2` g
- Fat: `weight(kg) * 1.0` g
- Carbs: `(goalCalories - protein*4 - fat*9) / 4` g

## Error Handling
- 401: Missing/invalid JWT
- 404: Profile not found (GET, PATCH)
- 409: Profile already exists (POST)
- 422: Validation errors (class-validator)
