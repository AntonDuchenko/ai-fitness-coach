"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { NutritionMealIngredient } from "../types";

export type RecipeDialogPayload = {
  name: string;
  mealType?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: NutritionMealIngredient[];
  instructions: string;
};

export function RecipeDialog({
  open,
  onOpenChange,
  payload,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payload: RecipeDialogPayload | null;
}) {
  const macros = payload
    ? {
        calories: payload.calories,
        protein: payload.protein,
        carbs: payload.carbs,
        fat: payload.fat,
      }
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-full max-w-2xl overflow-auto p-6">
        {payload ? (
          <>
            <DialogTitle className="font-heading">{payload.name}</DialogTitle>
            <DialogDescription>
              {payload.mealType ? payload.mealType : "Recipe details"} ·{" "}
              {payload.calories} kcal
            </DialogDescription>

            {macros ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="default" className="rounded-full">
                  {macros.calories} kcal
                </Badge>
                <Badge variant="success" className="rounded-full">
                  {Math.round(macros.protein)}g Protein
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {Math.round(macros.carbs)}g Carbs
                </Badge>
                <Badge variant="destructive" className="rounded-full">
                  {Math.round(macros.fat)}g Fat
                </Badge>
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card/60 p-3">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-auto w-full justify-start px-0 text-foreground"
                    >
                      Ingredients
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                      {payload.ingredients.map((i, idx) => (
                        <li key={`${i.name}-${idx}`}>
                          {i.amount} {i.unit} {i.name}
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <div className="rounded-xl border border-border/60 bg-card/60 p-3">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-auto w-full justify-start px-0 text-foreground"
                    >
                      Instructions
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                      {payload.instructions}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No recipe selected.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
