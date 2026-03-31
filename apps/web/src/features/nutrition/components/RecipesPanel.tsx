"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Clock, Search, Users } from "lucide-react";
import type { NutritionRecipe } from "../types";

const TYPES = ["all", "breakfast", "lunch", "dinner", "snack"] as const;
const LOADING_KEYS = ["a", "b", "c", "d", "e", "f"] as const;

export function RecipesPanel({
  recipes,
  loading,
  errorMessage,
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  onViewRecipe,
}: {
  recipes: NutritionRecipe[];
  loading: boolean;
  errorMessage: string | null;
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: string;
  onTypeFilterChange: (v: string) => void;
  onViewRecipe: (r: NutritionRecipe) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-m3-surface-low p-2 md:flex-row">
        <div className="relative w-full flex-1">
          <Search
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-m3-outline"
            aria-hidden
          />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recipes..."
            className="w-full rounded-xl border-none bg-m3-surface-lowest py-3 pl-12 pr-4 text-sm text-m3-on-surface placeholder:text-m3-outline focus:ring-2 focus:ring-m3-primary-container/20"
            aria-label="Search recipes"
          />
        </div>
        <div className="flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
          {TYPES.map((t) => {
            const isActive = t === "all" ? !typeFilter : typeFilter === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onTypeFilterChange(t === "all" ? "" : t)}
                className={cn(
                  "cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "border border-m3-primary-container/20 bg-m3-primary-container/10 font-bold text-m3-primary-container"
                    : "bg-m3-surface-high text-m3-outline hover:text-m3-on-surface",
                )}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          LOADING_KEYS.map((k) => (
            <div
              key={k}
              className="rounded-xl border border-m3-outline-variant/10 bg-m3-surface-low"
            >
              <Skeleton className="h-56 w-full rounded-t-xl" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="mt-4 h-10 w-full rounded-xl" />
              </div>
            </div>
          ))
        ) : errorMessage ? (
          <p className="col-span-full text-sm text-m3-error">{errorMessage}</p>
        ) : recipes.length === 0 ? (
          <p className="col-span-full text-sm text-m3-outline">
            No recipes found. Try a different search.
          </p>
        ) : (
          recipes.map((r) => (
            <RecipeCard
              key={`${r.name}-${r.mealType}`}
              recipe={r}
              onView={() => onViewRecipe(r)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function RecipeCard({
  recipe: r,
  onView,
}: {
  recipe: NutritionRecipe;
  onView: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-m3-outline-variant/10 bg-m3-surface-low transition-all duration-300 hover:border-m3-primary-container/30">
      {/* Image placeholder */}
      <div className="relative h-56 overflow-hidden bg-m3-surface-high">
        <div className="flex h-full w-full items-center justify-center text-m3-outline">
          <span className="text-4xl">🍽</span>
        </div>
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-m3-primary-container px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-m3-on-primary-container">
            {r.mealType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-6">
        <div className="space-y-1">
          <h3 className="font-heading text-xl font-bold leading-tight text-m3-on-surface">
            {r.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-m3-outline">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {(r.prepTime ?? 0) + (r.cookTime ?? 0)}m
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-3.5" aria-hidden />
              {r.servings ?? 1} Serving{(r.servings ?? 1) !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 border-y border-m3-outline-variant/10 py-4">
          <div className="text-center">
            <div className="text-sm font-bold text-m3-on-surface">
              {r.calories}
            </div>
            <div className="text-[10px] uppercase text-m3-outline">Kcal</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-m3-primary-container">
              {Math.round(r.protein)}g
            </div>
            <div className="text-[10px] uppercase text-m3-outline">Prot</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-m3-secondary">
              {Math.round(r.carbs)}g
            </div>
            <div className="text-[10px] uppercase text-m3-outline">Carb</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-[var(--m3-tertiary)]">
              {Math.round(r.fat)}g
            </div>
            <div className="text-[10px] uppercase text-m3-outline">Fat</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onView}
          className="mt-auto w-full cursor-pointer rounded-xl bg-m3-surface-high py-3 text-sm font-bold text-m3-on-surface transition-all hover:bg-m3-primary-container hover:text-m3-on-primary-container active:scale-95"
        >
          View Recipe
        </button>
      </div>
    </article>
  );
}
