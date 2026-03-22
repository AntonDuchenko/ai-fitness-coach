"use client";

import { ApiError, apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { WorkoutPlan } from "../types";

const PLAN_KEY = ["workout", "plan"] as const;

export function useWorkoutPlan() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: PLAN_KEY,
    queryFn: () => apiClient<WorkoutPlan>("/workouts/plan"),
  });

  const regenerate = useMutation({
    mutationFn: () =>
      apiClient<WorkoutPlan>("/workouts/plan/regenerate", { method: "POST" }),
    onSuccess: (data) => {
      queryClient.setQueryData(PLAN_KEY, data);
    },
  });

  return {
    plan: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    regenerate,
  };
}

export function isPlanNotFound(err: unknown): boolean {
  return err instanceof ApiError && err.statusCode === 404;
}
