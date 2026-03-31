"use client";

import { cn } from "@/lib/utils";
import type { NutritionTab } from "../types";

const tabs: { value: NutritionTab; label: string }[] = [
  { value: "mealPlan", label: "Meal Plan" },
  { value: "groceryList", label: "Grocery List" },
  { value: "recipes", label: "Recipes" },
];

export function NutritionTabs({
  value,
  onChange,
  selectedDay,
  onSelectDay,
  dayButtons,
}: {
  value: NutritionTab;
  onChange: (next: NutritionTab) => void;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  dayButtons: number[];
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 border-b border-m3-outline-variant/10 md:flex-row">
      <div role="tablist" className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={value === tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "cursor-pointer pb-4 text-sm font-medium tracking-wide transition-colors",
              value === tab.value
                ? "border-b-2 border-m3-primary-container font-bold text-m3-primary-container"
                : "text-m3-outline hover:text-m3-on-surface",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {value === "mealPlan" && dayButtons.length > 1 && (
        <div className="mb-4 flex gap-2 rounded-xl bg-m3-surface-low p-1 md:mb-0">
          {dayButtons.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onSelectDay(d)}
              className={cn(
                "flex size-10 cursor-pointer items-center justify-center rounded-lg font-bold transition-all",
                selectedDay === d
                  ? "bg-m3-primary-container text-m3-on-primary-container shadow-lg"
                  : "text-m3-outline hover:bg-m3-surface-high",
              )}
            >
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
