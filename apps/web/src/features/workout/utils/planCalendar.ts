import type { CalendarDaySlot, DayStatus, WorkoutDaySchedule } from "../types";
import type { WorkoutLogResponse } from "../workoutLog.types";
import { findWorkoutLogForDate } from "./todayLog";

const WEEKDAYS_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** Monday 00:00 of the ISO week containing `d` (week starts Monday). */
function getMonday(d: Date): Date {
  const x = startOfDay(d);
  const day = x.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  return x;
}

function weekdayLong(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

function formatDayLabel(d: Date): string {
  const w = d.toLocaleDateString("en-US", { weekday: "short" });
  const m = d.toLocaleDateString("en-US", { month: "short" });
  const day = d.getDate();
  return `${w} · ${m} ${day}`;
}

function normalizeWeekday(name: string): string {
  const n = name.trim().toLowerCase();
  const found = WEEKDAYS_ORDER.find((w) => w.toLowerCase() === n);
  return found ?? name;
}

function findWorkoutForDay(
  schedule: WorkoutDaySchedule[],
  weekday: string,
): WorkoutDaySchedule | null {
  const w = normalizeWeekday(weekday);
  const hit = schedule.find(
    (s) => normalizeWeekday(s.dayOfWeek).toLowerCase() === w.toLowerCase(),
  );
  return hit ?? null;
}

function deriveStatus(
  dayDate: Date,
  today: Date,
  isRest: boolean,
  hasLog: boolean,
): DayStatus {
  if (isRest) return "rest";
  if (hasLog) return "completed";
  const day = startOfDay(dayDate).getTime();
  const t = startOfDay(today).getTime();
  if (day > t) return "scheduled";
  if (day < t) return "missed";
  return "scheduled";
}

/**
 * Builds Mon–Sun row for program week index `selectedWeek` (1-based).
 * Repeats the same weekly template each program week.
 */
export function buildWeekSlots(
  schedule: WorkoutDaySchedule[],
  planStart: Date,
  selectedWeek: number,
  today: Date = new Date(),
  logs: WorkoutLogResponse[] = [],
): CalendarDaySlot[] {
  const start = startOfDay(planStart);
  const week1Monday = getMonday(start);
  const weekStartMonday = addDays(week1Monday, (selectedWeek - 1) * 7);

  return WEEKDAYS_ORDER.map((_dayName, i) => {
    const date = addDays(weekStartMonday, i);
    const wl = weekdayLong(date);
    const workout = findWorkoutForDay(schedule, wl);
    const isRest =
      !workout ||
      workout.exercises.length === 0 ||
      /rest|recovery|off/i.test(workout.focus);
    const hasLog = !!findWorkoutLogForDate(logs, date);
    const status = deriveStatus(date, today, isRest, hasLog);

    return {
      date,
      labelShort: formatDayLabel(date),
      weekdayLong: wl,
      workout: isRest ? null : workout,
      isRest,
      status,
    };
  });
}

export function getCurrentWeekIndex(
  planStart: Date,
  durationWeeks: number,
  today: Date = new Date(),
): number {
  const start = startOfDay(planStart);
  const week1Monday = getMonday(start);
  const t = startOfDay(today);
  const diffMs = t.getTime() - week1Monday.getTime();
  const weekFromStart = Math.floor(diffMs / (7 * 86400000)) + 1;
  return Math.min(durationWeeks, Math.max(1, weekFromStart));
}

export function weekProgressFraction(
  currentWeek: number,
  durationWeeks: number,
): number {
  if (durationWeeks <= 0) return 0;
  return Math.min(100, Math.max(0, (currentWeek / durationWeeks) * 100));
}
