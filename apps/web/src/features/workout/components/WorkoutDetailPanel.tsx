"use client";

import { cn } from "@/lib/utils";
import { Clock, Flame, Play } from "lucide-react";
import type { CalendarDaySlot } from "../types";
import { ExerciseCard } from "./ExerciseCard";

interface WorkoutDetailPanelProps {
  slot: CalendarDaySlot | null;
  onStartWorkout?: () => void;
  canStart: boolean;
  className?: string;
}

export function WorkoutDetailPanel({
  slot,
  onStartWorkout,
  canStart,
  className,
}: WorkoutDetailPanelProps) {
  if (!slot) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-8 text-center text-m3-outline",
          className,
        )}
      >
        <p className="text-sm">Select a day to view workout details.</p>
      </div>
    );
  }

  if (slot.isRest || !slot.workout) {
    return (
      <div className={cn("flex flex-col gap-4 p-6 lg:p-8", className)}>
        <div>
          <p className="text-xs text-m3-outline">{slot.weekdayLong}</p>
          <h3 className="font-heading text-2xl font-bold text-m3-on-surface lg:text-4xl lg:font-black">
            Rest Day
          </h3>
          <p className="mt-2 text-sm text-m3-outline">
            Use this day for recovery, light walking, or mobility work.
          </p>
        </div>
      </div>
    );
  }

  const w = slot.workout;

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {/* Day header */}
      <div className="px-6 pt-6 lg:px-8 lg:pt-8">
        {/* Desktop: large title */}
        <div className="hidden lg:block">
          <h3 className="mb-2 font-heading text-4xl font-black tracking-tight text-m3-on-surface">
            {slot.weekdayLong} — {w.focus}
          </h3>
          <div className="flex items-center gap-4 font-medium text-gray-400">
            {w.duration ? (
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-m3-primary" />~{w.duration} min
                duration
              </span>
            ) : null}
            {w.duration ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-m3-outline-variant" />
                <span className="flex items-center gap-2">
                  <Flame className="size-4 text-m3-primary" />~
                  {Math.round(w.duration * 7.5)} kcal
                </span>
              </>
            ) : null}
          </div>
        </div>

        {/* Mobile: compact header */}
        <div className="lg:hidden">
          <h3 className="font-heading text-2xl font-bold text-m3-on-surface">
            {slot.weekdayLong} — {w.focus}
          </h3>
          {w.duration ? (
            <div className="mt-1 flex items-center gap-2 text-m3-outline">
              <Clock className="size-3.5" />
              <span className="text-sm font-medium">
                ~{w.duration} min duration
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Section label */}
      <div className="hidden px-8 pt-10 lg:block">
        <h4 className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-m3-outline">
          Today&apos;s Routine
          <span className="h-px flex-1 bg-m3-outline-variant/20" />
        </h4>
      </div>

      {/* Exercise list */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-6 lg:px-8">
        {w.exercises.map((ex, i) => (
          <ExerciseCard key={`${ex.name}-${i}`} exercise={ex} />
        ))}
      </div>

      {/* Start workout button */}
      <div className="hidden border-t border-m3-outline-variant/10 p-4 lg:block lg:mt-6 lg:border-0 lg:px-8 lg:pb-8 lg:pt-0">
        <button
          type="button"
          disabled={!canStart}
          onClick={onStartWorkout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-m3-primary-container py-5 font-heading text-xl font-black text-m3-on-primary-container shadow-[0_20px_40px_rgba(77,142,255,0.2)] transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
          START WORKOUT
          <Play className="size-6 fill-current" />
        </button>
      </div>
    </div>
  );
}
