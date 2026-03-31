# Architect Plan: Progress Pages Redesign from Stitch

## Design Sources (Stitch project 7923897073544346409)
1. **Progress Overview** — screen `710e4adf9e514b7da32445c04d21cdd4`
2. **Log Weight Dialog** — screen `31b6c38cb441473c877ab61c812304c2`
3. **Progress Dashboard Widgets** — screen `8c6b54de620d49389b6b41e0798b3962`

## Part 1: Progress Overview Page

### Layout
- Sidebar (existing, unchanged)
- Main content: glow-bg ambient, p-6 lg:p-10
- Header: text-4xl font-heading font-extrabold "Progress" + subtitle + period select + Log Weight button
- 4 stat cards grid (sm:2, lg:4)
- Weight chart (full width)
- Strength (7/12) + Consistency (5/12)
- Volume section (full width, 2-col inner layout)

### Components to Rewrite
1. `ProgressScreen.tsx` — New layout: merge toolbar into header, M3 tokens, glow-bg
2. `ProgressQuickStats.tsx` — M3 stat cards: bg-m3-surface-high rounded-3xl p-6, ghost bg icons, large numbers
3. `ProgressToolbar.tsx` — Simplified: only period select + log weight button, horizontal layout
4. `WeightProgressChartCard.tsx` — bg-m3-surface-low rounded-[2rem] p-8, legend chips
5. `StrengthProgressCard.tsx` — lg:col-span-7, same M3 card style, exercise selector
6. `ConsistencyHeatmapCard.tsx` — lg:col-span-5, same M3 card style
7. `VolumeSectionCard.tsx` — Full width, 2-col flex layout (muscle bars + weekly bars)
8. `ProgressPageSkeleton.tsx` — Updated to match new layout

## Part 2: Log Weight Dialog

### Layout
- Centered modal, max-w-[440px]
- bg-m3-surface-high rounded-xl, border border-m3-outline-variant/10
- Header: "Weight Tracking" + subtitle + monitor_weight icon circle
- Reference bar: bg-m3-surface-lowest/50, last weight display
- Form: large weight input + kg/lbs toggle buttons
- Notes textarea
- Motivational quote: bg-m3-primary/5, left blue bar
- Stacked buttons: primary "Log Weight" + ghost "Cancel"

### Components to Rewrite
1. `LogWeightDialog.tsx` — Complete redesign with new visual structure
2. `WeightLogWidget.tsx` — Refactored form UI (keeps all business logic)

## Part 3: Dashboard Progress Widgets

### Layout
- Consistency Hub (lg:col-span-7): bg-m3-surface-container rounded-[2rem] p-8
  - "Weekly Overview" badge, "Consistency Hub" title
  - 3 stat boxes (Workouts, Streak, Weight) in grid-cols-3
  - 7-day mini bar chart with day labels
  - Weekly completion summary
- Body Composition (lg:col-span-5): 
  - Main card: bg-m3-surface-high rounded-[2rem] p-8, large weight display, sparkline, inline input
  - Sub card: Body Fat % metric

### Components to Rewrite
1. `WeeklyProgressCard.tsx` — → Consistency Hub design
2. `WeightLogCard.tsx` — → Body Composition design

## Design Token Mapping (Stitch → Project)
- `bg-surface-container-high` → `bg-m3-surface-high`
- `bg-surface-container-low` → `bg-m3-surface-low`
- `bg-surface-container` → `bg-m3-surface-container`
- `bg-primary-container` → `bg-m3-primary-container`
- `text-on-surface` → `text-m3-on-surface`
- `text-on-primary-container` → `text-m3-on-primary-container`
- `text-primary` (Stitch #ADC6FF) → `text-m3-primary`
- `text-secondary` (Stitch #4AE176) → `text-m3-secondary`
- `text-tertiary` (Stitch #FFB786) → `text-m3-tertiary`
- `text-outline` → `text-m3-outline`
- `border-outline-variant` → `border-m3-outline-variant`

## Hooks/Logic — No changes needed
- `useProgressScreenData.ts` — intact
- `useLogWeightMutation.ts` — intact
- `useWeightHistoryQuery.ts` — intact
- All other hooks — intact

## Convention Compliance
- All components < 150 lines
- Business logic stays in hooks
- shadcn/ui primitives (Dialog, Select, Button, Input, Skeleton, Label)
- Semantic M3 tokens only (no hardcoded hex)
- 4 async UI states maintained
- ARIA labels on icon-only buttons
