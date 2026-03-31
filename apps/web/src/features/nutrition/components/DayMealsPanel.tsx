"use client";

import type { NutritionMeal } from "../types";
import { MealCard } from "./MealCard";

export function DayMealsPanel({
  meals,
  selectedMealIndex,
  onSelectMealIndex,
  onViewRecipe,
  onSwapMeal,
}: {
  meals: NutritionMeal[];
  selectedMealIndex: number;
  onSelectMealIndex: (idx: number) => void;
  onViewRecipe: (meal: NutritionMeal) => void;
  onSwapMeal: (idx: number) => void;
}) {
  return (
    <div className="space-y-6">
      {meals.map((meal, idx) => (
        <MealCard
          key={`${meal.name}-${idx}`}
          meal={meal}
          selected={idx === selectedMealIndex}
          onSelect={() => onSelectMealIndex(idx)}
          onViewRecipe={() => onViewRecipe(meal)}
          onSwapMeal={() => onSwapMeal(idx)}
        />
      ))}
    </div>
  );
}
