export interface WorkoutExercise {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest?: string;
  notes?: string;
  alternatives?: string[];
}

export interface WorkoutDaySchedule {
  dayOfWeek: string;
  focus: string;
  duration?: number;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  weeklySchedule: WorkoutDaySchedule[];
  startDate: string;
  durationWeeks: number;
  progressionScheme: string;
  deloadWeek: number | null;
  notes: string | null;
  isActive: boolean;
  createdAt: string;
}

export type DayStatus = "scheduled" | "completed" | "missed" | "rest";

export interface CalendarDaySlot {
  date: Date;
  labelShort: string;
  weekdayLong: string;
  workout: WorkoutDaySchedule | null;
  isRest: boolean;
  status: DayStatus;
}
