"use client";

import type { NutritionMeal, NutritionRecipe } from "../types";
import type { DailyTotals } from "./DailySummary";
import { DailySummary } from "./DailySummary";
import { DayMealsPanel } from "./DayMealsPanel";
import { GroceryListPanel } from "./GroceryListPanel";
import type { RecipeDialogPayload } from "./RecipeDialog";
import { RecipesPanel } from "./RecipesPanel";

function mealToPayload(meal: NutritionMeal): RecipeDialogPayload {
  return {
    name: meal.name,
    mealType: meal.mealType,
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
    ingredients: meal.ingredients ?? [],
    instructions: meal.instructions ?? "No instructions provided.",
    prepTime: meal.prepTime,
    cookTime: meal.cookTime,
    servings: meal.servings,
    difficulty: meal.difficulty,
  };
}

export function NutritionTabContent({
  activeTab,
  meals,
  selectedMealIndex,
  onSelectMealIndex,
  onViewRecipe,
  onSwapMeal,
  dailyTotals,
  groceryList,
  recipes,
  recipesLoading,
  recipesError,
  recipeSearch,
  onSearchChange,
  recipeTypeFilter,
  onTypeFilterChange,
}: {
  activeTab: string;
  meals: NutritionMeal[];
  selectedMealIndex: number;
  onSelectMealIndex: (idx: number) => void;
  onViewRecipe: (payload: RecipeDialogPayload) => void;
  onSwapMeal: (idx: number) => void;
  dailyTotals: DailyTotals;
  groceryList: Record<string, string[]>;
  recipes: NutritionRecipe[];
  recipesLoading: boolean;
  recipesError: Error | null;
  recipeSearch: string;
  onSearchChange: (v: string) => void;
  recipeTypeFilter: string;
  onTypeFilterChange: (v: string) => void;
}) {
  const errorMessage = recipesError?.message ?? null;

  if (activeTab === "mealPlan") {
    return (
      <>
        <DayMealsPanel
          meals={meals}
          selectedMealIndex={selectedMealIndex}
          onSelectMealIndex={onSelectMealIndex}
          onViewRecipe={(meal) => onViewRecipe(mealToPayload(meal))}
          onSwapMeal={onSwapMeal}
        />
        <DailySummary dailyTotals={dailyTotals} />
      </>
    );
  }

  if (activeTab === "groceryList") {
    return <GroceryListPanel groceryList={groceryList} />;
  }

  if (activeTab === "recipes") {
    return (
      <RecipesPanel
        recipes={recipes}
        loading={recipesLoading}
        errorMessage={errorMessage}
        search={recipeSearch}
        onSearchChange={onSearchChange}
        typeFilter={recipeTypeFilter}
        onTypeFilterChange={onTypeFilterChange}
        onViewRecipe={(r) =>
          onViewRecipe({
            name: r.name,
            mealType: r.mealType,
            calories: r.calories,
            protein: r.protein,
            carbs: r.carbs,
            fat: r.fat,
            ingredients: r.ingredients,
            instructions: r.instructions,
            prepTime: r.prepTime,
            cookTime: r.cookTime,
            servings: r.servings,
            difficulty: r.difficulty,
          })
        }
      />
    );
  }

  return null;
}
