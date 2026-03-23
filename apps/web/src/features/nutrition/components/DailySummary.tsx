"use client";

import { Badge } from "@/components/ui/badge";

type DailyTotals = {
  totals: { calories: number; protein: number; carbs: number; fat: number };
  targets: null | {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  hit: null | {
    calories: boolean;
    protein: boolean;
    carbs: boolean;
    fat: boolean;
  };
};

export type { DailyTotals };

export function DailySummary({ dailyTotals }: { dailyTotals: DailyTotals }) {
  const totalsText = dailyTotals?.targets
    ? `Daily totals: ${Math.round(dailyTotals.totals.calories)} kcal \u00b7 ${Math.round(
        dailyTotals.totals.protein,
      )}g P \u00b7 ${Math.round(dailyTotals.totals.carbs)}g C \u00b7 ${Math.round(dailyTotals.totals.fat)}g F`
    : "Daily totals";

  return (
    <div className="rounded-xl border border-border/60 bg-card/30 p-3">
      <p className="text-sm text-muted-foreground">{totalsText}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {dailyTotals.hit ? (
          <>
            <Badge
              variant={dailyTotals.hit.calories ? "success" : "outline"}
              className="rounded-full"
            >
              Calories {dailyTotals.hit.calories ? "\u2713" : ""}
            </Badge>
            <Badge
              variant={dailyTotals.hit.protein ? "success" : "outline"}
              className="rounded-full"
            >
              Protein {dailyTotals.hit.protein ? "\u2713" : ""}
            </Badge>
            <Badge
              variant={dailyTotals.hit.carbs ? "success" : "outline"}
              className="rounded-full"
            >
              Carbs {dailyTotals.hit.carbs ? "\u2713" : ""}
            </Badge>
            <Badge
              variant={dailyTotals.hit.fat ? "success" : "outline"}
              className="rounded-full"
            >
              Fat {dailyTotals.hit.fat ? "\u2713" : ""}
            </Badge>
          </>
        ) : null}
      </div>
    </div>
  );
}
