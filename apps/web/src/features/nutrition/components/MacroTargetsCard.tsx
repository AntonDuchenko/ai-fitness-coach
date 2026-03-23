"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MacroTargets = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

function MacroBarSplit({ macros }: { macros: MacroTargets }) {
  const max = Math.max(
    macros.calories,
    macros.protein,
    macros.carbs,
    macros.fat,
    1,
  );
  const h = (v: number) => Math.round((v / max) * 100);

  return (
    <div className="flex h-20 items-end gap-3">
      <div className="flex items-end gap-2">
        <div
          className="w-5 rounded-md bg-primary"
          style={{ height: `${h(macros.calories)}%` }}
          aria-hidden
        />
        <div
          className="w-5 rounded-md bg-success"
          style={{ height: `${h(macros.protein)}%` }}
          aria-hidden
        />
      </div>
      <div className="flex items-end gap-2">
        <div
          className="w-5 rounded-md bg-secondary"
          style={{ height: `${h(macros.carbs)}%` }}
          aria-hidden
        />
        <div
          className="w-5 rounded-md bg-destructive"
          style={{ height: `${h(macros.fat)}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

export function MacroTargetsCard({
  className,
  macros,
  dailyLabel = "Macro targets",
}: {
  className?: string;
  macros: MacroTargets | null;
  dailyLabel?: string;
}) {
  if (!macros) return null;

  return (
    <section
      className={cn(
        "rounded-2xl border border-border/60 bg-card/60 p-4 lg:p-6",
        className,
      )}
      aria-label={dailyLabel}
    >
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
        <div className="col-span-2 flex items-end justify-between gap-6 lg:col-span-4">
          <div className="flex flex-1 items-start gap-8">
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded bg-primary"
                  aria-hidden
                />
                <span className="text-xs font-semibold text-muted-foreground">
                  Calories
                </span>
              </div>
              <span className="font-heading text-xl font-semibold">
                {macros.calories.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded bg-success"
                  aria-hidden
                />
                <span className="text-xs font-semibold text-muted-foreground">
                  Protein
                </span>
              </div>
              <span className="font-heading text-xl font-semibold">
                {Math.round(macros.protein)}g
              </span>
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-between gap-4 lg:flex">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2 w-2 rounded bg-secondary"
                aria-hidden
              />
              <span className="text-xs font-semibold text-muted-foreground">
                Carbs
              </span>
            </div>
            <span className="font-heading text-xl font-semibold">
              {Math.round(macros.carbs)}g
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-2 w-2 rounded bg-destructive"
                aria-hidden
              />
              <span className="text-xs font-semibold text-muted-foreground">
                Fat
              </span>
            </div>
            <span className="font-heading text-xl font-semibold">
              {Math.round(macros.fat)}g
            </span>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <div className="mt-2">
            <MacroBarSplit macros={macros} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 lg:hidden">
        <Badge variant="default" className="rounded-full">
          {macros.calories.toLocaleString()} kcal
        </Badge>
        <Badge variant="success" className="rounded-full">
          {Math.round(macros.protein)}g protein
        </Badge>
        <Badge variant="outline" className="rounded-full">
          {Math.round(macros.carbs)}g carbs
        </Badge>
        <Badge variant="destructive" className="rounded-full">
          {Math.round(macros.fat)}g fat
        </Badge>
      </div>
    </section>
  );
}
