# AI Fitness Coach — Project Context

## Stack
- **Frontend:** Next.js 14 (App Router) — `apps/web/`
- **Backend:** NestJS 10 (modular) — `apps/api/`
- **Monorepo:** Turborepo + pnpm workspaces
- **UI:** shadcn/ui + Tailwind CSS (CSS variable tokens)
- **Fonts:** Inter (body), Poppins (headings)

## Key Files
- **PRD:** `AI_FITNESS_COACH_PRD.md` — product requirements, features, user stories
- **Tasks:** `AI_FITNESS_COACH_TASKS.md` — phased task breakdown with acceptance criteria
- **Design:** `production_ai_landing.pen` — Pencil design file (open via mcp__pencil__open_document)
- **Design System:** `design-system/` — color tokens, Tailwind config, CSS variables

## Monorepo Structure
```
apps/
  web/src/           # Next.js App Router frontend
    app/             # Routes (App Router)
    components/      # React components
    lib/             # Utilities
    styles/          # Global styles
    types/           # Local types
  api/src/           # NestJS backend
    modules/         # Feature modules (auth, users, chat, ai, etc.)
packages/
  types/             # Shared TypeScript types
  ui/                # Shared components
  utils/             # Shared utilities
```

## Code Conventions

### Frontend Architecture (Critical Rules)

**Component Size & Splitting:**
- Max ~150 lines per component file. If larger — split into subcomponents.
- One component per file. File name = component name in PascalCase.
- Complex pages split into: `page.tsx` (server, data fetching) + feature sections as separate components.

**Business Logic vs UI Separation (Mandatory):**
- UI components are **pure presentational** — they receive data via props and render UI. No API calls, no business logic inside.
- All business logic lives in **custom hooks** (`use*.ts` files in `hooks/` directory):
  - `useAuth()`, `useWorkout()`, `useChatMessages()` etc.
  - Hooks handle: API calls, state management, data transformations, side effects.
- Pattern: `hook (logic) → component (UI) → shadcn/ui primitives (atoms)`
- Example structure for a feature:
  ```
  features/chat/
    hooks/useChat.ts          # business logic, API calls, state
    hooks/useChatScroll.ts    # scroll behavior logic
    components/ChatWindow.tsx # presentational, uses hook data via props
    components/ChatMessage.tsx
    components/ChatInput.tsx
    types.ts                  # feature-specific types
    index.ts                  # public exports
  ```

**UI Layer (Tailwind + shadcn/ui):**
- ALL UI built on shadcn/ui components adapted to our design system (see `design-system/`).
- Never use raw HTML tags when a shadcn/ui equivalent exists (`<Button>` not `<button>`, `<Card>` not `<div class="card">`, `<Input>` not `<input>`).
- Styling via Tailwind utility classes ONLY — no inline styles, no CSS modules, no styled-components.
- Use semantic design tokens from CSS variables: `bg-primary`, `text-muted-foreground`, `border-border` — NEVER hardcode hex colors like `bg-[#2563EB]`.
- Use `cn()` utility (from `@/lib/utils`) for conditional class merging.
- Dark mode: use Tailwind `dark:` variant, colors auto-switch via CSS variables.

**Server vs Client Components:**
- Server components by default (no directive needed).
- `'use client'` ONLY when component needs: useState, useEffect, event handlers, browser APIs, or custom hooks.
- Data fetching in server components or route handlers, never in client components directly.

**File Organization:**
```
apps/web/src/
  app/                    # Next.js App Router (routes only, minimal logic)
    (auth)/               # Route groups
    (dashboard)/
    layout.tsx
  features/               # Feature modules (business logic + UI)
    auth/
    chat/
    workout/
    nutrition/
    profile/
  components/             # Shared presentational components (no business logic)
    ui/                   # shadcn/ui components (auto-generated)
    layout/               # Header, Sidebar, Footer etc.
    common/               # Reusable project-specific components
  hooks/                  # Shared hooks (cross-feature)
  lib/                    # Utilities, API client, helpers
  types/                  # Shared types
  styles/                 # Global styles
```

### Backend Architecture
- NestJS modules pattern: controller + service + DTOs + entities per module
- class-validator decorators on all DTOs
- Swagger decorators on all endpoints (`@ApiTags`, `@ApiOperation`, `@ApiResponse`)
- Guards for auth (`@UseGuards(JwtAuthGuard)`), Pipes for validation
- Service layer handles all business logic — controllers are thin (validate input, call service, return response)
- Repository pattern for database access

### Shared
- TypeScript strict mode everywhere
- ESLint + Prettier
- Path aliases (`@/` for src root)
- Shared types in `packages/types/`

## SaaS Best Practices (Enforced in All Skills)

**General:**
- DRY — extract shared logic into hooks/utils, shared types into `packages/types/`
- Single Responsibility — each function, hook, component does one thing well
- Early returns over deep nesting
- No `any` types without explicit justification
- No `console.log` in production — proper logger on backend (NestJS Logger)
- Environment variables for all config (`NEXT_PUBLIC_*` for frontend, `process.env.*` for backend)

**Frontend Quality:**
- Every async UI handles 4 states: loading (Skeleton), error (error boundary/message), empty, success
- Forms validated with zod schemas, errors shown inline
- `next/image` for images, `next/font` for fonts, `next/link` for nav
- Error boundaries around client component subtrees
- Accessible: semantic HTML, ARIA labels on icon-only buttons, keyboard navigation
- No prop drilling beyond 2 levels — use React Context or composition

**Backend Quality:**
- Thin controllers: validate → delegate to service → return response
- Service layer: all business logic, database operations via repository pattern
- DTOs: class-validator decorators, separate Create/Update/Response DTOs
- Swagger: `@ApiTags`, `@ApiOperation`, `@ApiResponse` on every endpoint
- Proper HTTP codes: 201 create, 200 success, 204 no content, 400 bad request, 401 unauthorized, 403 forbidden, 404 not found, 422 validation error
- Structured error responses: `{ statusCode, message, error }`
- Guards for auth, Pipes for validation, Interceptors for transforms

## Design System
- Primary: Blue #2563EB (trust, technology)
- Success: Green #10B981 (progress, health)
- Dark bg: #0A0A0A, Light bg: #F9FAFB
- Border radius: 0.625rem base
- Dark mode via `.dark` class
- See `design-system/globals.css` for full CSS variable definitions

## Pipeline Artifacts
The `.claude/pipeline/` directory contains runtime artifacts from the development orchestrator:
- `state.json` — current pipeline state (phase, iteration counts, task info)
- `architect-plan.md` — architectural plan for the current task
- `review-report.md` — code review findings and verdict
- `test-report.md` — testing results and verdict
- `summary.md` — final pipeline execution summary
