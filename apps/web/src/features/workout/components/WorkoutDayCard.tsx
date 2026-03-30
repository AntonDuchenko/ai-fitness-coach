"use client";

import { cn } from "@/lib/utils";
import { Clock, Dumbbell } from "lucide-react";
import type { CalendarDaySlot } from "../types";

interface WorkoutDayCardProps {
  slot: CalendarDaySlot;
  selected: boolean;
  onSelect: () => void;
}

function statusBadgeClasses(
  status: CalendarDaySlot["status"],
  selected: boolean,
) {
  if (selected) return "bg-m3-primary text-m3-on-primary-container";
  switch (status) {
    case "completed":
      return "bg-m3-secondary-container/20 text-m3-secondary";
    case "missed":
      return "bg-m3-error-container/20 text-m3-error";
    default:
      return "bg-m3-surface-highest text-m3-outline";
  }
}

function statusLabel(status: CalendarDaySlot["status"]): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "missed":
      return "Missed";
    case "rest":
      return "Rest";
    default:
      return "Scheduled";
  }
}

export function WorkoutDayCard({
  slot,
  selected,
  onSelect,
}: WorkoutDayCardProps) {
  const title = slot.isRest ? "Rest Day" : (slot.workout?.focus ?? "Training");
  const isCompleted = slot.status === "completed";
  const isMissed = slot.status === "missed";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full cursor-pointer rounded-xl p-4 text-left transition-all duration-200",
        selected
          ? "border-l-4 border-m3-primary bg-m3-primary/10 shadow-xl shadow-m3-primary/5"
          : "bg-m3-surface-low hover:bg-m3-surface-high",
        isCompleted && !selected && "opacity-60",
        isMissed && !selected && "border border-m3-error/20",
      )}
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="min-w-0">
          <p
            className={cn(
              "mb-1 text-xs font-bold uppercase tracking-widest",
              selected ? "text-m3-primary" : "text-m3-outline",
            )}
          >
            {slot.weekdayLong}
          </p>
          <h4
            className={cn(
              "font-heading text-lg font-bold",
              selected
                ? "text-xl font-extrabold text-m3-on-surface"
                : "text-gray-400 group-hover:text-m3-on-surface",
              isCompleted && "text-m3-outline line-through",
            )}
          >
            {title}
          </h4>
        </div>
        <span
          className={cn(
            "shrink-0 rounded px-2 py-1 text-[10px] font-black uppercase",
            statusBadgeClasses(slot.status, selected),
          )}
        >
          {statusLabel(slot.status)}
        </span>
      </div>

      {selected && slot.workout && (
        <div className="flex items-center gap-4 text-xs text-gray-400">
          {slot.workout.duration ? (
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {slot.workout.duration} min
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <Dumbbell className="size-3.5" />
            {slot.workout.exercises.length} Exercises
          </span>
        </div>
      )}
    </button>
  );
}
