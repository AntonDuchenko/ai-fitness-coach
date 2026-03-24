"use client";

import { useWorkoutLogsQuery } from "@/features/workout/hooks/useWorkoutLogsQuery";
import { useEffect, useMemo, useState } from "react";
import type { ProgressPeriod } from "../constants";
import {
  aggregateMuscleVolumes,
  detectImbalances,
  parseLoggedExercises,
} from "../utils/muscleVolume";
import { useConsistencyQuery } from "./useConsistencyQuery";
import { useProgressSummaryQuery } from "./useProgressSummaryQuery";
import { useStrengthProgressQuery } from "./useStrengthProgressQuery";
import { useVolumeProgressQuery } from "./useVolumeProgressQuery";
import { useWeightHistoryQuery } from "./useWeightHistoryQuery";

export function useProgressScreenData(period: ProgressPeriod) {
  const [selectedExercise, setSelectedExercise] = useState("");

  const summary = useProgressSummaryQuery();
  const weight = useWeightHistoryQuery(period);
  const consistency = useConsistencyQuery(period);
  const volume = useVolumeProgressQuery(period);
  const logs = useWorkoutLogsQuery(200);

  const exerciseOptions = useMemo(() => {
    const fromPrs =
      summary.data?.personalRecords.map((p) => p.exerciseName) ?? [];
    const fromLogs = new Set<string>();
    for (const log of logs.data ?? []) {
      for (const ex of parseLoggedExercises(log.exercises)) {
        fromLogs.add(ex.exerciseName);
      }
    }
    return [...new Set([...fromPrs, ...fromLogs])].sort((a, b) =>
      a.localeCompare(b),
    );
  }, [summary.data, logs.data]);

  useEffect(() => {
    if (exerciseOptions.length === 0) {
      setSelectedExercise("");
      return;
    }
    if (!exerciseOptions.includes(selectedExercise)) {
      setSelectedExercise(exerciseOptions[0] ?? "");
    }
  }, [exerciseOptions, selectedExercise]);

  const strength = useStrengthProgressQuery(selectedExercise, period);

  const muscleRows = useMemo(
    () => aggregateMuscleVolumes(logs.data ?? [], period),
    [logs.data, period],
  );
  const imbalance = useMemo(
    () => detectImbalances(muscleRows),
    [muscleRows],
  );

  const initialLoading =
    (weight.isLoading && !weight.data) ||
    (consistency.isLoading && !consistency.data);

  const weightLabel =
    weight.data?.startWeight != null && weight.data?.currentWeight != null
      ? `${weight.data.startWeight} → ${weight.data.currentWeight} kg`
      : weight.data?.currentWeight != null
        ? `${weight.data.currentWeight} kg`
        : "—";

  const weightSub =
    weight.data?.change != null && weight.data?.changePercent != null
      ? `${weight.data.change >= 0 ? "+" : ""}${weight.data.change} kg (${weight.data.changePercent >= 0 ? "+" : ""}${weight.data.changePercent.toFixed(1)}%)`
      : "Log weight to see change in this range";

  const workoutsLabel = consistency.data
    ? `${consistency.data.totalWorkouts}`
    : "—";
  const workoutsSub = "Completed in selected period";

  const streakLabel = consistency.data
    ? `${consistency.data.currentStreak} days`
    : "—";
  const streakSub = consistency.data
    ? `Best streak: ${consistency.data.bestStreak} days`
    : "—";

  const strengthLabel =
    strength.data?.improvementPercent != null
      ? `${strength.data.improvementPercent >= 0 ? "+" : ""}${strength.data.improvementPercent.toFixed(1)}%`
      : "—";
  const strengthSub = selectedExercise
    ? `vs start of range · ${selectedExercise}`
    : "Pick an exercise below";

  return {
    summary,
    weight,
    consistency,
    volume,
    strength,
    exerciseOptions,
    selectedExercise,
    setSelectedExercise,
    muscleRows,
    imbalance,
    initialLoading,
    stats: {
      weightLabel,
      weightSub,
      workoutsLabel,
      workoutsSub,
      streakLabel,
      streakSub,
      strengthLabel,
      strengthSub,
    },
  };
}
