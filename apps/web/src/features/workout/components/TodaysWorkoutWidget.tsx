"use client";

import type {
  SessionStartPayload,
  TodaysWorkoutWidgetStatus,
} from "../hooks/useTodaysWorkoutWidget";
import type { WorkoutDaySchedule } from "../types";
import type { WorkoutLogResponse } from "../workoutLog.types";
import { TodaysWorkoutCompleted } from "./TodaysWorkoutCompleted";
import { TodaysWorkoutError } from "./TodaysWorkoutError";
import { TodaysWorkoutLoading } from "./TodaysWorkoutLoading";
import { TodaysWorkoutNoPlan } from "./TodaysWorkoutNoPlan";
import { TodaysWorkoutRest } from "./TodaysWorkoutRest";
import { TodaysWorkoutScheduled } from "./TodaysWorkoutScheduled";

export interface TodaysWorkoutWidgetProps {
  status: TodaysWorkoutWidgetStatus;
  todayWorkout: WorkoutDaySchedule | null | undefined;
  todayLog: WorkoutLogResponse | undefined;
  sessionPayload: SessionStartPayload | null;
  onStartWorkout: () => void;
  onRetry: () => void;
}

export function TodaysWorkoutWidget({
  status,
  todayWorkout,
  todayLog,
  sessionPayload,
  onStartWorkout,
  onRetry,
}: TodaysWorkoutWidgetProps) {
  if (status === "loading") return <TodaysWorkoutLoading />;
  if (status === "error") return <TodaysWorkoutError onRetry={onRetry} />;
  if (status === "no-plan") return <TodaysWorkoutNoPlan />;
  if (status === "rest") return <TodaysWorkoutRest />;

  if (status === "completed" && todayLog) {
    return (
      <TodaysWorkoutCompleted
        todayWorkout={todayWorkout}
        todayLog={todayLog}
        showLogAgain={!!sessionPayload}
        onStartWorkout={onStartWorkout}
      />
    );
  }

  if (status === "scheduled" && todayWorkout && sessionPayload) {
    return (
      <TodaysWorkoutScheduled
        todayWorkout={todayWorkout}
        onStartWorkout={onStartWorkout}
      />
    );
  }

  return null;
}
