export interface ProfileData {
  id: string;
  userId: string;

  // Basic Info
  age: number;
  gender: string;
  height: number;
  weight: number;
  targetWeight: number | null;

  // Goals
  primaryGoal: string;
  secondaryGoals: string[];

  // Experience
  fitnessLevel: string;
  nutritionKnowledge: string;

  // Schedule
  trainingDaysPerWeek: number;
  sessionDuration: number;
  preferredTime: string;

  // Equipment
  trainingLocation: string;
  equipment: string[];

  // Health
  injuries: string | null;
  medicalConditions: string | null;
  medications: string | null;
  dietaryRestrictions: string[];

  // Nutrition
  mealsPerDay: number;
  cookingLevel: string;
  cuisinePreferences: string[];
  dislikedFoods: string[];
  foodBudget: number;

  // Calculated
  tdee: number | null;
  bmr: number | null;
  targetCalories: number | null;
  targetProtein: number | null;
  targetFat: number | null;
  targetCarbs: number | null;

  // Metadata
  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
