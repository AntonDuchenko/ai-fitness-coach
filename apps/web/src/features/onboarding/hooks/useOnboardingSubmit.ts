"use client";

import { apiClient } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ONBOARDING_STORAGE_KEY } from "../constants";
import type { OnboardingData } from "../types";

interface ProfileCreateResponse {
  profile: Record<string, unknown>;
  jobId: string;
}

interface OnboardingStatusResponse {
  status: "pending" | "processing" | "complete" | "failed";
  progress: number;
}

const PRIMARY_GOAL_MAP: Record<string, string> = {
  lose_weight: "weight_loss",
  build_muscle: "muscle_gain",
  get_fit: "recomp",
  eat_healthier: "health",
};

const TRAINING_LOCATION_MAP: Record<string, string> = {
  gym: "commercial_gym",
  home: "home_basic",
  outdoor: "outdoor",
};

const COOKING_LEVEL_MAP: Record<string, string> = {
  beginner: "rarely",
  intermediate: "sometimes",
  advanced: "regular",
  chef: "regular",
};

const FITNESS_LEVEL_MAP: Record<string, string> = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  athlete: "advanced",
};

const NUTRITION_KNOWLEDGE_MAP: Record<string, string> = {
  none: "none",
  basic: "basic",
  good: "intermediate",
  expert: "advanced",
};

function mapOnboardingToProfile(data: OnboardingData) {
  const heightCm =
    data.heightUnit === "ft"
      ? Math.round(Number.parseFloat(data.height) * 30.48)
      : Number.parseFloat(data.height);

  return {
    age: Number.parseInt(data.age, 10),
    gender: data.gender,
    height: heightCm,
    weight: Number.parseFloat(data.weight),
    targetWeight: data.targetWeight
      ? Number.parseFloat(data.targetWeight)
      : undefined,
    primaryGoal: PRIMARY_GOAL_MAP[data.primaryGoal] || data.primaryGoal,
    secondaryGoals: data.secondaryGoals,
    fitnessLevel: FITNESS_LEVEL_MAP[data.fitnessLevel] || data.fitnessLevel,
    nutritionKnowledge:
      NUTRITION_KNOWLEDGE_MAP[data.nutritionKnowledge] ||
      data.nutritionKnowledge,
    trainingDaysPerWeek: data.trainingDaysPerWeek,
    sessionDuration: Number.parseInt(data.sessionDuration, 10),
    preferredTime: data.preferredTime || "flexible",
    trainingLocation:
      TRAINING_LOCATION_MAP[data.trainingLocation] || data.trainingLocation,
    equipment: data.equipment,
    injuries: data.injuries || undefined,
    medicalConditions: data.medicalConditions || undefined,
    dietaryRestrictions: data.dietaryRestrictions,
    mealsPerDay: data.mealsPerDay,
    cookingLevel: COOKING_LEVEL_MAP[data.cookingLevel] || data.cookingLevel,
    cuisinePreferences: data.cuisinePreferences,
    dislikedFoods: data.dislikedFoods
      ? data.dislikedFoods
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    foodBudget: Number.parseFloat(data.foodBudget),
    motivation: data.motivation,
    previousAttempts: data.previousAttempts,
    previousAttemptsDetails: data.previousAttemptsDetails || undefined,
    biggestChallenges: data.biggestChallenges,
  };
}

export function useOnboardingSubmit() {
  const queryClient = useQueryClient();
  const [jobId, setJobId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data: OnboardingData) =>
      apiClient<ProfileCreateResponse>("/users/profile", {
        method: "POST",
        body: JSON.stringify(mapOnboardingToProfile(data)),
      }),
    onSuccess: (response) => {
      setJobId(response.jobId);
      setIsSubmitted(true);
    },
  });

  const statusQuery = useQuery<OnboardingStatusResponse>({
    queryKey: ["onboarding-status"],
    queryFn: () =>
      apiClient<OnboardingStatusResponse>("/users/onboarding-status"),
    enabled: isSubmitted && jobId !== null,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "complete" || status === "failed") return false;
      return 2000;
    },
  });

  const isComplete = statusQuery.data?.status === "complete";
  const isFailed = statusQuery.data?.status === "failed";
  const apiProgress = statusQuery.data?.progress ?? 0;

  // Simulate smooth progress: tick every 150ms, cap at 90% until backend says complete
  const [displayProgress, setDisplayProgress] = useState(0);
  const isGenerating = submitMutation.isPending || isSubmitted;

  useEffect(() => {
    if (!isGenerating) {
      setDisplayProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (isComplete) return Math.min(prev + 4, 100);
        if (isFailed) return prev;
        // Slow down as we approach 90%
        if (prev < 30) return prev + 3;
        if (prev < 60) return prev + 2;
        if (prev < 85) return prev + 1;
        if (prev < 90) return prev + 0.5;
        return prev;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isGenerating, isComplete, isFailed]);

  const handleComplete = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    queryClient.setQueryData(["auth", "me"], (prev: Record<string, unknown> | null) =>
      prev ? { ...prev, onboardingCompleted: true } : prev,
    );
  };

  return {
    submit: submitMutation.mutate,
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error,
    isSubmitted,
    progress: displayProgress,
    isComplete,
    isFailed,
    statusError: statusQuery.error,
    handleComplete,
  };
}
