# Architect Plan: Task 0.4 — Database Setup (Prisma + PostgreSQL)

## Current State
- NestJS backend fully scaffolded with 7 feature modules
- ConfigModule with typed config (app, jwt, database)
- Env validation via Zod (DATABASE_URL required)
- No database ORM installed yet

## Implementation Plan

### 1. Install Prisma Dependencies
Add to `apps/api/`:
- `prisma` (dev dependency) — CLI and migration tooling
- `@prisma/client` — runtime client

### 2. Create Prisma Schema (`apps/api/prisma/schema.prisma`)
Full schema from PRD Section 4.3 with 8 models:
- **User** — auth, subscription, usage tracking
- **UserProfile** — onboarding data, goals, health, nutrition preferences, calculated macros
- **ChatMessage** — AI chat history with metadata
- **WorkoutPlan** — training programs with weekly schedule
- **WorkoutLog** — completed workout records
- **NutritionPlan** — meal plans with macro targets
- **WeightLog** — progress tracking
- **StripeEvent** — payment event log

All with proper relations, indexes, and cascade deletes.

### 3. Create PrismaService (`apps/api/src/prisma/prisma.service.ts`)
- Extends PrismaClient
- Implements OnModuleInit (connect on startup)
- Implements OnModuleDestroy (disconnect on shutdown)
- ~25 lines, simple and standard

### 4. Create PrismaModule (`apps/api/src/prisma/prisma.module.ts`)
- Global module (`@Global()`)
- Exports PrismaService for injection across all modules

### 5. Update AppModule
- Import PrismaModule

### 6. Relax Env Validation for Development
Current env.validation.ts requires OPENAI_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET — these aren't needed yet. Make them optional so `pnpm build` works without those keys.

### 7. Add Prisma Scripts
Add to `apps/api/package.json`:
- `prisma:generate` — generate client
- `prisma:migrate` — run migrations
- `prisma:studio` — open Prisma Studio

## Files
- **Create:** `apps/api/prisma/schema.prisma`
- **Create:** `apps/api/src/prisma/prisma.service.ts`
- **Create:** `apps/api/src/prisma/prisma.module.ts`
- **Modify:** `apps/api/src/app.module.ts` (add PrismaModule import)
- **Modify:** `apps/api/package.json` (add deps + scripts)
- **Modify:** `apps/api/src/config/env.validation.ts` (relax non-DB env vars)
