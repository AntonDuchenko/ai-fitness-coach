"use client";

import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { WorkoutStatsResponse } from "../workoutLog.types";

export const WORKOUT_STATS_KEY = ["workout", "stats"] as const;

export function useWorkoutStatsQuery() {
  return useQuery({
    queryKey: WORKOUT_STATS_KEY,
    queryFn: () => apiClient<WorkoutStatsResponse>("/workouts/stats"),
  });
}
