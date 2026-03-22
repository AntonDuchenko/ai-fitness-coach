"use client";

import { Progress } from "@/components/ui/progress";
import type { CalendarDaySlot } from "../types";
import { DayCard } from "./DayCard";
import { WeekSelector } from "./WeekSelector";

interface WorkoutWeekContentProps {
  durationWeeks: number;
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
  currentWeek: number;
  progressPct: number;
  slots: CalendarDaySlot[];
  selectedDayKey: string | null;
  onSelectDay: (slot: CalendarDaySlot) => void;
  dayKey: (d: Date) => string;
}

export function WorkoutWeekContent({
  durationWeeks,
  selectedWeek,
  onSelectWeek,
  currentWeek,
  progressPct,
  slots,
  selectedDayKey,
  onSelectDay,
  dayKey,
}: WorkoutWeekContentProps) {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <WeekSelector
          durationWeeks={durationWeeks}
          selectedWeek={selectedWeek}
          onSelect={onSelectWeek}
        />

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-sm font-medium">Program progress</span>
            <span className="text-[12px] text-muted-foreground">
              Week {currentWeek} of {durationWeeks}
            </span>
          </div>
          <Progress value={progressPct} className="h-2" />
        </div>

        <h2 className="font-heading text-lg font-semibold">This week</h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {slots.map((slot) => (
            <DayCard
              key={dayKey(slot.date)}
              slot={slot}
              selected={dayKey(slot.date) === selectedDayKey}
              onSelect={() => onSelectDay(slot)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
