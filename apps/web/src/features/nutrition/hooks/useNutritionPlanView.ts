"use client";

import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type {
  NutritionMeal,
  NutritionPlan,
  NutritionRecipe,
  NutritionTab,
} from "../types";
import { useSwapMeal } from "./useSwapMeal";

const PLAN_KEY = ["nutrition", "plan"] as const;

function isPlanNotFound(err: unknown): boolean {
  return err instanceof ApiError && err.statusCode === 404;
}

function safeParseMealPlan(value: unknown): NutritionMeal[] {
  if (!Array.isArray(value)) return [];

  const out: NutritionMeal[] = [];

  for (const m of value) {
    const meal = m as Partial<NutritionMeal>;
    if (!meal || typeof meal.name !== "string") continue;
    if (
      typeof meal.calories !== "number" ||
      typeof meal.protein !== "number" ||
      typeof meal.carbs !== "number" ||
      typeof meal.fat !== "number"
    ) {
      continue;
    }

    const ingredientsRaw = (meal.ingredients ?? []) as unknown;
    const ingredients = Array.isArray(ingredientsRaw)
      ? ingredientsRaw
          .map((i) => {
            const ing = i as Partial<NutritionMeal["ingredients"][number]>;
            if (!ing || typeof ing.name !== "string") return null;
            if (
              typeof ing.amount !== "number" ||
              typeof ing.unit !== "string"
            ) {
              return null;
            }
            return ing as NutritionMeal["ingredients"][number];
          })
          .filter((x): x is NutritionMeal["ingredients"][number] => x !== null)
      : [];

    const time = typeof meal.time === "string" ? meal.time : undefined;
    const instructions =
      typeof meal.instructions === "string" ? meal.instructions : undefined;

    out.push({
      mealType: typeof meal.mealType === "string" ? meal.mealType : "",
      ...(time ? { time } : {}),
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      ingredients,
      instructions,
      prepTime: typeof meal.prepTime === "number" ? meal.prepTime : undefined,
      cookTime: typeof meal.cookTime === "number" ? meal.cookTime : undefined,
      difficulty:
        typeof meal.difficulty === "string" ? meal.difficulty : undefined,
      servings: typeof meal.servings === "number" ? meal.servings : undefined,
    });
  }

  return out;
}

function safeParseGroceryList(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== "object") return {};
  const obj = value as Record<string, unknown>;
  const out: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (!Array.isArray(v)) continue;
    out[k] = v.filter((x): x is string => typeof x === "string");
  }
  return out;
}

