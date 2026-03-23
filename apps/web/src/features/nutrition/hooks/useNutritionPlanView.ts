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

const PLAN_KEY = ["nutrition", "plan"] as const;

function isPlanNotFound(err: unknown): boolean {
  return err instanceof ApiError && err.statusCode === 404;
}

function normalizeRecipeType(type: string | undefined): string {
  if (!type) return "";
  const t = type.trim().toLowerCase();
  if (t.includes("breakfast")) return "breakfast";
  if (t.includes("lunch")) return "lunch";
  if (t.includes("dinner")) return "dinner";
  if (t.includes("snack")) return "snack";
  return "";
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

function mealTypeLabel(type: string): string {
  const t = type.trim();
  if (!t) return "Meal";
  return t;
}

function scoreRecipeAgainstMeal(recipe: NutritionRecipe, meal: NutritionMeal) {
  // Lower score is better.
  const calScore =
    Math.abs(recipe.calories - meal.calories) / Math.max(1, meal.calories);
  const pScore =
    Math.abs(recipe.protein - meal.protein) / Math.max(1, meal.protein);
  const cScore = Math.abs(recipe.carbs - meal.carbs) / Math.max(1, meal.carbs);
  const fScore = Math.abs(recipe.fat - meal.fat) / Math.max(1, meal.fat);
  return calScore * 0.4 + pScore * 0.25 + cScore * 0.2 + fScore * 0.15;
}

export function useNutritionPlanView() {
  const queryClient = useQueryClient();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NutritionTab>("mealPlan");

  const [selectedDay, setSelectedDay] = useState(1); // UI-only for now (API mealPlan is daily)
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

  useEffect(() => {
    // Keep index in range when plan changes.
    if (selectedMealIndex > localMealPlan.length - 1) setSelectedMealIndex(0);
  }, [localMealPlan.length, selectedMealIndex]);

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

  const selectedMeal = localMealPlan[selectedMealIndex];
  const selectedMealRecipeType = normalizeRecipeType(selectedMeal?.mealType);

  const swapAlternativesQuery = useQuery({
    queryKey: [
      "nutrition",
      "recipes",
      "alternatives",
      selectedMealRecipeType,
    ] as const,
    queryFn: () =>
      apiClient<NutritionRecipe[]>(
        `/nutrition/recipes?type=${encodeURIComponent(selectedMealRecipeType)}`,
      ),
    enabled: Boolean(selectedMealRecipeType),
    staleTime: 5 * 60 * 1000,
  });

  const swapAlternatives = useMemo(() => {
    if (!selectedMeal) return [];
    const list = swapAlternativesQuery.data ?? [];
    const scored = list
      .filter((r) => r.mealType && normalizeRecipeType(r.mealType))
      .map((r) => ({
        recipe: r,
        score: scoreRecipeAgainstMeal(r, selectedMeal),
      }))
      .sort((a, b) => a.score - b.score);
    return scored.slice(0, 3).map((s) => s.recipe);
  }, [selectedMeal, swapAlternativesQuery.data]);

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

  const onUseAlternative = (alt: NutritionRecipe) => {
    if (!selectedMeal) return;
    setLocalMealPlan((prev) =>
      prev.map((m, idx) =>
        idx === selectedMealIndex
          ? {
              ...m,
              name: alt.name,
              calories: alt.calories,
              protein: alt.protein,
              carbs: alt.carbs,
              fat: alt.fat,
              ingredients: alt.ingredients,
              instructions: alt.instructions,
              prepTime: alt.prepTime,
              cookTime: alt.cookTime,
            }
          : m,
      ),
    );
    toast.success("Meal swapped");
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

  const dayButtons = useMemo(
    () => Array.from({ length: 7 }, (_, i) => i + 1),
    [],
  );

  const onToggleGrocery = () => {
    // UI-only state will live in GroceryListPanel.
  };

  return {
    menuOpen,
    setMenuOpen,
    isLoading: planQuery.isLoading,
    isError: planQuery.isError,
    error: planQuery.error,
    isPlanNotFound: isPlanNotFound(planQuery.error),
    refetchPlan: planQuery.refetch,

    plan,
    localMealPlan,
    selectedMealIndex,
    setSelectedMealIndex,
    selectedMeal,

    activeTab,
    setActiveTab,
    selectedDay,
    setSelectedDay,
    dayButtons,

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

    // Recipes / Swap
    recipes: recipesQuery.data ?? [],
    recipesLoading: recipesQuery.isLoading,
    recipesError: recipesQuery.isError ? recipesQuery.error : null,
    recipeSearch,
    setRecipeSearch,
    recipeTypeFilter,
    setRecipeTypeFilter,

    swapAlternatives,
    swapAlternativesLoading: swapAlternativesQuery.isLoading,

    regenerate,
    onUseAlternative,

    mealTypeLabel,
    onToggleGrocery,
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
