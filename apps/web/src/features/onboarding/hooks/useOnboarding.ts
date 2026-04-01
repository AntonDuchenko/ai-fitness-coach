"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ONBOARDING_STEPS,
  ONBOARDING_STORAGE_KEY,
  defaultOnboardingData,
} from "../constants";
import { type StepErrors, validateStep } from "../schemas";
import type { OnboardingData, OnboardingState } from "../types";
import { useOnboardingSubmit } from "./useOnboardingSubmit";

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    step: 1,
    data: defaultOnboardingData,
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const {
    submit,
    isSubmitting,
    submitError,
    isSubmitted,
    progress: apiProgress,
    isComplete,
    isFailed,
    statusError,
    handleComplete,
  } = useOnboardingSubmit();

  useEffect(() => {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as OnboardingState;
        setState({
          step: Math.min(Math.max(saved.step ?? 1, 1), ONBOARDING_STEPS),
          data: { ...defaultOnboardingData, ...saved.data },
        });
      } catch {
        localStorage.removeItem(ONBOARDING_STORAGE_KEY);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const stepErrors: StepErrors = useMemo(
    () => (showErrors ? validateStep(state.step, state.data) : {}),
    [state.step, state.data, showErrors],
  );

  const canContinue = useMemo(() => {
    const errors = validateStep(state.step, state.data);
    return Object.keys(errors).length === 0;
  }, [state.step, state.data]);

  const updateData = <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K],
  ) => {
    setState((prev) => ({ ...prev, data: { ...prev.data, [key]: value } }));
    setShowErrors(false);
  };

  const toggleArrayValue = (
    key:
      | "secondaryGoals"
      | "equipment"
      | "dietaryRestrictions"
      | "cuisinePreferences"
      | "biggestChallenges",
    value: string,
  ) => {
    setState((prev) => {
      const list = prev.data[key];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, data: { ...prev.data, [key]: next } };
    });
  };

  const nextStep = () => {
    const errors = validateStep(state.step, state.data);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      return;
    }
    if (state.step < ONBOARDING_STEPS) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
      setShowErrors(false);
      return;
    }
    submit(state.data);
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
    setShowErrors(false);
  };

  const isGenerating = isSubmitting || isSubmitted;
  const generationProgress = apiProgress;
  const error = submitError || statusError;

  return {
    state,
    canContinue,
    isGenerating,
    isHydrated,
    generationProgress,
    isComplete,
    isFailed,
    error,
    stepErrors,
    updateData,
    toggleArrayValue,
    nextStep,
    prevStep,
    handleComplete,
  };
}
