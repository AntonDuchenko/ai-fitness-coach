"use client";

import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { dayKey } from "../hooks/useWorkoutPlanView";
import type { CalendarDaySlot } from "../types";

interface WorkoutMobileDayPillsProps {
  planName: string;
  currentWeek: number;
  durationWeeks: number;
  slots: CalendarDaySlot[];
  selectedDayKey: string | null;
  onSelectDay: (slot: CalendarDaySlot) => void;
}

function statusLabel(slot: CalendarDaySlot): string {
  if (slot.status === "rest" || slot.isRest) return "Rest";
  switch (slot.status) {
    case "completed":
      return "";
    case "missed":
      return "Missed";
    default:
      return "Scheduled";
  }
}

export function WorkoutMobileDayPills({
  planName,
  currentWeek,
  durationWeeks,
  slots,
  selectedDayKey,
  onSelectDay,
}: WorkoutMobileDayPillsProps) {
  return (
    <div className="relative">
      {/* Glow decoration */}
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-m3-primary-container/10 blur-[100px]" />

      {/* Hero */}
      <section className="mb-8 px-6">
        <span className="text-sm font-medium uppercase tracking-wider text-m3-primary">
          Week {currentWeek} of {durationWeeks}
        </span>
        <h2 className="font-heading text-3xl font-extrabold leading-tight text-m3-on-surface">
          {planName}
        </h2>
      </section>

      {/* Day pills */}
      <section className="mb-8">
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-6">
          {slots.map((slot) => {
            const key = dayKey(slot.date);
            const active = key === selectedDayKey;
            const isCompleted = slot.status === "completed";
            const dayNum = String(slot.date.getDate()).padStart(2, "0");
            const label = statusLabel(slot);

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectDay(slot)}
                className={cn(
                  "flex min-w-[72px] shrink-0 flex-col items-center gap-2 rounded-2xl border p-4",
                  active
                    ? "border-m3-primary/20 bg-m3-primary-container/20"
                    : "border-m3-outline-variant/10 bg-m3-surface-low",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    active ? "text-m3-primary" : "text-m3-outline",
                  )}
                >
                  {slot.labelShort}
                </span>
                <span className="text-xl font-bold text-m3-on-surface">
                  {dayNum}
                </span>
                {isCompleted ? (
                  <CheckCircle className="size-3.5 fill-m3-secondary text-m3-secondary" />
                ) : label ? (
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase",
                      active
                        ? "font-bold text-m3-primary-container"
                        : "text-m3-outline",
                    )}
                  >
                    {label}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
