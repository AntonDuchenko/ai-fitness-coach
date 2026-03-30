# Architect Plan: Workout Plan Page Redesign (Stitch Design)

## Overview
Redesign the workout plan page (`/dashboard/workouts`) to match the Stitch "Workout Plan View" design. Apply the "Kinetic Laboratory" design system: tonal layering (no borders), glassmorphism, surface hierarchy, bold typography, and enhanced day cards with duration/exercise metadata.

## Key Design Changes from Stitch
1. **Header**: Plan name as bold title + "Pro" badge + "Week X of Y" subtitle + Regenerate button with icon
2. **Week Selector**: Pill-style selector chips with full roundness (Stitch selection chips)
3. **Day Cards Grid**: Enhanced cards with tonal layering instead of borders, accent strips, duration + exercise count metadata, status indicators
4. **Detail Panel**: Richer layout with duration/calories/equipment metadata, exercise items with muscle group badges, sets×reps formatting
5. **"No-Line" Rule**: Replace `border-border` boundaries with background color shifts (`bg-card`, `bg-muted/10`)
6. **Surface Hierarchy**: Base → Section → Component → Elevated layers via bg tones

## Approach
- **Reuse** existing hooks (`useWorkoutPlanView`, `useWorkoutPlan`, etc.) — no logic changes
- **Redesign** all presentational components to match Stitch design
- **Keep** existing component split (already properly separated)
- **Adapt** Stitch M3 colors to our semantic CSS variable tokens

## Files to Modify (7 components)

### 1. `WorkoutPlanScreen.tsx` — Main layout
- Remove explicit borders on header, use tonal bg shifts
- Header: plan name bold, badge, week counter
- No border between sections — use bg-card vs bg-background

### 2. `WorkoutWeekContent.tsx` — Week grid area
- Section heading with program progress
- Day cards grid: keep 7-col desktop, 2-col mobile

### 3. `WeekSelector.tsx` — Week pills
- Full roundness (`rounded-full`) on chips per Stitch
- Active: primary bg, inactive: surface_container_high bg

### 4. `DayCard.tsx` — Individual day cards
- Remove explicit borders → use tonal surface bg
- Add duration + exercise count metadata
- Accent strip left edge (2px glow strip)
- Status badge improvements

### 5. `WorkoutDayDetailPanel.tsx` — Right sidebar detail
- Add duration/calories metadata row
- Exercise list with enhanced styling
- "Start Workout" CTA with gradient effect

### 6. `ExerciseItem.tsx` — Exercise rows in detail panel
- Card with tonal bg (no border)
- Muscle group badge + sets×reps + rest in compact row
- Notes/alternatives collapsible sections

### 7. `WorkoutMobileHeader.tsx` — Mobile header
- Match Stitch mobile header style

## Files Unchanged
- All hooks (useWorkoutPlanView, useWorkoutPlan, etc.)
- types.ts, workoutLog.types.ts
- utils/ directory
- WorkoutSessionDialog, WorkoutLoggingView and related session components
- RegeneratePlanDialog (minor styling only)
- WorkoutPlanSkeleton, WorkoutPlanEmpty, WorkoutPlanError (update tonal styling)

## Convention Compliance
- All components < 150 lines
- Business logic stays in hooks
- shadcn/ui primitives (Button, Badge, Progress, Skeleton, etc.)
- Semantic tokens only (bg-primary, bg-card, text-muted-foreground)
- 4 async UI states maintained (loading/error/empty/success)
