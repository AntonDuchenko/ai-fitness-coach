import type { LoggedExercise, WorkoutLogResponse } from "../workoutLog.types";

export function workoutDraftStorageKey(planId: string, dayKey: string): string {
  return `workout-draft:${planId}:${dayKey}`;
}

export function parseTargetReps(reps: string): number {
  const t = reps.trim();
  const range = t.match(/^(\d+)\s*-\s*(\d+)$/);
  if (range) return Math.max(parseInt(range[1], 10), parseInt(range[2], 10));
  const n = parseInt(t, 10);
  return Number.isFinite(n) && n > 0 ? n : 8;
}

/** Fallback rest between sets in seconds */
export function parseRestSeconds(rest?: string): number {
  if (!rest) return 90;
  const sec = rest.match(/(\d+)\s*s/i);
  if (sec) return parseInt(sec[1], 10);
  const min = rest.match(/(\d+)\s*-\s*(\d+)\s*min/i);
  if (min) {
    const mid = (parseInt(min[1], 10) + parseInt(min[2], 10)) / 2;
    return Math.round(mid * 60);
  }
  const singleMin = rest.match(/(\d+)\s*min/i);
  if (singleMin) return parseInt(singleMin[1], 10) * 60;
  return 90;
}

export function parseWeightInput(value: string): number | null {
  const n = parseFloat(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function parseRepsInput(value: string): number | null {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function findPreviousExerciseSets(
  logs: WorkoutLogResponse[],
  exerciseName: string,
): { weight: number; reps: number; rpe?: number }[] | null {
  const normalized = exerciseName.trim().toLowerCase();
  for (const log of logs) {
    const raw = log.exercises;
    if (!Array.isArray(raw)) continue;
    const match = (raw as { exerciseName?: string; sets?: unknown }[]).find(
      (e) => (e.exerciseName ?? "").trim().toLowerCase() === normalized,
    );
    if (match && Array.isArray(match.sets) && match.sets.length > 0) {
      return (match.sets as { weight: number; reps: number; rpe?: number }[])
        .slice()
        .sort((a, b) => {
          const sn = (x: { setNumber?: number }) => x.setNumber ?? 0;
          return sn(a as { setNumber?: number }) - sn(b as { setNumber?: number });
        });
    }
  }
  return null;
}

export function formatLastTimeLine(
  sets: { weight: number; reps: number }[],
): string {
  if (sets.length === 0) return "";
  return `Last time: ${sets.map((s) => `${s.weight}kg × ${s.reps}`).join(", ")}`;
}

export function totalVolumeKg(exercises: LoggedExercise[]): number {
  let sum = 0;
  for (const ex of exercises) {
    for (const s of ex.sets) {
      sum += s.weight * s.reps;
    }
  }
  return sum;
}

export function formatVolumeTonnes(volumeKg: number): string {
  const t = volumeKg / 1000;
  return `${t >= 10 ? t.toFixed(1) : t.toFixed(2)}t`;
}

export function computeXpGained(
  exerciseCount: number,
  volumeKg: number,
): number {
  return Math.round(36 + exerciseCount * 9 + volumeKg / 400);
}

export function levelFromTotalWorkouts(total: number): number {
  return Math.max(1, Math.floor(total / 6) + 1);
}
