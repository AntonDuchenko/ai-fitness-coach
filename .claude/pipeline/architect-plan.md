# Architect Plan — Task 0.2: Next.js (Frontend) Setup

## Current State
- Next.js 14 App Router app exists at `apps/web/`
- Tailwind CSS 4 configured with design system CSS variables in `globals.css`
- Fonts (Inter body, Poppins headings) configured via `next/font/google`
- `cn()` utility in `lib/utils.ts`
- TypeScript strict mode via `tsconfig.base.json`
- Path aliases `@/*` configured
- Biome configured for linting/formatting (replaces ESLint + Prettier per task)

## What Needs to Be Done

### 1. shadcn/ui Initialization
- Create `components.json` in `apps/web/` for shadcn/ui configuration
- Must be compatible with Tailwind v4 (CSS variables approach)
- Style: "new-york", base color references our design system

### 2. Install shadcn/ui Components
- `button` — primary CTA component
- `input` — form inputs
- `card` — content cards
- `dialog` — modal dialogs
- `sonner` — toast notifications (modern replacement for toast in shadcn)
- All installed into `apps/web/src/components/ui/`

### 3. Create Folder Structure
```
apps/web/src/
  app/                    # Already exists
  components/
    ui/                   # shadcn/ui components (auto-generated)
    layout/               # Header, Sidebar, Footer (empty for now)
    common/               # Reusable project-specific components (empty for now)
  features/               # Feature modules (empty for now)
  hooks/                  # Shared hooks (empty for now)
  lib/                    # Already exists (utils.ts)
  types/                  # Shared local types (empty for now)
```

### 4. Verify Integration
- Update `page.tsx` to import and render a shadcn/ui `Button`
- Confirms: Tailwind works, shadcn/ui works, design tokens apply correctly
- Run `pnpm build` to verify no TypeScript/build errors

## Key Decisions
- Using Biome instead of ESLint + Prettier (already configured at monorepo level)
- Skipping husky pre-commit hooks for now (can add later)
- Using `sonner` instead of `toast` (shadcn/ui's modern toast solution)
- Tailwind v4 uses CSS-first config, no `tailwind.config.js` needed in app
