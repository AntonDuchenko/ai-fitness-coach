"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateWorkoutLogPayload,
  WorkoutLogResponse,
} from "../workoutLog.types";
import { WORKOUT_TODAY_KEY } from "./useTodaysWorkoutQuery";
import { WORKOUT_LOGS_LIST_KEY } from "./useWorkoutLogsQuery";
import { WORKOUT_STATS_KEY } from "./useWorkoutStatsQuery";

export function useLogWorkoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkoutLogPayload) =>
      apiClient<WorkoutLogResponse>("/workouts/log", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WORKOUT_LOGS_LIST_KEY });
      void queryClient.invalidateQueries({ queryKey: ["progress"] });
      void queryClient.invalidateQueries({ queryKey: WORKOUT_STATS_KEY });
      void queryClient.invalidateQueries({ queryKey: WORKOUT_TODAY_KEY });
    },
  });
}
