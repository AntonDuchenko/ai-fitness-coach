import type { WorkoutLogResponse } from "../workoutLog.types";

/** Most recent log whose completedAt falls on the local calendar day of `ref`. */
export function findWorkoutLogForDate(
  logs: WorkoutLogResponse[],
  ref: Date,
): WorkoutLogResponse | undefined {
  const start = new Date(ref);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const inDay = (iso: string) => {
    const t = new Date(iso).getTime();
    return t >= start.getTime() && t < end.getTime();
  };

  return logs
    .filter((l) => inDay(l.completedAt))
    .sort(
      (a, b) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
    )[0];
}
