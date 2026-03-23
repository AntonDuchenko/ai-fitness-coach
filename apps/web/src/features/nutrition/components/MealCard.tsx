"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { NutritionMeal } from "../types";
import { MacroPills } from "./MacroPills";

export function MealCard({
  meal,
  onViewRecipe,
  onSwapMeal,
}: {
  meal: NutritionMeal;
  onViewRecipe: () => void;
  onSwapMeal: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-start gap-4">
        <div
          className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary/30"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-heading text-sm font-semibold">
                {meal.name}
              </h3>
              <p className="mt-1 text-[12px] text-muted-foreground">
                {meal.time ? `${meal.mealType} · ${meal.time}` : meal.mealType}
              </p>
            </div>
            <div className="flex shrink-0 items-center">
              <span className="rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                {meal.calories} kcal
              </span>
            </div>
          </div>

          <div className="mt-3">
            <MacroPills meal={meal} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onViewRecipe}
        >
          View Recipe
        </Button>
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onSwapMeal}
        >
          Swap Meal
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-0 py-0 text-left"
            >
              ▼ Ingredients
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {meal.ingredients.map((i, idx) => (
                <li key={`${i.name}-${idx}`}>
                  {i.amount} {i.unit} {i.name}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-0 py-0 text-left"
            >
              ▼ Instructions
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
              {meal.instructions ?? "No instructions provided."}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </article>
  );
}
