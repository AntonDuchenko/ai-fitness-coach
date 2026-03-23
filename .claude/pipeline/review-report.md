# Review Report: Task 4.2 — Nutrition Plan Display Frontend

## Verdict: NEEDS_CHANGES

## Critical Issues

### 1. `NutritionPlanScreen.tsx` exceeds 150-line limit (259 lines)
- Contains 3 inline sub-components: `NutritionPlanSkeleton`, `NutritionPlanEmpty`, `NutritionPlanError`
- **Fix:** Extract these 3 components into separate files or a single `NutritionPlanStates.tsx` file

### 2. `DayMealsPanel.tsx` exceeds 150-line limit (173 lines)
- The DailyTotals summary section and day navigation are embedded inline
- **Fix:** Extract the daily summary section (lines 95-127) into a `DailySummary` component

## Medium Issues

### 3. Day navigation label is static
- The "Today · Day 1" button always shows "Day 1" regardless of `selectedDay` value
- **Fix:** Show the actual selected day: `Today · Day ${selectedDay}` or just `Day ${selectedDay}`

### 4. Hardcoded grocery cost estimate
- `GroceryListPanel.tsx:111` shows `$18.40` as a static value
- Acceptable for MVP placeholder but should be noted

### 5. Select empty string value in RecipesPanel
- `RecipesPanel.tsx:55` uses `value=""` for "All meal types" SelectItem — Radix Select may not handle empty string values correctly
- **Fix:** Use a sentinel value like `"all"` and map it back to empty string in the handler

## Passing Checks

| Rule | Status |
|------|--------|
| No hardcoded hex colors | PASS |
| shadcn/ui used (no raw HTML) | PASS |
| Business logic in hooks | PASS |
| TanStack Query for all API calls | PASS |
| Semantic design tokens | PASS |
| 4 async UI states (loading/error/empty/success) | PASS |
| Accessibility (ARIA labels, semantic HTML) | PASS |
| TypeScript strict (no `any`) | PASS |
| Build passes | PASS |
| Lint passes (nutrition files) | PASS |
