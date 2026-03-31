"use client";

import { cn } from "@/lib/utils";

type Macros = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

function DiffLabel({
  label,
  diff,
  unit,
}: { label: string; diff: number; unit: string }) {
  const rounded = Math.round(diff);
  if (rounded === 0) return null;

  const isPositive = rounded > 0;
  return (
    <span
      className={cn(
        "text-[11px] font-medium",
        isPositive ? "text-m3-secondary" : "text-m3-error",
      )}
    >
      {isPositive ? "+" : ""}
      {rounded}
      {unit} {label}
    </span>
  );
}

export function MacroComparison({
  current,
  alternative,
}: {
  current: Macros;
  alternative: Macros;
}) {
  const diffs = [
    { label: "kcal", diff: alternative.calories - current.calories, unit: "" },
    { label: "P", diff: alternative.protein - current.protein, unit: "g" },
    { label: "C", diff: alternative.carbs - current.carbs, unit: "g" },
    { label: "F", diff: alternative.fat - current.fat, unit: "g" },
  ];

  const hasDiffs = diffs.some((d) => Math.round(d.diff) !== 0);
  if (!hasDiffs) {
    return <p className="text-[11px] text-m3-outline">Identical macros</p>;
  }

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {diffs.map((d) => (
        <DiffLabel key={d.label} label={d.label} diff={d.diff} unit={d.unit} />
      ))}
    </div>
  );
}
