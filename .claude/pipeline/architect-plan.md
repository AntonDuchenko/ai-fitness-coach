# Architect Plan: Task 0.3 — NestJS (Backend) Setup

## Current State
- Basic NestJS app exists: `main.ts`, `app.module.ts`, `app.controller.ts`, `app.service.ts`
- Swagger, ValidationPipe, CORS already configured in `main.ts`
- `class-validator` and `class-transformer` installed
- TypeScript strict mode inherited from `tsconfig.base.json`

## What Needs to Be Done

### 1. Install Core Dependencies
Add to `apps/api/package.json`:
- `@nestjs/config` — environment variable management
- `@nestjs/jwt` — JWT token handling
- `@nestjs/passport` — auth strategy integration
- `passport` — core passport
- `passport-jwt` — JWT strategy
- `bcrypt` — password hashing
- Dev: `@types/passport-jwt`, `@types/bcrypt`

### 2. Create Modular Directory Structure
```
apps/api/src/
├── modules/
│   ├── auth/         (auth.module.ts, auth.controller.ts, auth.service.ts)
│   ├── users/        (users.module.ts, users.controller.ts, users.service.ts)
│   ├── chat/         (chat.module.ts, chat.controller.ts, chat.service.ts)
│   ├── ai/           (ai.module.ts, ai.controller.ts, ai.service.ts)
│   ├── workouts/     (workouts.module.ts, workouts.controller.ts, workouts.service.ts)
│   ├── nutrition/    (nutrition.module.ts, nutrition.controller.ts, nutrition.service.ts)
│   └── payments/     (payments.module.ts, payments.controller.ts, payments.service.ts)
├── common/
│   ├── decorators/   (.gitkeep)
│   ├── filters/      (.gitkeep)
│   ├── guards/       (.gitkeep)
│   ├── interceptors/ (.gitkeep)
│   └── pipes/        (.gitkeep)
├── config/
│   └── app.config.ts
├── main.ts
├── app.module.ts
├── app.controller.ts
└── app.service.ts
```

### 3. ConfigModule Setup
- Create `config/app.config.ts` with `registerAs` for typed config
- Add `ConfigModule.forRoot({ isGlobal: true })` to AppModule
- Update `main.ts` to use ConfigService for PORT and FRONTEND_URL

### 4. Environment Variables
- Create `.env.example` with all expected variables

### 5. Fix CORS
- Add `credentials: true` to CORS config in `main.ts`

### 6. Update AppModule
- Import ConfigModule
- Import all feature modules

### 7. Path Aliases
- Add `@modules/*`, `@common/*`, `@config/*` path aliases to tsconfig

## Files to Create/Modify
- **Modify:** `apps/api/package.json` (add deps)
- **Modify:** `apps/api/tsconfig.json` (path aliases)
- **Modify:** `apps/api/src/main.ts` (ConfigService, credentials)
- **Modify:** `apps/api/src/app.module.ts` (imports)
- **Create:** `apps/api/.env.example`
- **Create:** `apps/api/src/config/app.config.ts`
- **Create:** 7 module scaffolds (module + controller + service each = 21 files)
- **Create:** `apps/api/src/common/` subdirectories with .gitkeep
