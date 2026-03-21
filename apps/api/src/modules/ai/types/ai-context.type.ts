import type { NutritionPlan, UserProfile, WorkoutPlan } from "@prisma/client";

export interface AiContext {
  profile: UserProfile | null;
  conversationHistory: { role: string; content: string }[];
  workoutPlan: WorkoutPlan | null;
  nutritionPlan: NutritionPlan | null;
  recentWorkouts: {
    workoutName: string;
    exercises: unknown;
    completedAt: Date;
    duration: number | null;
    rating: number | null;
  }[];
  language: string;
}

export interface CachedContext {
  data: AiContext;
  expiresAt: number;
}
