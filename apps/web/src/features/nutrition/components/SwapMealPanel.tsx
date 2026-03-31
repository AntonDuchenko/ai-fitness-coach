"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Sparkles, X } from "lucide-react";
import { useState } from "react";
import type { NutritionMeal, NutritionRecipe } from "../types";

const SWAP_SKELETON_KEYS = ["a", "b", "c"] as const;

export function SwapMealPanel({
  currentMeal,
  alternatives,
  loading,
  applying,
  onGenerateAlternatives,
  onUseAlternative,
}: {
  currentMeal: NutritionMeal | undefined;
  alternatives: NutritionRecipe[];
  loading: boolean;
  applying: boolean;
  onGenerateAlternatives: () => void;
  onUseAlternative: (alt: NutritionRecipe) => void;
}) {
  const [open, setOpen] = useState(false);
  const hasContent = loading || alternatives.length > 0 || currentMeal;

  if (!hasContent && !open) return null;

  return (
    <>
      {/* Backdrop (mobile & desktop) */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          onKeyDown={() => {}}
          role="presentation"
        />
      )}

      {/* Side sheet */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-[61] flex h-full w-full max-w-lg flex-col border-l border-m3-outline-variant/20 bg-m3-surface shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-300 lg:relative lg:z-auto lg:w-[380px] lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0",
          !hasContent && "lg:hidden",
        )}
        aria-label="Swap Meal"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-m3-outline-variant/10 bg-m3-surface/80 p-6 backdrop-blur-md">
          <h2 className="font-heading text-xl font-bold text-m3-on-surface">
            Swap Your Meal
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-m3-surface-high lg:hidden"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {/* Current Meal */}
        {currentMeal && (
          <section className="p-6">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-m3-outline">
              Current Meal
            </h3>
            <div className="rounded-2xl border border-m3-outline-variant/10 bg-m3-surface-low p-5">
              <h4 className="mb-3 text-lg font-bold text-m3-on-surface">
                {currentMeal.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                <MacroPill label={`${currentMeal.calories} kcal`} />
                <MacroPill
                  label={`${Math.round(currentMeal.protein)}g Protein`}
                  accent
                />
                <MacroPill label={`${Math.round(currentMeal.carbs)}g Carbs`} />
                <MacroPill label={`${Math.round(currentMeal.fat)}g Fat`} />
              </div>
            </div>
          </section>
        )}

        {/* Generate / Alternatives */}
        <section className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-m3-outline">
              AI Alternatives
            </h3>
            {currentMeal && alternatives.length === 0 && !loading && (
              <button
                type="button"
                onClick={onGenerateAlternatives}
                className="flex cursor-pointer items-center gap-1 text-xs font-bold text-m3-primary-container hover:underline"
              >
                <Sparkles className="size-3.5" aria-hidden />
                Generate Alternatives
              </button>
            )}
          </div>

          <div className="space-y-4">
            {loading &&
              SWAP_SKELETON_KEYS.map((k) => (
                <Skeleton key={k} className="h-36 w-full rounded-2xl" />
              ))}

            {alternatives.map((alt) => (
              <AlternativeCard
                key={alt.name}
                alt={alt}
                currentMeal={currentMeal}
                applying={applying}
                onUse={() => onUseAlternative(alt)}
              />
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}

function AlternativeCard({
  alt,
  currentMeal,
  applying,
  onUse,
}: {
  alt: NutritionRecipe;
  currentMeal: NutritionMeal | undefined;
  applying: boolean;
  onUse: () => void;
}) {
  const protDiff = currentMeal
    ? Math.round(alt.protein - currentMeal.protein)
    : 0;
  const calDiff = currentMeal
    ? Math.round(alt.calories - currentMeal.calories)
    : 0;

  return (
    <div className="group rounded-2xl border border-m3-outline-variant/10 bg-m3-surface-low p-5 transition-all hover:border-m3-primary-container/30">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h4 className="font-bold text-m3-on-surface">{alt.name}</h4>
          <div className="mt-2 flex gap-2">
            <span className="rounded bg-m3-surface-highest px-2 py-0.5 text-[10px] text-m3-outline">
              {alt.calories} kcal
            </span>
            <span className="rounded bg-m3-primary-container/10 px-2 py-0.5 text-[10px] font-bold text-m3-primary-container">
              {Math.round(alt.protein)}g Protein
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onUse}
          disabled={applying}
          className="cursor-pointer rounded-lg bg-m3-primary-container px-4 py-2 text-xs font-bold text-m3-on-primary-container opacity-0 transition-opacity group-hover:opacity-100 active:scale-95"
        >
          {applying ? "..." : "Use This"}
        </button>
      </div>

      {currentMeal && (protDiff !== 0 || calDiff !== 0) && (
        <div className="flex items-center gap-4 border-t border-m3-outline-variant/5 pt-3">
          {protDiff !== 0 && (
            <DiffIndicator
              value={protDiff}
              unit="g protein"
              positive={protDiff > 0}
            />
          )}
          {calDiff !== 0 && (
            <DiffIndicator value={calDiff} unit="kcal" positive={calDiff < 0} />
          )}
        </div>
      )}
    </div>
  );
}

function DiffIndicator({
  value,
  unit,
  positive,
}: {
  value: number;
  unit: string;
  positive: boolean;
}) {
  const isUp = value > 0;
  return (
    <div className="flex items-center gap-1">
      {isUp ? (
        <ArrowUp
          className={cn(
            "size-3.5",
            positive ? "text-m3-secondary" : "text-m3-error",
          )}
        />
      ) : (
        <ArrowDown
          className={cn(
            "size-3.5",
            positive ? "text-m3-secondary" : "text-m3-error",
          )}
        />
      )}
      <span
        className={cn(
          "text-[11px] font-bold",
          positive ? "text-m3-secondary" : "text-m3-error",
        )}
      >
        {isUp ? "+" : ""}
        {value} {unit}
      </span>
    </div>
  );
}

function MacroPill({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium",
        accent
          ? "border-m3-primary-container/10 bg-m3-primary-container/10 font-bold text-m3-primary-container"
          : "border-m3-outline-variant/20 bg-m3-surface-highest text-m3-outline",
      )}
    >
      {label}
    </span>
  );
}
