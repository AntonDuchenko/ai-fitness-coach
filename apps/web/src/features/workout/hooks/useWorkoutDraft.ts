"use client";

import { useCallback, useEffect, useRef } from "react";
import type {
  SessionSet,
  SessionStep,
  WorkoutSessionDraft,
} from "../workoutLog.types";

interface UseDraftOptions {
  open: boolean;
  storageKey: string;
  exerciseCount: number;
  step: SessionStep;
  exerciseIndex: number;
  exercisesSets: SessionSet[][];
  sessionStartedAt: number;
  rating: number;
  notes: string;
}

export interface RestoredDraft {
  exerciseIndex: number;
  exercisesSets: SessionSet[][];
  sessionStartedAt: number;
  step: SessionStep;
  rating: number;
  notes: string;
}

export function useWorkoutDraft({
  open,
  storageKey,
  exerciseCount,
  step,
  exerciseIndex,
  exercisesSets,
  sessionStartedAt,
  rating,
  notes,
}: UseDraftOptions) {
  const initRef = useRef(false);
  const storageKeyRef = useRef(storageKey);

  if (storageKeyRef.current !== storageKey) {
    storageKeyRef.current = storageKey;
    initRef.current = false;
  }

  const tryRestoreDraft = useCallback((): RestoredDraft | null => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      const draft = JSON.parse(raw) as WorkoutSessionDraft;
      if (
        draft.version === 1 &&
        Array.isArray(draft.exercisesSets) &&
        draft.exercisesSets.length === exerciseCount
      ) {
        return {
          exerciseIndex: Math.min(draft.exerciseIndex, exerciseCount - 1),
          exercisesSets: draft.exercisesSets,
          sessionStartedAt: new Date(draft.sessionStartedAt).getTime(),
          step: draft.step === "success" ? "logging" : draft.step,
          rating: draft.rating ?? 0,
          notes: draft.notes ?? "",
        };
      }
    } catch {
      /* ignore */
    }
    return null;
  }, [storageKey, exerciseCount]);

  const shouldInit = useCallback((): boolean => {
    if (initRef.current) return false;
    initRef.current = true;
    return true;
  }, []);

  const resetInit = useCallback(() => {
    initRef.current = false;
  }, []);

  useEffect(() => {
    if (!open) {
      initRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (!open || step !== "logging") return;
    const t = window.setInterval(() => {
      try {
        const draft: WorkoutSessionDraft = {
          version: 1,
          exerciseIndex,
          exercisesSets,
          sessionStartedAt: new Date(sessionStartedAt).toISOString(),
          step,
          rating,
          notes,
        };
        localStorage.setItem(storageKey, JSON.stringify(draft));
      } catch {
        /* ignore */
      }
    }, 30_000);
    return () => window.clearInterval(t);
  }, [open, step, exerciseIndex, exercisesSets, sessionStartedAt, storageKey, rating, notes]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  return { tryRestoreDraft, shouldInit, resetInit, clearDraft };
}
