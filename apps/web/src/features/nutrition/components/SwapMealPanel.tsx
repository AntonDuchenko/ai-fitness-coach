"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { NutritionMeal, NutritionRecipe } from "../types";
import { MacroComparison } from "./MacroComparison";

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
  applying,
  onGenerateAlternatives,
  onUseAlternative,
  className,
}: {
  currentMeal: NutritionMeal | undefined;
  alternatives: NutritionRecipe[];
  loading: boolean;
  applying: boolean;
  onGenerateAlternatives: () => void;
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
              : "Select a meal and click Swap to see alternatives"}
          </p>
        </div>
      </header>

      {currentMeal && alternatives.length === 0 && !loading ? (
        <Button
          type="button"
          className="mt-4 w-full"
          onClick={onGenerateAlternatives}
          disabled={loading}
        >
          Generate Alternatives
        </Button>
      ) : null}

      <div className="mt-4 flex flex-col gap-3">
        {loading ? (
          <>
            {SWAP_SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-44 w-full rounded-xl" />
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
            {currentMeal ? (
              <div className="mt-2">
                <MacroComparison
                  current={{
                    calories: currentMeal.calories,
                    protein: currentMeal.protein,
                    carbs: currentMeal.carbs,
                    fat: currentMeal.fat,
                  }}
                  alternative={{
                    calories: alt.calories,
                    protein: alt.protein,
                    carbs: alt.carbs,
                    fat: alt.fat,
                  }}
                />
              </div>
            ) : null}
            <Button
              type="button"
              className="mt-3 w-full"
              onClick={() => onUseAlternative(alt)}
              disabled={loading || applying}
            >
              {applying ? "Applying..." : "Use This"}
            </Button>
          </div>
        ))}

        {!loading && alternatives.length === 0 && !currentMeal ? (
          <p className="text-sm text-muted-foreground">
            Click &quot;Swap Meal&quot; on any meal card to see alternatives.
          </p>
        ) : null}
      </div>
    </aside>
  );
}
