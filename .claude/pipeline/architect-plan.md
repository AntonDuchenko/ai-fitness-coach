# Architect Plan: Nutrition Page Redesign from Stitch

## Design Source
Stitch screen: "Nutrition Plan View" (project 7923897073544346409, screen e7429b998f0149f3bbac7961a76d36b8)

## Layout Structure
- DashboardSidebar (left, desktop) — existing, no changes
- Main content area with `glow-bg` ambient background
- Bento grid layout (12-col grid on lg)

## Key Design Changes from Stitch
1. **Header** — "Daily Optimization" small uppercase label, large 5xl title, description text, Regenerate button
2. **Macro Targets** — Glass card (2rem radius) with 4 progress bars (Calories, Protein, Carbs, Fat)
3. **Tabs + Day Selector** — Underline tabs (Meal Plan | Grocery List | Recipes) + numbered day pills (1-7)
4. **Meal Cards** — Glass cards (3xl radius) with image thumbnail, horizontal layout, time+type label, macro badges
5. **Daily Summary** — Bottom section with circular progress indicators (91%, 84%, 78%) and "On Track" badge

## Components to Rewrite
1. `NutritionPlanScreen.tsx` — New layout with M3 tokens, glow-bg, bento grid
2. `NutritionHeader.tsx` — Large editorial header (removed, merged into NutritionPlanScreen)
3. `MacroTargetsCard.tsx` — Glass card with 4 macro progress bars
4. `NutritionTabs.tsx` — Underline-style tabs + day selector pills
5. `DayMealsPanel.tsx` — Simplified: just the meal card list
6. `MealCard.tsx` — Horizontal glass card with image thumbnail
7. `DailySummary.tsx` — Circular progress indicators with stats
8. `NutritionPlanStates.tsx` — M3 token updates

## Design Tokens
- Add `m3-tertiary` (#FFB786 dark, #F59E0B light) for carbs color
- Use existing `glass-card`, `glow-bg` utilities

## Hooks/Logic — No changes
- `useNutritionPlanView.ts` — intact
- `useSwapMeal.ts` — intact
- `types.ts` — intact

## Convention Compliance
- All components < 150 lines
- Business logic in hooks only
- shadcn/ui primitives used
- Semantic/M3 tokens only (no hardcoded hex)
- 4 async UI states maintained
