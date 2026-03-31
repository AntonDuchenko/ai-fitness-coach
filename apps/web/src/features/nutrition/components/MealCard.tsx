"use client";

import { cn } from "@/lib/utils";
import { Clock, Package } from "lucide-react";
import type { NutritionMeal } from "../types";

export function MealCard({
  meal,
  selected,
  onSelect,
  onViewRecipe,
  onSwapMeal,
}: {
  meal: NutritionMeal;
  selected: boolean;
  onSelect: () => void;
  onViewRecipe: () => void;
  onSwapMeal: () => void;
}) {
  const ingredientNames = meal.ingredients
    .slice(0, 4)
    .map((i) => i.name)
    .join(", ");
  const prepTime = meal.prepTime ?? 10;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "glass-card flex w-full cursor-pointer flex-col gap-6 rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-0.5 lg:flex-row",
        selected && "ring-2 ring-m3-primary-container/60",
      )}
    >
      {/* Image placeholder */}
      <div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-2xl bg-m3-surface-high lg:w-48">
        <div className="flex h-full w-full items-center justify-center text-m3-outline">
          <Package className="size-8" aria-hidden />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col justify-between">
        <div className="flex justify-between gap-4">
          <div>
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-m3-primary-container">
              {meal.time ? `${meal.time} \u2022 ` : ""}
              {meal.mealType}
            </span>
            <h3 className="font-heading text-2xl font-bold text-m3-on-surface">
              {meal.name}
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="whitespace-nowrap rounded-full bg-m3-surface-highest px-3 py-1 text-xs leading-none font-semibold text-m3-outline">
              {meal.calories} kcal
            </span>
            <span className="whitespace-nowrap rounded-full border border-m3-secondary/20 bg-m3-secondary/10 px-3 py-1 text-xs leading-none font-bold text-m3-secondary">
              {Math.round(meal.protein)}g P
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-m3-outline">
          {ingredientNames && (
            <div className="flex items-center gap-1">
              <Package className="size-4" aria-hidden />
              <span>{ingredientNames}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="size-4" aria-hidden />
            <span>Prep: {prepTime} mins</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 lg:flex-col lg:justify-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewRecipe();
          }}
          className="cursor-pointer rounded-xl bg-m3-primary-container px-6 py-2 text-sm font-bold text-m3-on-primary-container transition-all active:scale-95"
        >
          View Recipe
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSwapMeal();
          }}
          className="cursor-pointer rounded-xl bg-m3-surface-highest px-6 py-2 text-sm font-bold text-m3-on-surface transition-all hover:bg-m3-surface-high active:scale-95"
        >
          Swap Meal
        </button>
      </div>
    </button>
  );
}
