"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { StepErrors } from "../schemas";
import type { OnboardingData } from "../types";

interface StepNutritionProps {
  data: OnboardingData;
  errors: StepErrors;
  onUpdate: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => void;
  onToggle: (key: "cuisinePreferences", value: string) => void;
}

const COOKING_LEVELS = ["beginner", "intermediate", "advanced", "chef"];
const CUISINES = [
  { value: "mediterranean", label: "Mediterranean" },
  { value: "asian", label: "Asian" },
  { value: "mexican", label: "Mexican" },
  { value: "american", label: "American" },
];

export function StepNutrition({
  data,
  errors,
  onUpdate,
  onToggle,
}: StepNutritionProps) {
  return (
    <div className="space-y-6">
      {/* Meals Per Day */}
      <div className="glass-card space-y-4 rounded-xl p-6">
        <span className="block font-heading font-bold text-m3-on-surface">
          Meals Per Day
        </span>
        <div
          className="flex items-center justify-between rounded-full bg-m3-surface-lowest p-2"
          role="radiogroup"
          aria-label="Meals per day"
        >
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              aria-checked={data.mealsPerDay === n}
              onClick={() => onUpdate("mealsPerDay", n)}
              className={cn(
                "flex size-12 items-center justify-center rounded-full font-bold transition-all active:scale-90",
                data.mealsPerDay === n
                  ? "bg-m3-primary-container text-m3-on-primary-container shadow-lg shadow-m3-primary-container/20"
                  : "text-zinc-500 hover:bg-white/5",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Cooking Level & Budget */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="glass-card space-y-3 rounded-xl p-6">
          <span className="block font-heading font-bold text-m3-on-surface">
            Cooking Level
          </span>
          <Select
            value={data.cookingLevel}
            onValueChange={(v) => onUpdate("cookingLevel", v)}
          >
            <SelectTrigger className="w-full rounded-lg border-none bg-m3-surface-lowest py-3 pl-4 pr-10 text-m3-on-surface focus:ring-2 focus:ring-m3-primary/20">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="border-m3-outline-variant/20 bg-m3-surface-high text-m3-on-surface">
              {COOKING_LEVELS.map((l) => (
                <SelectItem key={l} value={l} className="capitalize">
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cookingLevel && (
            <p className="text-xs text-destructive">{errors.cookingLevel}</p>
          )}
        </div>
        <div className="glass-card space-y-3 rounded-xl p-6">
          <span className="block font-heading font-bold text-m3-on-surface">
            Food Budget
          </span>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-m3-outline">$</span>
            <input
              type="number"
              value={data.foodBudget}
              onChange={(e) => onUpdate("foodBudget", e.target.value)}
              placeholder="400"
              aria-label="Monthly food budget"
              aria-invalid={!!errors.foodBudget}
              className="w-full rounded-lg border-none bg-m3-surface-lowest py-3 pl-8 pr-16 text-m3-on-surface focus:outline-none focus:ring-2 focus:ring-m3-primary/20"
            />
            <span className="absolute right-4 text-xs font-medium text-m3-outline">
              /MONTH
            </span>
          </div>
          {errors.foodBudget && (
            <p className="text-xs text-destructive">{errors.foodBudget}</p>
          )}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div className="glass-card space-y-4 rounded-xl p-6">
        <span className="block font-heading font-bold text-m3-on-surface">
          Cuisine Preferences
        </span>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((c) => {
            const active = data.cuisinePreferences.includes(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onToggle("cuisinePreferences", c.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  active
                    ? "bg-m3-primary-container text-m3-on-primary-container"
                    : "bg-m3-surface-high text-m3-outline hover:bg-white/10",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Disliked Foods */}
      <div className="glass-card space-y-3 rounded-xl p-6">
        <span className="block font-heading font-bold text-m3-on-surface">
          Disliked Foods
        </span>
        <input
          type="text"
          value={data.dislikedFoods}
          onChange={(e) => onUpdate("dislikedFoods", e.target.value)}
          placeholder="e.g. Cilantro, Peanuts, Shellfish..."
          className="w-full rounded-lg border-none bg-m3-surface-lowest px-4 py-3 text-m3-on-surface focus:outline-none focus:ring-2 focus:ring-m3-primary/20"
        />
        <p className="text-xs italic text-m3-outline">
          Separate multiple items with commas.
        </p>
      </div>
    </div>
  );
}
