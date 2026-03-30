"use client";

import { cn } from "@/lib/utils";
import { Check, Lock, Minus, Plus, Square } from "lucide-react";
import type { SessionSet } from "../workoutLog.types";

interface SetLoggerProps {
  sets: SessionSet[];
  onChange: (setIndex: number, patch: Partial<SessionSet>) => void;
  onMarkDone: (setIndex: number, done: boolean) => void;
  className?: string;
}

function findActiveIndex(sets: SessionSet[]): number {
  const firstUndone = sets.findIndex((s) => !s.done);
  return firstUndone === -1 ? sets.length : firstUndone;
}

export function SetLogger({ sets, onChange, onMarkDone, className }: SetLoggerProps) {
  const activeIdx = findActiveIndex(sets);

  return (
    <div className={cn("glass-panel overflow-hidden rounded-3xl shadow-2xl", className)}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-m3-surface-low/50 text-[10px] font-black uppercase tracking-widest text-m3-outline">
            <th className="w-16 px-6 py-4 text-center">Set</th>
            <th className="px-2 py-4">Target</th>
            <th className="px-2 py-4">Weight (kg)</th>
            <th className="px-2 py-4">Reps</th>
            <th className="hidden px-2 py-4 sm:table-cell">RPE</th>
            <th className="w-20 px-6 py-4 text-right">Done</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-m3-outline-variant/10">
          {sets.map((row, i) => {
            const isCompleted = row.done;
            const isActive = i === activeIdx;
            const isFuture = i > activeIdx;

            return (
              <tr
                key={row.setNumber}
                className={cn(
                  "transition-colors",
                  isCompleted && "bg-m3-secondary-container/5",
                  isActive && "border-l-4 border-m3-primary bg-m3-primary/5",
                  isFuture && "opacity-40 grayscale-[0.5]",
                )}
              >
                {/* Set number */}
                <td
                  className={cn(
                    "px-6 py-6 text-center font-heading font-bold",
                    isCompleted && "text-m3-secondary",
                    isActive && "text-m3-primary",
                    isFuture && "text-m3-outline",
                  )}
                >
                  {row.setNumber}
                </td>

                {/* Target reps */}
                <td className="px-2 py-6 text-sm font-medium">{row.targetReps}</td>

                {/* Weight */}
                <td className="px-2 py-6">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-lg bg-m3-surface-highest text-m3-outline transition-colors hover:bg-m3-surface-bright"
                      onClick={() => {
                        const w = parseFloat(row.weight) || 0;
                        onChange(i, { weight: String(Math.max(0, w - 2.5)) });
                      }}
                      aria-label="Decrease weight"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    {isFuture ? (
                      <div className="flex h-8 w-16 items-center justify-center rounded-lg bg-m3-surface-lowest font-bold text-m3-outline">
                        {row.weight || "0"}
                      </div>
                    ) : (
                      <input
                        type="number"
                        inputMode="decimal"
                        className="h-8 w-16 rounded-lg border-none bg-m3-surface-lowest p-0 text-center font-bold text-m3-on-surface focus:ring-1 focus:ring-m3-primary"
                        value={row.weight}
                        onChange={(e) => onChange(i, { weight: e.target.value })}
                        aria-label={`Weight set ${row.setNumber}`}
                      />
                    )}
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-lg bg-m3-surface-highest text-m3-outline transition-colors hover:bg-m3-surface-bright"
                      onClick={() => {
                        const w = parseFloat(row.weight) || 0;
                        onChange(i, { weight: String(w + 2.5) });
                      }}
                      aria-label="Increase weight"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </td>

                {/* Reps */}
                <td className="px-2 py-6">
                  {isFuture ? (
                    <div className="flex h-8 w-12 items-center justify-center rounded-lg bg-m3-surface-lowest font-bold text-m3-outline">
                      {row.reps || "0"}
                    </div>
                  ) : (
                    <input
                      type="number"
                      inputMode="numeric"
                      className="h-8 w-12 rounded-lg border-none bg-m3-surface-lowest p-0 text-center font-bold text-m3-on-surface focus:ring-1 focus:ring-m3-primary"
                      value={row.reps}
                      onChange={(e) => onChange(i, { reps: e.target.value })}
                      aria-label={`Reps set ${row.setNumber}`}
                    />
                  )}
                </td>

                {/* RPE */}
                <td className="hidden px-2 py-6 sm:table-cell">
                  {isFuture ? (
                    <span className="text-xs font-bold text-m3-outline">-</span>
                  ) : (
                    <select
                      className="cursor-pointer border-none bg-transparent text-xs font-bold text-m3-outline focus:ring-0"
                      value={row.rpe || ""}
                      onChange={(e) => onChange(i, { rpe: e.target.value })}
                      aria-label={`RPE set ${row.setNumber}`}
                    >
                      <option value="">-</option>
                      {Array.from({ length: 10 }, (_, n) => n + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                {/* Done button */}
                <td className="px-6 py-6 text-right">
                  {isCompleted ? (
                    <button
                      type="button"
                      onClick={() => onMarkDone(i, false)}
                      className="kinetic-shadow flex size-10 items-center justify-center rounded-xl bg-m3-secondary text-m3-on-secondary shadow-lg"
                      aria-label={`Unmark set ${row.setNumber}`}
                    >
                      <Check className="size-5 font-bold" />
                    </button>
                  ) : isFuture ? (
                    <div className="flex size-10 items-center justify-center rounded-xl bg-m3-surface-highest text-m3-outline/30">
                      <Lock className="size-4" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onMarkDone(i, true)}
                      className="flex size-10 items-center justify-center rounded-xl border border-m3-outline-variant/30 bg-m3-surface-highest text-m3-outline transition-all hover:border-m3-primary/50"
                      aria-label={`Mark set ${row.setNumber} done`}
                    >
                      <Square className="size-4" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
