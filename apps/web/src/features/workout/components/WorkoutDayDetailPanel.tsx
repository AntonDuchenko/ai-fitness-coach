"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import type { CalendarDaySlot } from "../types";
import { ExerciseItem } from "./ExerciseItem";

interface WorkoutDayDetailPanelProps {
  slot: CalendarDaySlot | null;
  /** Active plan id — required to start a logged workout */
  planId?: string;
  /** ISO date key (yyyy-mm-dd) for draft storage */
  dayKey?: string;
  onStartWorkout?: () => void;
  className?: string;
}

function statusVariant(
  status: CalendarDaySlot["status"],
): ComponentProps<typeof Badge>["variant"] {
  switch (status) {
    case "completed":
      return "success";
    case "missed":
      return "destructive";
    case "rest":
      return "secondary";
    default:
      return "default";
  }
}

function statusLabel(status: CalendarDaySlot["status"]): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "missed":
      return "Missed";
    case "rest":
      return "Rest day";
    default:
      return "Scheduled";
  }
}

export function WorkoutDayDetailPanel({
  slot,
  planId,
  dayKey,
  onStartWorkout,
  className,
}: WorkoutDayDetailPanelProps) {
  if (!slot) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground",
          className,
        )}
      >
        <p className="text-sm">Select a day to view workout details.</p>
      </div>
    );
  }

  if (slot.isRest || !slot.workout) {
    return (
      <div className={cn("flex flex-col gap-4 p-6", className)}>
        <div>
          <p className="text-xs text-muted-foreground">{slot.weekdayLong}</p>
          <h2 className="font-heading text-xl font-semibold">Rest day</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use this day for recovery, light walking, or mobility work.
          </p>
        </div>
      </div>
    );
  }

  const w = slot.workout;
  const duration = w.duration ? `· ~${w.duration} min` : "";
  const canStart =
    Boolean(planId && dayKey && onStartWorkout) && w.exercises.length > 0;

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-6">
        <div>
          <p className="text-xs text-muted-foreground">{slot.weekdayLong}</p>
          <h2 className="font-heading text-2xl font-semibold">{w.focus}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge
              variant={statusVariant(slot.status)}
              className="font-semibold"
            >
              {statusLabel(slot.status)}
            </Badge>
            {duration ? (
              <span className="text-[12px] text-muted-foreground">
                {duration}
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          {w.exercises.map((ex, i) => (
            <ExerciseItem key={`${ex.name}-${i}`} exercise={ex} />
          ))}
        </div>
      </div>

      <div className="border-t border-border p-4">
        <Button
          type="button"
          className="w-full"
          size="lg"
          disabled={!canStart}
          onClick={() => onStartWorkout?.()}
        >
          Start workout
        </Button>
      </div>
    </div>
  );
}
