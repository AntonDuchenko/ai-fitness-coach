"use client";

import { useAuth } from "@/features/auth";
import { useProgressSummaryQuery } from "@/features/progress/hooks/useProgressSummaryQuery";
import { useWeightHistoryQuery } from "@/features/progress/hooks/useWeightHistoryQuery";
import { useTodaysWorkoutWidget } from "@/features/workout/hooks/useTodaysWorkoutWidget";
import { useDashboardChat } from "./useDashboardChat";
import { useDashboardNutrition } from "./useDashboardNutrition";

export function useDashboardData() {
  const { user } = useAuth();
  const workout = useTodaysWorkoutWidget();
  const weight = useWeightHistoryQuery("3months");
  const nutrition = useDashboardNutrition();
  const progress = useProgressSummaryQuery();
  const chat = useDashboardChat();

  return {
    user,
    workout,
    weight: {
      currentWeight: weight.data?.currentWeight ?? null,
      change: weight.data?.change ?? null,
      logs: weight.data?.logs ?? [],
      isLoading: weight.isLoading,
    },
    nutrition,
    progress: {
      data: progress.data ?? null,
      isLoading: progress.isLoading,
    },
    chat,
  };
}
