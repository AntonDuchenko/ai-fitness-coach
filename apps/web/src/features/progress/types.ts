export interface WeightLogResponse {
  id: string;
  weight: number;
  date: string;
  notes: string | null;
  createdAt: string;
}

export interface WeightHistoryResponse {
  logs: WeightLogResponse[];
  startWeight: number | null;
  currentWeight: number | null;
  change: number | null;
  changePercent: number | null;
}

export interface CreateWeightLogPayload {
  weight: number;
  date?: string;
  notes?: string;
}

export interface StrengthDataPoint {
  date: string;
  maxWeight: number;
  totalVolume: number;
  bestSet: { weight: number; reps: number };
}

export interface StrengthProgressResponse {
  exercise: string;
  data: StrengthDataPoint[];
  startMaxWeight: number | null;
  currentMaxWeight: number | null;
  improvementKg: number | null;
  improvementPercent: number | null;
}

export interface DailyConsistency {
  date: string;
  workoutCount: number;
  totalDuration: number;
}

export interface ConsistencyResponse {
  dailyData: DailyConsistency[];
  totalWorkouts: number;
  workoutsPerWeek: number;
  currentStreak: number;
  bestStreak: number;
}

export interface WeeklyVolume {
  weekStart: string;
  totalVolume: number;
  workoutCount: number;
  avgVolumePerWorkout: number;
}

export interface VolumeProgressResponse {
  weeklyData: WeeklyVolume[];
  totalVolume: number;
  avgWeeklyVolume: number;
}

export interface ProgressSummaryResponse {
  weight: {
    startWeight: number | null;
    currentWeight: number | null;
    targetWeight: number | null;
    change: number | null;
    changePercent: number | null;
  };
  workouts: {
    totalCompleted: number;
    thisWeek: number;
    thisMonth: number;
    currentStreak: number;
    bestStreak: number;
  };
  volume: {
    thisWeekVolume: number;
    lastWeekVolume: number;
    changePercent: number | null;
  };
  personalRecords: {
    exerciseName: string;
    maxWeight: number;
    repsAtMax: number;
    achievedAt: string;
  }[];
}
