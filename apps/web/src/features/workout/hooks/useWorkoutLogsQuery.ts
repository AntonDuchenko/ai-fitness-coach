"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { WorkoutLogResponse } from "../workoutLog.types";

export const WORKOUT_LOGS_LIST_KEY = ["workouts", "logs"] as const;

/** @deprecated Use WORKOUT_LOGS_LIST_KEY */
export const WORKOUT_LOGS_KEY = WORKOUT_LOGS_LIST_KEY;

export function useWorkoutLogsQuery(
  limit = 200,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [...WORKOUT_LOGS_LIST_KEY, limit] as const,
    queryFn: () =>
      apiClient<WorkoutLogResponse[]>(`/workouts/logs?limit=${limit}&offset=0`),
    enabled: options?.enabled ?? true,
  });
}
