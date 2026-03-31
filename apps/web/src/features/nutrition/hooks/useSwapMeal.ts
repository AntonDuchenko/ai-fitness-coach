"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { NutritionMeal, NutritionRecipe } from "../types";

const PLAN_KEY = ["nutrition", "plan"] as const;

type SwapMealRequest = {
  mealIndex: number;
  currentMeal: {
    name: string;
    mealType: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

type ApplySwapRequest = {
  planId: string;
  mealIndex: number;
  recipe: NutritionRecipe;
};

export function useSwapMeal() {
  const queryClient = useQueryClient();
  const [alternatives, setAlternatives] = useState<NutritionRecipe[]>([]);
  const [swapMealIndex, setSwapMealIndex] = useState<number | null>(null);

  const generateAlternatives = useMutation({
    mutationFn: (data: SwapMealRequest) =>
      apiClient<NutritionRecipe[]>("/nutrition/swap-meal", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      setAlternatives(data);
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to generate alternatives",
      );
      setAlternatives([]);
    },
  });

  const applySwap = useMutation({
    mutationFn: (data: ApplySwapRequest) =>
      apiClient<unknown>("/nutrition/swap-meal/apply", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: PLAN_KEY });
      const previous = queryClient.getQueryData(PLAN_KEY);

      queryClient.setQueryData(
        PLAN_KEY,
        (old: Record<string, unknown> | undefined) => {
          if (!old) return old;
          const mealPlan = old.mealPlan as unknown[];
          if (!Array.isArray(mealPlan)) return old;
          const updated = [...mealPlan];
          updated[data.mealIndex] = {
            mealType: data.recipe.mealType,
            name: data.recipe.name,
            calories: data.recipe.calories,
            protein: data.recipe.protein,
            carbs: data.recipe.carbs,
            fat: data.recipe.fat,
            ingredients: data.recipe.ingredients,
            instructions: data.recipe.instructions,
            prepTime: data.recipe.prepTime,
            cookTime: data.recipe.cookTime,
          };
          return { ...old, mealPlan: updated };
        },
      );

      return { previous };
    },
    onSuccess: () => {
      toast.success("Meal swapped successfully");
      setAlternatives([]);
      setSwapMealIndex(null);
    },
    onError: (err, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(PLAN_KEY, context.previous);
      }
      toast.error(err instanceof Error ? err.message : "Failed to apply swap");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PLAN_KEY });
    },
  });

  const requestSwap = (mealIndex: number, meal: NutritionMeal) => {
    setSwapMealIndex(mealIndex);
    setAlternatives([]);
    generateAlternatives.mutate({
      mealIndex,
      currentMeal: {
        name: meal.name,
        mealType: meal.mealType,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
      },
    });
  };

  const clearSwap = () => {
    setSwapMealIndex(null);
    setAlternatives([]);
  };

  return {
    swapMealIndex,
    alternatives,
    isGenerating: generateAlternatives.isPending,
    isApplying: applySwap.isPending,
    requestSwap,
    applySwap,
    clearSwap,
  };
}
