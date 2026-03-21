export interface OnboardingData {
  age: string;
  gender: "male" | "female" | "other";
  height: string;
  heightUnit: "cm" | "ft";
  weight: string;
  targetWeight: string;
  primaryGoal: "lose_weight" | "build_muscle" | "get_fit" | "eat_healthier";
  secondaryGoals: string[];
  fitnessLevel: string;
  nutritionKnowledge: string;
  trainingDaysPerWeek: number;
  sessionDuration: string;
  preferredTime: string;
  trainingLocation: "gym" | "home" | "outdoor";
  equipment: string[];
  injuries: string;
  medicalConditions: string;
  dietaryRestrictions: string[];
  mealsPerDay: number;
  cookingLevel: string;
  cuisinePreferences: string[];
  dislikedFoods: string;
  foodBudget: string;
  motivation: string;
  previousAttempts: boolean;
  previousAttemptsDetails: string;
  biggestChallenges: string[];
}

export interface OnboardingState {
  step: number;
  data: OnboardingData;
}
