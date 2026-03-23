"use client";

import { Button } from "@/components/ui/button";
import type { NutritionMeal } from "../types";
import { DailySummary, type DailyTotals } from "./DailySummary";
import { MealCard } from "./MealCard";

export function DayMealsPanel({
  dayButtons,
  selectedDay,
  onSelectDay,
  meals,
  selectedMealIndex,
  onSelectMealIndex,
  onViewRecipe,
  onSwapMeal,
  dailyTotals,
}: {
  dayButtons: number[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  meals: NutritionMeal[];
  selectedMealIndex: number;
  onSelectMealIndex: (idx: number) => void;
  onViewRecipe: (meal: NutritionMeal) => void;
  onSwapMeal: (idx: number) => void;
  dailyTotals: DailyTotals;
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-heading text-base font-semibold">
            Day Meals &amp; Targets
          </h2>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Previous day"
          onClick={() => onSelectDay(Math.max(1, selectedDay - 1))}
        >
          &larr;
        </Button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="xs"
          >
            {selectedDay === 1 ? "Today" : `Day ${selectedDay}`}
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Next day"
          onClick={() => onSelectDay(Math.min(7, selectedDay + 1))}
        >
          &rarr;
        </Button>
      </div>

      <div className="mt-4">
        <DailySummary dailyTotals={dailyTotals} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {meals.map((meal, idx) => (
          <div
            key={`${meal.name}-${idx}`}
            className={
              idx === selectedMealIndex
                ? "ring-2 ring-primary/60 rounded-2xl"
                : ""
            }
          >
            <MealCard
              meal={meal}
              onViewRecipe={() => onViewRecipe(meal)}
              onSwapMeal={() => onSwapMeal(idx)}
            />
            <div className="sr-only">
              {idx === selectedMealIndex ? "Selected meal" : ""}
            </div>
            <button
              type="button"
              className="sr-only"
              aria-label={`Select meal ${meal.name}`}
              onClick={() => onSelectMealIndex(idx)}
            />
          </div>
        ))}
      </div>

      {/* Day buttons for larger screens (optional). */}
      <div className="mt-4 hidden flex-wrap gap-2 lg:flex">
        {dayButtons.map((d) => (
          <Button
            key={d}
            type="button"
            variant={selectedDay === d ? "secondary" : "ghost"}
            size="xs"
            onClick={() => onSelectDay(d)}
          >
            Day {d}
          </Button>
        ))}
      </div>
    </section>
  );
}
