import type {
  LoggedExercise,
  WorkoutLogResponse,
} from "@/features/workout/workoutLog.types";
import type { ProgressPeriod } from "../constants";
import { getPeriodStartDate } from "../constants";

const RULES: { keywords: string[]; group: string }[] = [
  {
    keywords: ["bench", "chest", "fly", "push-up", "pushup", "dip"],
    group: "Chest",
  },
  {
    keywords: ["row", "pull", "lat", "deadlift", "back"],
    group: "Back",
  },
  {
    keywords: [
      "squat",
      "leg",
      "calf",
      "lunge",
      "hamstring",
      "quad",
      "glute",
      "romanian",
    ],
    group: "Legs",
  },
  {
    keywords: ["shoulder", "ohp", "overhead", "lateral", "rear delt"],
    group: "Shoulders",
  },
  {
    keywords: ["curl", "tricep", "triceps", "bicep", "biceps", "arm"],
    group: "Arms",
  },
  { keywords: ["core", "ab", "plank", "crunch"], group: "Core" },
];

export function guessMuscleGroup(exerciseName: string): string {
  const lower = exerciseName.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) return rule.group;
  }
  return "Other";
}

function isLoggedExercise(raw: unknown): raw is LoggedExercise {
  if (!raw || typeof raw !== "object") return false;
  const o = raw as Record<string, unknown>;
  return typeof o.exerciseName === "string" && Array.isArray(o.sets);
}

export function parseLoggedExercises(raw: unknown): LoggedExercise[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isLoggedExercise);
}

function vol(ex: LoggedExercise): number {
  return ex.sets.reduce((sum, s) => sum + s.weight * s.reps, 0);
}

export interface MuscleVolumeRow {
  muscle: string;
  volume: number;
  imbalanced?: boolean;
}

const ALL_GROUPS = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

export function aggregateMuscleVolumes(
  logs: WorkoutLogResponse[],
  period: ProgressPeriod,
): MuscleVolumeRow[] {
  const start = getPeriodStartDate(period);
  const totals = new Map<string, number>();

  for (const group of ALL_GROUPS) {
    totals.set(group, 0);
  }

  for (const log of logs) {
    const completed = new Date(log.completedAt);
    if (start && completed < start) continue;

    for (const ex of parseLoggedExercises(log.exercises)) {
      const group = guessMuscleGroup(ex.exerciseName);
      totals.set(group, (totals.get(group) ?? 0) + vol(ex));
    }
  }

  return [...totals.entries()]
    .map(([muscle, volume]) => ({ muscle, volume }))
    .sort((a, b) => b.volume - a.volume);
}

/** Detects imbalances, marks affected rows, and returns insight message. */
export function detectImbalances(rows: MuscleVolumeRow[]): string | null {
  const withVolume = rows.filter((r) => r.volume > 0);
  if (withVolume.length === 0) return null;

  const avgVolume = withVolume.reduce((s, r) => s + r.volume, 0) / withVolume.length;
  if (avgVolume <= 0) return null;

  const messages: string[] = [];
  for (const row of rows) {
    if (row.volume === 0) {
      row.imbalanced = true;
      messages.push(`${row.muscle} has no logged volume — consider adding ${row.muscle.toLowerCase()} exercises`);
    } else {
      const ratio = row.volume / avgVolume;
      if (ratio < 0.5) {
        row.imbalanced = true;
        const pct = Math.round((1 - ratio) * 100);
        messages.push(`${row.muscle} volume ${pct}% lower than average`);
      }
    }
  }

  return messages.length > 0 ? messages.join(". ") : null;
}
