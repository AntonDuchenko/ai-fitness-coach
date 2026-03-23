import { ApiProperty } from "@nestjs/swagger";

export class DailyConsistencyDto {
  @ApiProperty({ example: "2026-03-22T00:00:00.000Z" })
  date: string;

  @ApiProperty({ example: 1, description: "Number of workouts on this date" })
  workoutCount: number;

  @ApiProperty({ example: 55, description: "Total duration in minutes" })
  totalDuration: number;

  constructor(data: {
    date: string;
    workoutCount: number;
    totalDuration: number;
  }) {
    this.date = data.date;
    this.workoutCount = data.workoutCount;
    this.totalDuration = data.totalDuration;
  }
}

export class ConsistencyResponseDto {
  @ApiProperty({ type: [DailyConsistencyDto] })
  dailyData: DailyConsistencyDto[];

  @ApiProperty({ example: 42, description: "Total workouts in period" })
  totalWorkouts: number;

  @ApiProperty({ example: 3.5, description: "Average workouts per week" })
  workoutsPerWeek: number;

  @ApiProperty({ example: 5, description: "Current consecutive streak" })
  currentStreak: number;

  @ApiProperty({ example: 14, description: "Best consecutive streak" })
  bestStreak: number;

  constructor(data: {
    dailyData: DailyConsistencyDto[];
    totalWorkouts: number;
    workoutsPerWeek: number;
    currentStreak: number;
    bestStreak: number;
  }) {
    this.dailyData = data.dailyData;
    this.totalWorkouts = data.totalWorkouts;
    this.workoutsPerWeek = data.workoutsPerWeek;
    this.currentStreak = data.currentStreak;
    this.bestStreak = data.bestStreak;
  }
}
