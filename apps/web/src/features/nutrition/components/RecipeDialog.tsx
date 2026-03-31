"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Clock, Package, Users } from "lucide-react";
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
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: string;
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-full max-w-4xl! overflow-auto border-m3-outline-variant/15 bg-m3-surface p-0" showCloseButton={false}>
        {payload ? (
          <RecipeContent p={payload} onClose={() => onOpenChange(false)} />
        ) : (
          <div className="py-12 text-center text-sm text-m3-outline">
            No recipe selected.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function RecipeContent({
  p,
  onClose,
}: {
  p: RecipeDialogPayload;
  onClose: () => void;
}) {
  const steps = p.instructions
    ? p.instructions.split(/\n+/).filter((s) => s.trim())
    : [];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left: Image + Core Info */}
      <div className="relative flex min-h-[250px] w-full flex-col justify-end bg-m3-surface-high p-8 md:w-5/12 md:min-h-[500px]">
        <div className="mb-auto flex h-32 items-center justify-center text-m3-outline">
          <Package className="size-16 opacity-30" aria-hidden />
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            {p.mealType && (
              <span className="rounded-full bg-m3-primary-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-m3-on-primary-container">
                {p.mealType}
              </span>
            )}
            {p.difficulty && (
              <span className="rounded-full bg-m3-surface-highest px-3 py-1 text-xs font-bold uppercase tracking-wider text-m3-on-surface">
                {p.difficulty}
              </span>
            )}
          </div>
          <DialogTitle className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-m3-on-surface">
            {p.name}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-m3-outline">
            {p.prepTime != null && (
              <span className="flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                Prep {p.prepTime}m
              </span>
            )}
            {p.cookTime != null && (
              <span className="flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                Cook {p.cookTime}m
              </span>
            )}
            {p.servings != null && (
              <span className="flex items-center gap-1">
                <Users className="size-4" aria-hidden />
                {p.servings} Serving{p.servings !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Details */}
      <div className="w-full space-y-8 bg-m3-surface-lowest p-8 md:w-7/12 md:p-10">
        {/* Macro Summary */}
        <section>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-m3-primary-container">
            Nutritional Summary
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MacroBox value={p.calories} label="kcal" />
            <MacroBox
              value={`${Math.round(p.protein)}g`}
              label="Protein"
              accent="border-b-2 border-m3-secondary/30 text-m3-secondary"
            />
            <MacroBox
              value={`${Math.round(p.carbs)}g`}
              label="Carbs"
              accent="border-b-2 border-m3-primary-container/30 text-m3-primary-container"
            />
            <MacroBox
              value={`${Math.round(p.fat)}g`}
              label="Fat"
              accent="border-b-2 border-[var(--m3-tertiary)]/30 text-[var(--m3-tertiary)]"
            />
          </div>
        </section>

        {/* Ingredients */}
        {p.ingredients.length > 0 && (
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-m3-primary-container">
              Ingredients
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {p.ingredients.map((i, idx) => (
                <div
                  key={`${i.name}-${idx}`}
                  className="flex items-center justify-between border-b border-m3-outline-variant/10 py-2"
                >
                  <span className="font-medium text-m3-on-surface">
                    {i.name}
                  </span>
                  <span className="text-sm text-m3-outline">
                    {i.amount} {i.unit}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Instructions */}
        {steps.length > 0 && (
          <section>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-m3-primary-container">
              Step-by-Step Guide
            </h3>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={`step-${step.slice(0, 20)}`} className="flex gap-4">
                  <span className="flex size-8 flex-none items-center justify-center rounded-full border border-m3-outline-variant/20 bg-m3-surface-high text-xs font-bold text-m3-primary-container">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-m3-outline">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl bg-m3-surface-high px-8 py-3 font-heading font-bold text-m3-on-surface transition-colors hover:bg-m3-surface-highest active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function MacroBox({
  value,
  label,
  accent,
}: {
  value: number | string;
  label: string;
  accent?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl bg-m3-surface-low p-4 text-center ${accent ?? ""}`}
    >
      <span className="text-2xl font-bold leading-none text-m3-on-surface">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase text-m3-outline">
        {label}
      </span>
    </div>
  );
}
