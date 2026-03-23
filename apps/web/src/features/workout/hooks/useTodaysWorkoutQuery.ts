"use client";

import { ApiError, apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { WorkoutDaySchedule } from "../types";

export const WORKOUT_TODAY_KEY = ["workout", "today"] as const;

async function fetchTodaysWorkout(): Promise<WorkoutDaySchedule | null> {
  try {
    return await apiClient<WorkoutDaySchedule>("/workouts/today");
  } catch (e) {
    if (e instanceof ApiError && e.statusCode === 404) {
      return null;
    }
    throw e;
  }
}

export function useTodaysWorkoutQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: WORKOUT_TODAY_KEY,
    queryFn: fetchTodaysWorkout,
    enabled: options?.enabled ?? true,
  });
}
