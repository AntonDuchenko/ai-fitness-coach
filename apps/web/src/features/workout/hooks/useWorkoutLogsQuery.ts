"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { WorkoutLogResponse } from "../workoutLog.types";

export const WORKOUT_LOGS_KEY = ["workout", "logs"] as const;

export function useWorkoutLogsQuery(limit = 40) {
  return useQuery({
    queryKey: [...WORKOUT_LOGS_KEY, limit] as const,
    queryFn: () =>
      apiClient<WorkoutLogResponse[]>(
        `/workouts/logs?limit=${limit}&offset=0`,
      ),
  });
}
