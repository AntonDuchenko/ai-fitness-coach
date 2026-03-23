"use client";

import { Button } from "@/components/ui/button";
import type { NutritionTab } from "../types";

export function NutritionTabs({
  value,
  onChange,
}: {
  value: NutritionTab;
  onChange: (next: NutritionTab) => void;
}) {
  return (
    <nav
      className="flex w-full items-center justify-between gap-2 rounded-xl border border-border/60 bg-card/60 p-2"
      aria-label="Nutrition tabs"
    >
      <Button
        type="button"
        variant={value === "mealPlan" ? "secondary" : "ghost"}
        className="h-10 min-w-0 flex-1 rounded-lg"
        onClick={() => onChange("mealPlan")}
      >
        Sample Meal Plan
      </Button>
      <Button
        type="button"
        variant={value === "groceryList" ? "secondary" : "ghost"}
        className="h-10 min-w-0 flex-1 rounded-lg"
        onClick={() => onChange("groceryList")}
      >
        Grocery List
      </Button>
      <Button
        type="button"
        variant={value === "recipes" ? "secondary" : "ghost"}
        className="h-10 min-w-0 flex-1 rounded-lg"
        onClick={() => onChange("recipes")}
      >
        Recipes
      </Button>
    </nav>
  );
}
