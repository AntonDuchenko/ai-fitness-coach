# Architect Plan — Task 5.1: Weight Logging

## Overview
Create a full-stack weight logging feature: backend Progress module with `POST /progress/weight` and `GET /progress/weight` endpoints, plus a frontend quick-log widget on the Dashboard.

## Backend Architecture

### New Module: `apps/api/src/modules/progress/`

**Files:**
1. `progress.module.ts` — NestJS module (imports PrismaModule)
2. `progress.controller.ts` — Thin controller with 2 endpoints
3. `progress.service.ts` — Business logic (log weight, get history)
4. `dto/create-weight-log.dto.ts` — Validated input: `{ weight, date?, notes? }`
5. `dto/weight-log-response.dto.ts` — Response shape
6. `dto/weight-history-response.dto.ts` — History response with array + metadata

**Endpoints:**
- `POST /progress/weight` — Log weight (upsert for same user+date). Body: `{ weight: number, date?: string, notes?: string }`. Returns 201 with the created/updated log.
- `GET /progress/weight?period=3months` — Get weight history. Period options: `1month`, `3months`, `6months`, `1year`, `all`. Returns array of logs + start/current weight + change.

**Key Logic (service):**
- `logWeight(userId, dto)`: Normalize date to start-of-day (UTC). Check for existing entry on that date via `findFirst` with date range. If exists, update. If not, create. Returns the log.
- `getWeightHistory(userId, period)`: Calculate start date from period string. Query WeightLog ordered by date asc. Return `{ logs, startWeight, currentWeight, change, changePercent }`.

**Guards/Decorators:** `@UseGuards(JwtAuthGuard)`, `@ApiBearerAuth()` on controller class.

### Register in AppModule
- Import `ProgressModule` into `app.module.ts`

## Frontend Architecture

### New Feature: `apps/web/src/features/progress/`

**Structure:**
```
features/progress/
  hooks/useLogWeightMutation.ts    # useMutation for POST /progress/weight
  hooks/useWeightHistoryQuery.ts   # useQuery for GET /progress/weight
  components/WeightLogWidget.tsx   # Card with input, unit toggle, log button
  types.ts                         # WeightLog, WeightHistoryResponse types
  index.ts                         # Public exports
```

**Hook: `useLogWeightMutation`**
- Uses `useMutation` + `apiClient`
- On success: invalidates weight history query key
- Returns mutation state for UI

**Hook: `useWeightHistoryQuery`**
- Uses `useQuery` with key `["progress", "weight", period]`
- Fetches from `/progress/weight?period=<period>`

**Component: `WeightLogWidget`** (~100 lines)
- `'use client'` directive
- Uses hooks internally (self-contained widget)
- Uses: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Input`, `Button`, `Label`
- Features:
  - Number input for weight value
  - Unit toggle button (kg/lbs) — stored in localStorage, converts to kg for API
  - Optional notes input
  - "Log Weight" button with loading state
  - Success toast via sonner
  - Error message inline
  - Latest weight shown as context ("Last logged: 82.5 kg")

### Dashboard Integration
- Add `WeightLogWidget` as a new section in `apps/web/src/app/dashboard/page.tsx`
- Place below "Today's workout" section, before "Quick links"
- Section heading: "Quick weight log"

## File Summary

### New Files (Backend)
1. `apps/api/src/modules/progress/progress.module.ts`
2. `apps/api/src/modules/progress/progress.controller.ts`
3. `apps/api/src/modules/progress/progress.service.ts`
4. `apps/api/src/modules/progress/dto/create-weight-log.dto.ts`
5. `apps/api/src/modules/progress/dto/weight-log-response.dto.ts`
6. `apps/api/src/modules/progress/dto/weight-history-response.dto.ts`

### New Files (Frontend)
7. `apps/web/src/features/progress/types.ts`
8. `apps/web/src/features/progress/hooks/useLogWeightMutation.ts`
9. `apps/web/src/features/progress/hooks/useWeightHistoryQuery.ts`
10. `apps/web/src/features/progress/components/WeightLogWidget.tsx`
11. `apps/web/src/features/progress/index.ts`

### Modified Files
12. `apps/api/src/app.module.ts` — import ProgressModule
13. `apps/web/src/app/dashboard/page.tsx` — add WeightLogWidget section

## Convention Compliance
- All API calls via TanStack Query (useQuery/useMutation)
- All UI via shadcn/ui components (Card, Input, Button, Label)
- Semantic tokens only (bg-card, text-foreground, text-muted-foreground, etc.)
- Business logic in hooks, not components
- DTOs with class-validator decorators
- Swagger decorators on all endpoints
- Thin controller, fat service
- Components under 150 lines
