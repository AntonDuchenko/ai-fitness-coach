"use client";

import { CheckCircle } from "lucide-react";

export type DailyTotals = {
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

const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R; // ~251.2

function MacroRing({
  pct,
  strokeClass,
  glowColor,
  label,
  current,
  target,
  unit,
}: {
  pct: number;
  strokeClass: string;
  glowColor: string;
  label: string;
  current: string;
  target: string;
  unit: string;
}) {
  const offset = RING_C - (Math.min(pct, 100) / 100) * RING_C;

  return (
    <div className="flex flex-col items-center rounded-2xl bg-m3-surface-lowest/50 p-4">
      <div className="relative mb-3 flex size-24 items-center justify-center">
        <svg className="size-full -rotate-90" aria-hidden="true">
          <circle
            cx="48"
            cy="48"
            r={RING_R}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={6}
            className="text-m3-surface-high"
          />
          <circle
            cx="48"
            cy="48"
            r={RING_R}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={6}
            strokeDasharray={RING_C}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={strokeClass}
            style={{
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-m3-on-surface">{pct}%</span>
        </div>
      </div>
      <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-m3-outline">
        {label}
      </span>
      <p className="text-sm font-semibold text-m3-on-surface">
        {current}{" "}
        <span className="text-[10px] font-normal text-m3-outline">
          / {target} {unit}
        </span>
      </p>
    </div>
  );
}

export function DailySummary({ dailyTotals }: { dailyTotals: DailyTotals }) {
  if (!dailyTotals.targets) return null;

  const { totals, targets } = dailyTotals;
  const pct = (v: number, t: number) =>
    Math.min(100, Math.round((v / Math.max(1, t)) * 100));

  const allHit = dailyTotals.hit
    ? Object.values(dailyTotals.hit).every(Boolean)
    : false;

  return (
    <div className="mt-8 rounded-[2rem] bg-m3-surface-low p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-bold text-m3-on-surface">
            Daily Macros
          </h3>
          <p className="text-xs tracking-wide text-m3-outline">
            FUELING YOUR PERFORMANCE
          </p>
        </div>
        {allHit && (
          <div className="flex items-center gap-2 text-m3-secondary">
            <CheckCircle className="size-5" aria-hidden />
            <span className="text-sm font-bold">On Track</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MacroRing
          pct={pct(totals.calories, targets.calories)}
          strokeClass="text-m3-primary-container"
          glowColor="rgba(77,142,255,0.4)"
          label="Calories"
          current={totals.calories.toLocaleString()}
          target={targets.calories.toLocaleString()}
          unit="kcal"
        />
        <MacroRing
          pct={pct(totals.protein, targets.protein)}
          strokeClass="text-m3-secondary"
          glowColor="rgba(74,225,118,0.4)"
          label="Protein"
          current={`${Math.round(totals.protein)}g`}
          target={`${Math.round(targets.protein)}g`}
          unit=""
        />
        <MacroRing
          pct={pct(totals.carbs, targets.carbs)}
          strokeClass="text-[var(--m3-tertiary)]"
          glowColor="rgba(245,158,11,0.4)"
          label="Carbs"
          current={`${Math.round(totals.carbs)}g`}
          target={`${Math.round(targets.carbs)}g`}
          unit=""
        />
        <MacroRing
          pct={pct(totals.fat, targets.fat)}
          strokeClass="text-m3-outline"
          glowColor="rgba(140,144,159,0.4)"
          label="Fat"
          current={`${Math.round(totals.fat)}g`}
          target={`${Math.round(targets.fat)}g`}
          unit=""
        />
      </div>
    </div>
  );
}
