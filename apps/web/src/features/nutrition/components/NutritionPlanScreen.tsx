"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { useMemo, useState } from "react";
import { useNutritionPlanView } from "../hooks/useNutritionPlanView";
import type { NutritionMeal } from "../types";
import { DayMealsPanel } from "./DayMealsPanel";
import { GroceryListPanel } from "./GroceryListPanel";
import { MacroTargetsCard } from "./MacroTargetsCard";
import { NutritionHeader } from "./NutritionHeader";
import { NutritionTabs } from "./NutritionTabs";
import {
  NutritionPlanEmpty,
  NutritionPlanError,
  NutritionPlanSkeleton,
} from "./NutritionPlanStates";
import type { RecipeDialogPayload } from "./RecipeDialog";
import { RecipeDialog } from "./RecipeDialog";
import { RecipesPanel } from "./RecipesPanel";
import { SwapMealPanel } from "./SwapMealPanel";

export function NutritionPlanScreen() {
  const v = useNutritionPlanView();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPayload, setDialogPayload] =
    useState<RecipeDialogPayload | null>(null);

  const recipesErrorMessage = useMemo(() => {
    if (!v.recipesError) return null;
    return v.recipesError instanceof Error
      ? v.recipesError.message
      : "Failed to load recipes.";
  }, [v.recipesError]);

  const openRecipe = (payload: RecipeDialogPayload) => {
    setDialogPayload(payload);
    setDialogOpen(true);
  };

  const mealToDialogPayload = (meal: NutritionMeal): RecipeDialogPayload => {
    return {
      name: meal.name,
      mealType: meal.mealType,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      ingredients: meal.ingredients ?? [],
      instructions: meal.instructions ?? "No instructions provided.",
    };
  };

  if (v.isLoading) return <NutritionPlanSkeleton />;

  if (v.isError && v.isPlanNotFound) {
    return <NutritionPlanEmpty />;
  }

  if (v.isError || !v.plan) {
    return (
      <NutritionPlanError
        message={
          v.error instanceof Error ? v.error.message : "Failed to load plan."
        }
        onRetry={() => v.refetchPlan()}
      />
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-background text-foreground lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={v.menuOpen} onClose={() => v.setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <WorkoutMobileHeader
          variant="generic"
          title="Nutrition"
          onOpenMenu={() => v.setMenuOpen(true)}
        />

        <NutritionHeader
          planName={v.plan.name}
          onRegenerate={() => v.regenerate.mutate()}
          regenerating={v.regenerate.isPending}
        />

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="space-y-4">
              <MacroTargetsCard macros={v.macroTargets} />
              <NutritionTabs value={v.activeTab} onChange={v.setActiveTab} />

              {v.activeTab === "mealPlan" ? (
                <DayMealsPanel
                  dayButtons={v.dayButtons}
                  selectedDay={v.selectedDay}
                  onSelectDay={v.setSelectedDay}
                  meals={v.localMealPlan}
                  selectedMealIndex={v.selectedMealIndex}
                  onSelectMealIndex={v.setSelectedMealIndex}
                  onViewRecipe={(meal) => openRecipe(mealToDialogPayload(meal))}
                  onSwapMeal={(idx) => v.onSwapMeal(idx)}
                  dailyTotals={v.dailyTotals}
                />
              ) : null}

              {v.activeTab === "groceryList" ? (
                <GroceryListPanel groceryList={v.groceryList} />
              ) : null}

              {v.activeTab === "recipes" ? (
                <RecipesPanel
                  recipes={v.recipes}
                  loading={v.recipesLoading}
                  errorMessage={recipesErrorMessage}
                  search={v.recipeSearch}
                  onSearchChange={v.setRecipeSearch}
                  typeFilter={v.recipeTypeFilter}
                  onTypeFilterChange={v.setRecipeTypeFilter}
                  onViewRecipe={(r) =>
                    openRecipe({
                      name: r.name,
                      mealType: r.mealType,
                      calories: r.calories,
                      protein: r.protein,
                      carbs: r.carbs,
                      fat: r.fat,
                      ingredients: r.ingredients,
                      instructions: r.instructions,
                    })
                  }
                />
              ) : null}
            </div>
          </main>

          <aside className="px-4 pb-6 sm:px-6 lg:min-h-0 lg:w-[420px] lg:shrink-0 lg:overflow-y-auto lg:border-l lg:border-border lg:bg-card/30 lg:p-6">
            <SwapMealPanel
              currentMeal={v.selectedMeal}
              alternatives={v.swapAlternatives}
              loading={v.swapAlternativesLoading}
              applying={v.swapApplying}
              onGenerateAlternatives={v.onGenerateAlternatives}
              onUseAlternative={v.onUseAlternative}
            />
          </aside>
        </div>
      </div>

      <RecipeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        payload={dialogPayload}
      />
    </div>
  );
}