export function useNutritionPlanView() {
  const queryClient = useQueryClient();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NutritionTab>("mealPlan");

  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedMealIndex, setSelectedMealIndex] = useState(0);

  const planQuery = useQuery({
    queryKey: PLAN_KEY,
    queryFn: () => apiClient<NutritionPlanApi>("/nutrition/plan"),
  });

  const [localMealPlan, setLocalMealPlan] = useState<NutritionMeal[]>([]);
  const plan = useMemo<NutritionPlan | null>(() => {
    if (!planQuery.data) return null;
    const raw = planQuery.data;
    const mealPlan = safeParseMealPlan(raw.mealPlan);
    const groceryList = safeParseGroceryList(raw.groceryList);
    return {
      id: raw.id,
      name: raw.name,
      dailyCalories: raw.dailyCalories,
      proteinGrams: raw.proteinGrams,
      carbsGrams: raw.carbsGrams,
      fatGrams: raw.fatGrams,
      mealsPerDay: raw.mealsPerDay,
      mealPlan,
      groceryList,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
    };
  }, [planQuery.data]);

  useEffect(() => {
    if (plan) setLocalMealPlan(plan.mealPlan);
  }, [plan]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger-only deps — reset selection when page or meal count changes
  useEffect(() => {
    setSelectedMealIndex(0);
  }, [selectedPage, localMealPlan.length]);

  const regenerate = useMutation({
    mutationFn: () =>
      apiClient<NutritionPlanApi>("/nutrition/plan/regenerate", {
        method: "POST",
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(PLAN_KEY, data);
      toast.success("Nutrition plan regenerated");
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to regenerate plan",
      );
    },
  });

  const groceryList = plan?.groceryList ?? {};

  const MEALS_PER_PAGE = 3;

  // selectedMealIndex is page-relative; globalMealIndex is for the full array
  const globalMealIndex =
    (selectedPage - 1) * MEALS_PER_PAGE + selectedMealIndex;
  const selectedMeal = localMealPlan[globalMealIndex];

  const swap = useSwapMeal();

  // Recipes tab (search + filter).
  const [recipeSearch, setRecipeSearch] = useState("");
  const [recipeTypeFilter, setRecipeTypeFilter] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(recipeSearch), 300);
    return () => clearTimeout(t);
  }, [recipeSearch]);

  const recipesQuery = useQuery({
    queryKey: [
      "nutrition",
      "recipes",
      "search",
      debouncedSearch.trim(),
      recipeTypeFilter,
    ] as const,
    queryFn: () => {
      const params = new URLSearchParams();
      if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
      if (recipeTypeFilter) params.set("type", recipeTypeFilter);
      const qs = params.toString();
      const endpoint = qs ? `/nutrition/recipes?${qs}` : "/nutrition/recipes";
      return apiClient<NutritionRecipe[]>(endpoint);
    },
    enabled: activeTab === "recipes",
    staleTime: 2 * 60 * 1000,
  });

  const onSwapMeal = (pageRelativeIdx: number) => {
    setSelectedMealIndex(pageRelativeIdx);
    const globalIdx = (selectedPage - 1) * MEALS_PER_PAGE + pageRelativeIdx;
    const meal = localMealPlan[globalIdx];
    if (meal) {
      swap.requestSwap(globalIdx, meal);
    }
  };

  const onUseAlternative = (alt: NutritionRecipe) => {
    if (!plan || swap.swapMealIndex === null) return;
    swap.applySwap.mutate({
      planId: plan.id,
      mealIndex: swap.swapMealIndex,
      recipe: alt,
    });
  };

  const dailyTotals = useMemo(() => {
    const meals = localMealPlan;
    const totals = meals.reduce(
      (acc, m) => {
        acc.calories += m.calories;
        acc.protein += m.protein;
        acc.carbs += m.carbs;
        acc.fat += m.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );
    const targets = plan
      ? {
          calories: plan.dailyCalories,
          protein: plan.proteinGrams,
          carbs: plan.carbsGrams,
          fat: plan.fatGrams,
        }
      : null;
    const check = (value: number, target: number) =>
      Math.abs(value - target) / Math.max(1, target) <= 0.05;

    return {
      totals,
      targets,
      hit: targets
        ? {
            calories: check(totals.calories, targets.calories),
            protein: check(totals.protein, targets.protein),
            carbs: check(totals.carbs, targets.carbs),
            fat: check(totals.fat, targets.fat),
          }
        : null,
    };
  }, [localMealPlan, plan]);

  const totalPages = Math.max(
    1,
    Math.ceil(localMealPlan.length / MEALS_PER_PAGE),
  );

  const pageButtons = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  // Reset page if out of range after plan change
  useEffect(() => {
    if (selectedPage > totalPages) setSelectedPage(1);
  }, [totalPages, selectedPage]);

  const paginatedMeals = useMemo(() => {
    const start = (selectedPage - 1) * MEALS_PER_PAGE;
    return localMealPlan.slice(start, start + MEALS_PER_PAGE);
  }, [localMealPlan, selectedPage]);

  return {
    menuOpen,
    setMenuOpen,
    isLoading: planQuery.isLoading,
    isError: planQuery.isError,
    error: planQuery.error,
    isPlanNotFound: isPlanNotFound(planQuery.error),
    refetchPlan: planQuery.refetch,

    plan,
    paginatedMeals,
    selectedMealIndex,
    setSelectedMealIndex,
    selectedMeal,

    activeTab,
    setActiveTab,
    selectedPage,
    setSelectedPage,
    pageButtons,

    macroTargets: plan
      ? {
          calories: plan.dailyCalories,
          protein: plan.proteinGrams,
          carbs: plan.carbsGrams,
          fat: plan.fatGrams,
        }
      : null,
    dailyTotals,

    groceryList,

    // Recipes
    recipes: recipesQuery.data ?? [],
    recipesLoading: recipesQuery.isLoading,
    recipesError: recipesQuery.isError ? recipesQuery.error : null,
    recipeSearch,
    setRecipeSearch,
    recipeTypeFilter,
    setRecipeTypeFilter,

    // Swap
    swapAlternatives: swap.alternatives,
    swapAlternativesLoading: swap.isGenerating,
    swapApplying: swap.isApplying,
    onSwapMeal,
    onUseAlternative,
    onGenerateAlternatives: () => {
      if (selectedMeal && globalMealIndex >= 0) {
        swap.requestSwap(globalMealIndex, selectedMeal);
      }
    },

    regenerate,
  };
}

type NutritionPlanApi = {
  id: string;
  name: string;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealsPerDay: number;
  mealPlan: unknown;
  groceryList: unknown;
  isActive: boolean;
  createdAt: string;
};
