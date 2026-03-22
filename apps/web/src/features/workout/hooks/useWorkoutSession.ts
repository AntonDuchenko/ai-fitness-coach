"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { WorkoutExercise } from "../types";
import {
  computeXpGained,
  findPreviousExerciseSets,
  formatLastTimeLine,
  levelFromTotalWorkouts,
  parseRepsInput,
  parseRestSeconds,
  parseWeightInput,
  totalVolumeKg,
  workoutDraftStorageKey,
} from "../utils/workoutLogHelpers";
import type {
  CreateWorkoutLogPayload,
  LoggedExercise,
  SessionStep,
} from "../workoutLog.types";
import { useExerciseSets, initSetsForExercise } from "./useExerciseSets";
import { useLogWorkoutMutation } from "./useLogWorkoutMutation";
import { useRestTimer } from "./useRestTimer";
import { useWorkoutDraft } from "./useWorkoutDraft";
import { useWorkoutLogsQuery } from "./useWorkoutLogsQuery";
import { useWorkoutStatsQuery } from "./useWorkoutStatsQuery";

export interface UseWorkoutSessionOptions {
  open: boolean;
  planId: string;
  dayKey: string;
  workoutName: string;
  exercises: WorkoutExercise[];
}

export function useWorkoutSession({
  open,
  planId,
  dayKey,
  workoutName,
  exercises,
}: UseWorkoutSessionOptions) {
  const storageKey = useMemo(
    () => workoutDraftStorageKey(planId, dayKey),
    [planId, dayKey],
  );

  const [step, setStep] = useState<SessionStep>("logging");
  const [sessionStartedAt, setSessionStartedAt] = useState(() => Date.now());
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [lastExpanded, setLastExpanded] = useState(true);
  const [successMeta, setSuccessMeta] = useState<{
    xp: number;
    levelUp: boolean;
    newLevel: number;
    streak: number;
  } | null>(null);

  const sets = useExerciseSets(exercises);
  const currentExercise = exercises[sets.exerciseIndex] ?? null;

  const restSeconds = useMemo(
    () => parseRestSeconds(currentExercise?.rest),
    [currentExercise],
  );
  const rest = useRestTimer(restSeconds);

  const logsQuery = useWorkoutLogsQuery(50);
  const statsQuery = useWorkoutStatsQuery();
  const logMutation = useLogWorkoutMutation();
  const logs = logsQuery.data ?? [];

  const draft = useWorkoutDraft({
    open,
    storageKey,
    exerciseCount: exercises.length,
    step,
    exerciseIndex: sets.exerciseIndex,
    exercisesSets: sets.exercisesSets,
    sessionStartedAt,
    rating,
    notes,
  });

  const previousSetsForCurrent = useMemo(() => {
    if (!currentExercise) return null;
    return findPreviousExerciseSets(logs, currentExercise.name);
  }, [logs, currentExercise]);

  const lastTimeLabel = useMemo(
    () =>
      previousSetsForCurrent
        ? formatLastTimeLine(previousSetsForCurrent)
        : null,
    [previousSetsForCurrent],
  );

  const resetFresh = useCallback(() => {
    setStep("logging");
    sets.setExerciseIndex(0);
    sets.setExercisesSets(exercises.map((ex) => initSetsForExercise(ex)));
    setSessionStartedAt(Date.now());
    setRating(0);
    setNotes("");
    rest.resetRest();
    setSuccessMeta(null);
  }, [exercises, sets, rest]);

  useEffect(() => {
    if (!open || exercises.length === 0) return;
    if (!draft.shouldInit()) return;

    const restored = draft.tryRestoreDraft();
    if (restored) {
      sets.setExerciseIndex(restored.exerciseIndex);
      sets.setExercisesSets(restored.exercisesSets);
      setSessionStartedAt(restored.sessionStartedAt);
      setStep(restored.step);
      setRating(restored.rating);
      setNotes(restored.notes);
    } else {
      resetFresh();
    }
  }, [open, exercises, draft, sets, resetFresh]);

  const buildLoggedExercises = useCallback((): LoggedExercise[] => {
    return exercises.map((ex, ei) => {
      const rows = sets.exercisesSets[ei] ?? [];
      return {
        exerciseName: ex.name,
        sets: rows.map((s) => {
          const w = parseWeightInput(s.weight);
          const r = parseRepsInput(s.reps);
          const rpeNum = s.rpe ? Number.parseInt(s.rpe, 10) : undefined;
          return {
            setNumber: s.setNumber,
            weight: w ?? 0,
            reps: r ?? 0,
            ...(rpeNum != null && rpeNum >= 1 && rpeNum <= 10 && { rpe: rpeNum }),
          };
        }),
      };
    });
  }, [exercises, sets.exercisesSets]);

  const volumeKg = useMemo(() => {
    const logged = buildLoggedExercises();
    return totalVolumeKg(logged);
  }, [buildLoggedExercises]);

  const goNextExercise = useCallback(() => {
    sets.goNextExercise();
    rest.resetRest();
  }, [sets, rest]);

  const goPrevExercise = useCallback(() => {
    sets.goPrevExercise();
    rest.resetRest();
  }, [sets, rest]);

  const goToComplete = useCallback(() => setStep("complete"), []);

  const applySameAsLastTime = useCallback(() => {
    if (!previousSetsForCurrent?.length) return;
    sets.applySameAsLastTime(previousSetsForCurrent);
  }, [previousSetsForCurrent, sets]);

  const markSetDone = useCallback(
    (setIdx: number, done: boolean) => {
      sets.updateSet(setIdx, { done });
      if (done) rest.startRest();
    },
    [sets, rest],
  );

  const submitWorkout = useCallback(async () => {
    for (let ei = 0; ei < exercises.length; ei++) {
      const row = sets.exercisesSets[ei] ?? [];
      for (const s of row) {
        const w = parseWeightInput(s.weight);
        const r = parseRepsInput(s.reps);
        if (w === null || r === null || r < 1) {
          toast.error(
            `Enter weight and reps for ${exercises[ei].name}, set ${s.setNumber}.`,
          );
          return;
        }
      }
    }

    const duration = Math.max(
      1,
      Math.round((Date.now() - sessionStartedAt) / 60_000),
    );
    const payload: CreateWorkoutLogPayload = {
      workoutPlanId: planId,
      workoutName,
      exercises: buildLoggedExercises(),
      duration,
      ...(rating >= 1 && rating <= 5 && { rating }),
      ...(notes.trim() && { notes: notes.trim() }),
    };

    const totalBefore = statsQuery.data?.totalWorkouts ?? 0;
    try {
      await logMutation.mutateAsync(payload);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Could not save workout. Try again.",
      );
      return;
    }
    const { data: freshStats } = await statsQuery.refetch();

    const xp = computeXpGained(exercises.length, volumeKg);
    const newTotal = totalBefore + 1;
    const oldLevel = levelFromTotalWorkouts(totalBefore);
    const newLevel = levelFromTotalWorkouts(newTotal);

    draft.clearDraft();
    setSuccessMeta({
      xp,
      levelUp: newLevel > oldLevel,
      newLevel,
      streak: freshStats?.currentStreak ?? 0,
    });
    setStep("success");
  }, [
    planId,
    workoutName,
    buildLoggedExercises,
    sessionStartedAt,
    rating,
    notes,
    logMutation,
    exercises,
    sets.exercisesSets,
    volumeKg,
    statsQuery,
    draft,
  ]);

  const finishSuccess = useCallback(() => resetFresh(), [resetFresh]);

  return {
    step,
    exerciseIndex: sets.exerciseIndex,
    exercises,
    currentExercise,
    currentSets: sets.currentSets,
    exerciseLabel: `Exercise ${sets.exerciseIndex + 1} of ${exercises.length}`,
    progressFraction:
      exercises.length > 0 ? (sets.exerciseIndex + 1) / exercises.length : 0,
    updateSet: sets.updateSet,
    bumpWeights: sets.bumpWeights,
    applySameAsLastTime,
    goNextExercise,
    goPrevExercise,
    goToComplete,
    lastTimeLabel,
    lastExpanded,
    setLastExpanded,
    restRemaining: rest.restRemaining,
    restSeconds,
    startRest: rest.startRest,
    skipRest: rest.skipRest,
    markSetDone,
    rating,
    setRating,
    notes,
    setNotes,
    sessionStartedAt,
    volumeKg,
    submitWorkout,
    logMutation,
    finishSuccess,
    successMeta,
    logsLoading: logsQuery.isLoading,
  };
}
