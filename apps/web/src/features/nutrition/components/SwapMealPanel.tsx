"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { NutritionMeal, NutritionRecipe } from "../types";

const SWAP_SKELETON_KEYS = ["a", "b", "c"] as const;

function MacroPillsForRecipe({ r }: { r: NutritionRecipe }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="rounded-full">
        {r.calories} kcal
      </Badge>
      <Badge variant="success" className="rounded-full">
        {Math.round(r.protein)}g P
      </Badge>
      <Badge variant="outline" className="rounded-full">
        {Math.round(r.carbs)}g C
      </Badge>
      <Badge variant="destructive" className="rounded-full">
        {Math.round(r.fat)}g F
      </Badge>
    </div>
  );
}

export function SwapMealPanel({
  currentMeal,
  alternatives,
  loading,
  onUseAlternative,
  className,
}: {
  currentMeal: NutritionMeal | undefined;
  alternatives: NutritionRecipe[];
  loading: boolean;
  onUseAlternative: (alt: NutritionRecipe) => void;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "w-full rounded-2xl border border-border/60 bg-card/60 p-4 lg:max-w-[420px]",
        className,
      )}
      aria-label="Swap Meal"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-heading text-base font-semibold">Swap Meal</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            {currentMeal
              ? `Current: ${currentMeal.name}`
              : "Choose a meal to swap"}
          </p>
        </div>
      </header>

      <div className="mt-4 flex flex-col gap-3">
        {loading ? (
          <>
            {SWAP_SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-40 w-full rounded-xl" />
            ))}
          </>
        ) : null}

        {alternatives.map((alt) => (
          <div
            key={alt.name}
            className="rounded-2xl border border-border/60 bg-card/60 p-3"
          >
            <p className="font-heading text-sm font-semibold">{alt.name}</p>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {alt.mealType}
            </p>
            <div className="mt-3">
              <MacroPillsForRecipe r={alt} />
            </div>
            <Button
              type="button"
              className="mt-3 w-full"
              onClick={() => onUseAlternative(alt)}
              disabled={loading}
            >
              Use This
            </Button>
          </div>
        ))}

        {!loading && alternatives.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No alternative recipes found.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
