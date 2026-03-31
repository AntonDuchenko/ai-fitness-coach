"use client";

import { cn } from "@/lib/utils";
import type { DailyTotals } from "./DailySummary";

type MacroTargets = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const macros = [
  {
    key: "calories",
    label: "Calories",
    unit: "kcal",
    barClass: "bg-m3-primary-container",
  },
  { key: "protein", label: "Protein", unit: "g", barClass: "bg-m3-secondary" },
  {
    key: "carbs",
    label: "Carbs",
    unit: "g",
    barClass: "bg-[var(--m3-tertiary)]",
  },
  { key: "fat", label: "Fat", unit: "g", barClass: "bg-m3-outline" },
] as const;

function labelColor(key: string) {
  switch (key) {
    case "calories":
      return "text-m3-primary-container";
    case "protein":
      return "text-m3-secondary";
    case "carbs":
      return "text-m3-tertiary";
    case "fat":
      return "text-m3-outline";
    default:
      return "text-m3-on-surface";
  }
}

export function MacroTargetsCard({
  className,
  macros: targets,
  dailyTotals,
}: {
  className?: string;
  macros: MacroTargets | null;
  dailyTotals?: DailyTotals;
}) {
  if (!targets) return null;

  const consumed = dailyTotals?.totals;

  return (
    <section
      className={cn(
        "glass-card relative overflow-hidden rounded-[2rem] p-8",
        className,
      )}
      aria-label="Daily Macro Targets"
    >
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-m3-outline">
            Current Goal
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold font-heading">
              Daily Macro Targets
            </h2>
            <span className="whitespace-nowrap rounded-full border border-m3-secondary/20 bg-m3-secondary/10 px-3 py-1 text-[10px] font-bold uppercase leading-none text-m3-secondary">
              Active Phase
            </span>
          </div>
        </div>

        <div className="grid flex-grow grid-cols-2 gap-6 md:grid-cols-4 md:gap-12">
          {macros.map(({ key, label, unit, barClass }) => {
            const target = targets[key as keyof MacroTargets];
            const current = consumed?.[key as keyof MacroTargets] ?? 0;
            const pct = Math.min(
              100,
              Math.round((current / Math.max(1, target)) * 100),
            );
            const display =
              key === "calories"
                ? `${target.toLocaleString()} ${unit}`
                : `${Math.round(target)}${unit}`;

            return (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex items-end justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-m3-outline">
                    {label}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-sm font-bold",
                      labelColor(key),
                    )}
                  >
                    {display}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-m3-surface-lowest">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      barClass,
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
