"use client";

import { useMemo } from "react";
import type { WorkoutDaySchedule } from "../types";
import { findWorkoutLogForDate } from "../utils/todayLog";
import type { WorkoutLogResponse } from "../workoutLog.types";
import { useTodaysWorkoutQuery } from "./useTodaysWorkoutQuery";
import { useWorkoutLogsQuery } from "./useWorkoutLogsQuery";
import { isPlanNotFound, useWorkoutPlan } from "./useWorkoutPlan";

export type TodaysWorkoutWidgetStatus =
  | "loading"
  | "no-plan"
  | "error"
  | "completed"
  | "rest"
  | "scheduled";

export interface SessionStartPayload {
  planId: string;
  dayKey: string;
  workoutName: string;
  exercises: WorkoutDaySchedule["exercises"];
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function useTodaysWorkoutWidget() {
  const {
    plan,
    isLoading: planLoading,
    isError: planIsError,
    error: planError,
    refetch: refetchPlan,
  } = useWorkoutPlan();

  const hasPlan = !!plan;
  const todayQuery = useTodaysWorkoutQuery({ enabled: hasPlan });
  const logsQuery = useWorkoutLogsQuery(40, { enabled: hasPlan });

  const today = useMemo(() => new Date(), []);
  const todayKey = dayKey(today);

  const todayLog = useMemo((): WorkoutLogResponse | undefined => {
    if (!logsQuery.data) return undefined;
    return findWorkoutLogForDate(logsQuery.data, today);
  }, [logsQuery.data, today]);

  const status: TodaysWorkoutWidgetStatus = useMemo(() => {
    if (planLoading) return "loading";
    if (planIsError && isPlanNotFound(planError)) return "no-plan";
    if (planIsError || !plan) return "error";
    if (todayQuery.isLoading || logsQuery.isLoading) return "loading";
    if (todayLog) return "completed";
    if (todayQuery.isError) return "error";
    if (todayQuery.data === null) return "rest";
    return "scheduled";
  }, [
    planLoading,
    planIsError,
    planError,
    plan,
    todayQuery.isLoading,
    todayQuery.isError,
    todayQuery.data,
    logsQuery.isLoading,
    todayLog,
  ]);

  const sessionPayload: SessionStartPayload | null = useMemo(() => {
    if (!plan) return null;
    const workout = todayQuery.data;
    if (!workout || workout.exercises.length === 0) return null;
    return {
      planId: plan.id,
      dayKey: todayKey,
      workoutName: workout.focus,
      exercises: workout.exercises,
    };
  }, [plan, todayQuery.data, todayKey]);

  return {
    status,
    plan,
    todayWorkout: todayQuery.data,
    todayLog,
    todayKey,
    sessionPayload,
    isLoading:
      planLoading || (hasPlan && (todayQuery.isLoading || logsQuery.isLoading)),
    error:
      todayQuery.error ??
      (planIsError && !isPlanNotFound(planError) ? planError : null),
    refetch: () => {
      void refetchPlan();
      void todayQuery.refetch();
      void logsQuery.refetch();
    },
  };
}
