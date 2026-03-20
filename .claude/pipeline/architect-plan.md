# Architect Plan — Task 0.1: Monorepo Setup

## Overview
Initialize a Turborepo monorepo with pnpm workspaces containing Next.js 14 (frontend) and NestJS 10 (backend), plus shared packages.

## Target Structure
```
ai-pocket-trainer/
├── apps/
│   ├── web/                  # Next.js 14 (App Router)
│   │   ├── src/
│   │   │   ├── app/          # App Router routes
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/
│   │   │   │   └── ui/       # shadcn/ui components (future)
│   │   │   ├── features/     # Feature modules (future)
│   │   │   ├── hooks/        # Shared hooks (future)
│   │   │   ├── lib/
│   │   │   │   └── utils.ts  # cn() utility
│   │   │   ├── styles/       # Global styles
│   │   │   └── types/        # Local types
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── postcss.config.js
│   │   └── package.json
│   └── api/                  # NestJS 10
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── app.controller.ts
│       │   ├── app.service.ts
│       │   └── modules/      # Feature modules (future)
│       ├── nest-cli.json
│       ├── tsconfig.json
│       ├── tsconfig.build.json
│       └── package.json
├── packages/
│   ├── types/                # Shared TypeScript types
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── ui/                   # Shared UI components (future)
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── utils/                # Shared utilities
│       ├── src/
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json        # Shared TS config
├── .gitignore
├── .npmrc
└── .eslintrc.js
```

## Implementation Steps

### Step 1: Root Configuration
1. Create root `package.json` with workspace scripts
2. Create `pnpm-workspace.yaml` pointing to `apps/*` and `packages/*`
3. Create `turbo.json` with build/dev/lint/test pipelines and caching
4. Create `.npmrc` with `shamefully-hoist=true` (needed for NestJS)
5. Create shared `tsconfig.base.json`
6. Create root `.gitignore`
7. Create root `.eslintrc.js`

### Step 2: Shared Packages
1. `packages/types/` — shared TypeScript types with barrel export
2. `packages/ui/` — placeholder for shared UI components
3. `packages/utils/` — placeholder for shared utilities
4. Each with its own `package.json` and `tsconfig.json`

### Step 3: Next.js Frontend (apps/web)
1. Initialize with Next.js 14 App Router config
2. Configure TypeScript strict mode, path aliases
3. Setup Tailwind CSS with design system tokens (copy from `design-system/`)
4. Create app layout with Inter + Poppins fonts
5. Create minimal home page
6. Add `cn()` utility in `lib/utils.ts`
7. Wire up shared packages as dependencies

### Step 4: NestJS Backend (apps/api)
1. Initialize NestJS app with module structure
2. Configure TypeScript strict mode
3. Create basic AppModule, AppController, AppService
4. Setup health check endpoint
5. Wire up shared packages as dependencies

### Step 5: Verification
1. `pnpm install` succeeds
2. `pnpm dev` runs both apps
3. `pnpm build` succeeds
4. Shared package imports work

## Key Decisions
- Use `workspace:*` protocol for internal package references
- TypeScript strict mode everywhere (tsconfig.base.json)
- Design system CSS variables integrated from day 1
- NestJS uses SWC for faster builds
- Inter (body) + Poppins (headings) via next/font
- postcss + tailwindcss v4 (latest with @import "tailwindcss")

## Dependencies
### apps/web
- next@14, react@18, react-dom@18
- tailwindcss, postcss, autoprefixer, tw-animate-css
- typescript, @types/react, @types/node
- clsx, tailwind-merge (for cn utility)

### apps/api
- @nestjs/core, @nestjs/common, @nestjs/platform-express
- @nestjs/swagger, swagger-ui-express
- class-validator, class-transformer
- rxjs, reflect-metadata
- typescript

### Root
- turbo
- eslint, prettier, @typescript-eslint/*
