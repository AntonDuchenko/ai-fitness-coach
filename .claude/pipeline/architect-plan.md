# Architect Plan: Dashboard Page Redesign (Stitch V3)

## Overview
Redesign the dashboard home page (`/dashboard`) to match the Stitch V3 design. The page features a sidebar, header with greeting, today's workout card, weight log with sparkline, daily macros with circular progress rings, weekly progress with bar chart, AI coach preview card, and quick action buttons.

## Approach
- **Reuse** existing hooks and sidebar — no backend changes needed
- **Create** a new `features/dashboard/` module with dedicated dashboard widgets
- **Create** lightweight dashboard-specific hooks that pull from existing API endpoints
- **Replace** the current simple `page.tsx` with the new design

## File Structure

```
apps/web/src/features/dashboard/
  hooks/
    useDashboardData.ts       # Aggregates data from existing hooks for dashboard
    useDashboardNutrition.ts  # Lightweight nutrition plan fetch for macro display
    useDashboardChat.ts       # Lightweight chat fetch for last message + usage
  components/
    DashboardContent.tsx      # Main content area (client component, orchestrator)
    DashboardHeader.tsx       # Top bar with greeting, date, notifications
    TodaysWorkoutCard.tsx     # Full-width workout card with exercise table
    WeightLogCard.tsx         # Weight log with sparkline + input
    DailyMacrosCard.tsx       # 4 circular progress rings for macros
    WeeklyProgressCard.tsx    # Stats + bar chart for weekly progress
    AiCoachCard.tsx           # AI coach preview with quick prompts
    QuickActionsRow.tsx       # 5 quick action buttons
    MacroRing.tsx             # Reusable SVG circular progress ring
```

## Data Flow

### `useDashboardData` hook
Combines data from existing hooks:
- `useTodaysWorkoutWidget()` — workout status, todayWorkout, sessionPayload
- `useWeightHistoryQuery("3months")` — current weight, change, logs for sparkline
- `useDashboardNutrition()` — macroTargets + dailyTotals
- `useProgressSummaryQuery()` — workouts thisWeek, currentStreak, weight change
- `useDashboardChat()` — last AI message, usage

### `useDashboardNutrition` — lightweight hook
- Fetches `/nutrition/plan` via apiClient
- Returns only: macroTargets (dailyCalories, proteinGrams, carbsGrams, fatGrams), dailyTotals, isLoading
- Does NOT include swap, recipes, grocery, regeneration logic

### `useDashboardChat` — lightweight hook
- Fetches `/chat/history?limit=1&offset=0` for last AI message
- Fetches `/chat/usage` for usage stats
- Returns: lastAiMessage, usage, isLoading

## Component Details

### `DashboardContent.tsx` (~80 lines)
- Client component (`'use client'`)
- Calls `useDashboardData()` hook
- Renders: DashboardHeader + grid of cards
- Manages workout session dialog state
- Layout: scrollable main area with sidebar

### `DashboardHeader.tsx` (~40 lines)
- Props: `userName: string`
- "Good morning/afternoon/evening, {name}" + formatted date
- Notification bell icon + user avatar initials

### `TodaysWorkoutCard.tsx` (~140 lines)
- Full-width card, handles all status states (loading/error/no-plan/rest/completed/scheduled)
- Scheduled state: workout name as large heading, muscle tags, ~45min badge, exercise table, Start Workout button
- Table: order number, exercise name, sets × reps

### `WeightLogCard.tsx` (~100 lines)
- Hero weight number (78.5 kg), weekly change with arrow icon
- Bar sparkline (7 bars from recent logs with gradient fill)
- Input + Log button (reuses `useLogWeightMutation`)

### `DailyMacrosCard.tsx` (~60 lines)
- 2×2 grid of MacroRing: Calories (primary), Protein (success), Carbs (orange/tertiary), Fat (purple)
- "View Meal Plan" link to /dashboard/nutrition

### `MacroRing.tsx` (~45 lines)
- SVG circle progress + percentage center + label + value below
- Props: label, current, target, colorClass, size

### `WeeklyProgressCard.tsx` (~110 lines)
- 3 stat boxes: Workouts (n/5), Streak (n days), Weight (±n kg)
- Bar chart Mon-Sun with filled/empty states
- "View Full Report" link to /dashboard/progress

### `AiCoachCard.tsx` (~90 lines)
- AI icon with active dot, chat bubble with last message
- 3 quick prompt chips
- "Open Coach Chat" button + usage indicator
- Empty/loading states

### `QuickActionsRow.tsx` (~50 lines)
- 5 buttons: Workout Plan, Nutrition, Progress, AI Coach, Subscription
- Each with lucide icon + label, links to respective pages

## Styling Rules
- All colors via semantic tokens only
- shadcn/ui: Card, Button, Input, Skeleton, Badge
- `font-heading` for headings, default Inter for body
- Consistent `rounded-2xl` on cards, `space-y-6` between sections
- Dark mode compatible

## Files Changed
- `apps/web/src/app/dashboard/page.tsx` — simplified to render DashboardContent

## New Files (12)
1. `apps/web/src/features/dashboard/hooks/useDashboardData.ts`
2. `apps/web/src/features/dashboard/hooks/useDashboardNutrition.ts`
3. `apps/web/src/features/dashboard/hooks/useDashboardChat.ts`
4. `apps/web/src/features/dashboard/components/DashboardContent.tsx`
5. `apps/web/src/features/dashboard/components/DashboardHeader.tsx`
6. `apps/web/src/features/dashboard/components/TodaysWorkoutCard.tsx`
7. `apps/web/src/features/dashboard/components/WeightLogCard.tsx`
8. `apps/web/src/features/dashboard/components/DailyMacrosCard.tsx`
9. `apps/web/src/features/dashboard/components/MacroRing.tsx`
10. `apps/web/src/features/dashboard/components/WeeklyProgressCard.tsx`
11. `apps/web/src/features/dashboard/components/AiCoachCard.tsx`
12. `apps/web/src/features/dashboard/components/QuickActionsRow.tsx`
