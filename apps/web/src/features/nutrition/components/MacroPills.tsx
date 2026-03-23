"use client";

import { Badge } from "@/components/ui/badge";
import type { NutritionMeal } from "../types";

function macroBadgeVariant(
  key: "calories" | "protein" | "carbs" | "fat",
): "default" | "success" | "outline" | "destructive" {
  switch (key) {
    case "protein":
      return "success";
    case "carbs":
      return "outline";
    case "fat":
      return "destructive";
    default:
      return "default";
  }
}

export function MacroPills({ meal }: { meal: NutritionMeal }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant={macroBadgeVariant("calories")} className="rounded-full">
        {meal.calories} kcal
      </Badge>
      <Badge variant={macroBadgeVariant("protein")} className="rounded-full">
        {Math.round(meal.protein)}g P
      </Badge>
      <Badge variant={macroBadgeVariant("carbs")} className="rounded-full">
        {Math.round(meal.carbs)}g C
      </Badge>
      <Badge variant={macroBadgeVariant("fat")} className="rounded-full">
        {Math.round(meal.fat)}g F
      </Badge>
    </div>
  );
}
