"use client";

import { useCallback, useState } from "react";
import {
  parseRepsInput,
  parseTargetReps,
  parseWeightInput,
} from "../utils/workoutLogHelpers";
import type { SessionSet } from "../workoutLog.types";
import type { WorkoutExercise } from "../types";

function applyAutoDone(set: SessionSet): SessionSet {
  const w = parseWeightInput(set.weight);
  const r = parseRepsInput(set.reps);
  const auto = w !== null && r !== null && r > 0;
  return { ...set, done: auto };
}

function mergeSet(prev: SessionSet, patch: Partial<SessionSet>): SessionSet {
  const merged = { ...prev, ...patch };
  if (patch.done === false) return { ...merged, done: false };
  if (patch.done === true) return { ...merged, done: true };
  return applyAutoDone(merged);
}

export function initSetsForExercise(exercise: WorkoutExercise): SessionSet[] {
  const target = parseTargetReps(exercise.reps);
  return Array.from({ length: exercise.sets }, (_, i) => ({
    setNumber: i + 1,
    targetReps: target,
    weight: "",
    reps: "",
    rpe: "",
    done: false,
  }));
}

export function useExerciseSets(exercises: WorkoutExercise[]) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [exercisesSets, setExercisesSets] = useState<SessionSet[][]>([]);

  const currentSets = exercisesSets[exerciseIndex] ?? [];

  const resetSets = useCallback(
    (exs: WorkoutExercise[]) => {
      setExerciseIndex(0);
      setExercisesSets(exs.map((ex) => initSetsForExercise(ex)));
    },
    [],
  );

  const updateSet = useCallback(
    (setIdx: number, patch: Partial<SessionSet>) => {
      setExercisesSets((prev) =>
        prev.map((row, ei) => {
          if (ei !== exerciseIndex) return row;
          return row.map((s, si) => (si !== setIdx ? s : mergeSet(s, patch)));
        }),
      );
    },
    [exerciseIndex],
  );

  const bumpWeights = useCallback(
    (delta: number) => {
      setExercisesSets((prev) =>
        prev.map((row, ei) => {
          if (ei !== exerciseIndex) return row;
          return row.map((s) => {
            const w = parseWeightInput(s.weight);
            const nextW = w !== null ? w + delta : delta;
            return mergeSet(s, { weight: String(nextW) });
          });
        }),
      );
    },
    [exerciseIndex],
  );

  const applySameAsLastTime = useCallback(
    (previousSets: { weight: number; reps: number; rpe?: number }[]) => {
      if (!previousSets.length) return;
      setExercisesSets((prev) =>
        prev.map((row, ei) => {
          if (ei !== exerciseIndex) return row;
          return row.map((s, i) => {
            const src = previousSets[i];
            if (!src) return s;
            return mergeSet(
              { ...s, weight: "", reps: "", rpe: "", done: false },
              {
                weight: String(src.weight),
                reps: String(src.reps),
                rpe: src.rpe != null ? String(src.rpe) : "",
              },
            );
          });
        }),
      );
    },
    [exerciseIndex],
  );

  const goNextExercise = useCallback(() => {
    setExerciseIndex((i) => Math.min(i + 1, exercises.length - 1));
  }, [exercises.length]);

  const goPrevExercise = useCallback(() => {
    setExerciseIndex((i) => Math.max(i - 1, 0));
  }, []);

  return {
    exerciseIndex,
    setExerciseIndex,
    exercisesSets,
    setExercisesSets,
    currentSets,
    resetSets,
    updateSet,
    bumpWeights,
    applySameAsLastTime,
    goNextExercise,
    goPrevExercise,
  };
}
