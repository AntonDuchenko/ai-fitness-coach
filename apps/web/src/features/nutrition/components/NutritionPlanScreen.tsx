"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileDrawer } from "@/features/chat/components/MobileDrawer";
import { WorkoutMobileHeader } from "@/features/workout/components/WorkoutMobileHeader";
import { useState } from "react";
import { useNutritionPlanView } from "../hooks/useNutritionPlanView";
import { MacroTargetsCard } from "./MacroTargetsCard";
import { NutritionHeader } from "./NutritionHeader";
import {
  NutritionPlanEmpty,
  NutritionPlanError,
  NutritionPlanSkeleton,
} from "./NutritionPlanStates";
import { NutritionTabContent } from "./NutritionTabContent";
import { NutritionTabs } from "./NutritionTabs";
import type { RecipeDialogPayload } from "./RecipeDialog";
import { RecipeDialog } from "./RecipeDialog";
import { SwapMealPanel } from "./SwapMealPanel";

export function NutritionPlanScreen() {
  const v = useNutritionPlanView();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPayload, setDialogPayload] =
    useState<RecipeDialogPayload | null>(null);

  const openRecipe = (payload: RecipeDialogPayload) => {
    setDialogPayload(payload);
    setDialogOpen(true);
  };

  if (v.isLoading) return <NutritionPlanSkeleton />;
  if (v.isError && v.isPlanNotFound) return <NutritionPlanEmpty />;
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
    <div className="flex h-[100dvh] flex-col bg-m3-surface text-m3-on-surface lg:flex-row">
      <DashboardSidebar className="hidden lg:flex" />
      <MobileDrawer open={v.menuOpen} onClose={() => v.setMenuOpen(false)}>
        <DashboardSidebar className="h-full border-r-0" />
      </MobileDrawer>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="pointer-events-none absolute inset-0 glow-bg" />

        <WorkoutMobileHeader
          variant="generic"
          title="Nutrition"
          onOpenMenu={() => v.setMenuOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-12 pt-4 md:px-10 md:pt-6">
          <NutritionHeader
            planName={v.plan.name}
            onRegenerate={() => v.regenerate.mutate()}
            regenerating={v.regenerate.isPending}
          />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <MacroTargetsCard
                macros={v.macroTargets}
                dailyTotals={v.dailyTotals}
              />
            </div>

            <div className="lg:col-span-12">
              <NutritionTabs
                value={v.activeTab}
                onChange={v.setActiveTab}
                selectedDay={v.selectedPage}
                onSelectDay={v.setSelectedPage}
                dayButtons={v.pageButtons}
              />
            </div>

            <div className="lg:col-span-12">
              <NutritionTabContent
                activeTab={v.activeTab}
                meals={v.paginatedMeals}
                selectedMealIndex={v.selectedMealIndex}
                onSelectMealIndex={v.setSelectedMealIndex}
                onViewRecipe={openRecipe}
                onSwapMeal={v.onSwapMeal}
                dailyTotals={v.dailyTotals}
                groceryList={v.groceryList}
                recipes={v.recipes}
                recipesLoading={v.recipesLoading}
                recipesError={
                  v.recipesError instanceof Error ? v.recipesError : null
                }
                recipeSearch={v.recipeSearch}
                onSearchChange={v.setRecipeSearch}
                recipeTypeFilter={v.recipeTypeFilter}
                onTypeFilterChange={v.setRecipeTypeFilter}
              />
            </div>
          </div>
        </main>
      </div>

      <SwapMealPanel
        currentMeal={v.selectedMeal}
        alternatives={v.swapAlternatives}
        loading={v.swapAlternativesLoading}
        applying={v.swapApplying}
        onGenerateAlternatives={v.onGenerateAlternatives}
        onUseAlternative={v.onUseAlternative}
      />

      <RecipeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        payload={dialogPayload}
      />
    </div>
  );
}
