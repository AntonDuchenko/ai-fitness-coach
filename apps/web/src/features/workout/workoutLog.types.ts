/** Aligns with API workout log exercise payload */

export interface LoggedSet {
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number;
}

export interface LoggedExercise {
  exerciseName: string;
  sets: LoggedSet[];
  notes?: string;
}

export interface WorkoutLogResponse {
  id: string;
  workoutPlanId: string | null;
  workoutName: string;
  exercises: unknown;
  completedAt: string;
  duration: number | null;
  rating: number | null;
  notes: string | null;
  createdAt: string;
}

export interface WorkoutStatsResponse {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  personalRecords: unknown[];
}

export interface CreateWorkoutLogPayload {
  workoutPlanId: string;
  workoutName: string;
  exercises: LoggedExercise[];
  duration?: number;
  rating?: number;
  notes?: string;
}

export type SessionStep = "logging" | "complete" | "success";

export interface SessionSet {
  setNumber: number;
  targetReps: number;
  weight: string;
  reps: string;
  rpe: string;
  done: boolean;
}

export interface WorkoutSessionDraft {
  version: 1;
  exerciseIndex: number;
  exercisesSets: SessionSet[][];
  sessionStartedAt: string;
  step: SessionStep;
  rating: number;
  notes: string;
}
