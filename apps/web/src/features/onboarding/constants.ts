import type { OnboardingData } from "./types";

export const ONBOARDING_STEPS = 8;
export const ONBOARDING_STORAGE_KEY = "ai-fitness-onboarding-v1";

export const defaultOnboardingData: OnboardingData = {
  age: "",
  gender: "male",
  height: "",
  heightUnit: "cm",
  weight: "",
  targetWeight: "",
  primaryGoal: "" as OnboardingData["primaryGoal"],
  secondaryGoals: [],
  fitnessLevel: "",
  nutritionKnowledge: "",
  trainingDaysPerWeek: 0,
  sessionDuration: "",
  preferredTime: "",
  trainingLocation: "" as OnboardingData["trainingLocation"],
  equipment: [],
  injuries: "",
  medicalConditions: "",
  dietaryRestrictions: [],
  mealsPerDay: 3,
  cookingLevel: "",
  cuisinePreferences: [],
  dislikedFoods: "",
  foodBudget: "",
  motivation: "",
  previousAttempts: false,
  previousAttemptsDetails: "",
  biggestChallenges: [],
};
