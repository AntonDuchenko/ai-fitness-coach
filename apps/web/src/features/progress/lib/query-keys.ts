import type { ProgressPeriod } from "../constants";

export const PROGRESS_SUMMARY_KEY = ["progress", "summary"] as const;

export function weightHistoryKey(period: ProgressPeriod) {
  return ["progress", "weight", period] as const;
}

export function strengthProgressKey(exercise: string, period: ProgressPeriod) {
  return ["progress", "strength", exercise, period] as const;
}

export function volumeProgressKey(period: ProgressPeriod) {
  return ["progress", "volume", period] as const;
}

export function consistencyKey(period: ProgressPeriod) {
  return ["progress", "consistency", period] as const;
}
