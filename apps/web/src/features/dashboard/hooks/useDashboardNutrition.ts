"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface NutritionPlanApi {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealPlan: unknown;
}

export interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

function sumMealMacros(mealPlan: unknown): MacroTotals {
  if (!Array.isArray(mealPlan)) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  return mealPlan.reduce(
    (acc: MacroTotals, m: Record<string, unknown>) => {
      if (typeof m.calories === "number") acc.calories += m.calories;
      if (typeof m.protein === "number") acc.protein += m.protein;
      if (typeof m.carbs === "number") acc.carbs += m.carbs;
      if (typeof m.fat === "number") acc.fat += m.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

export function useDashboardNutrition() {
  const query = useQuery({
    queryKey: ["nutrition", "plan"],
    queryFn: () => apiClient<NutritionPlanApi>("/nutrition/plan"),
  });

  const targets = useMemo((): MacroTargets | null => {
    if (!query.data) return null;
    return {
      calories: query.data.dailyCalories,
      protein: query.data.proteinGrams,
      carbs: query.data.carbsGrams,
      fat: query.data.fatGrams,
    };
  }, [query.data]);

  const totals = useMemo(
    () => (query.data ? sumMealMacros(query.data.mealPlan) : null),
    [query.data],
  );

  return {
    targets,
    totals,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
