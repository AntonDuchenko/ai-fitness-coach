import { ApiProperty } from "@nestjs/swagger";

export class WeeklyVolumeDto {
  @ApiProperty({
    example: "2026-03-17T00:00:00.000Z",
    description: "Monday of the week",
  })
  weekStart: string;

  @ApiProperty({ example: 15000, description: "Total volume (weight*reps)" })
  totalVolume: number;

  @ApiProperty({ example: 4, description: "Number of workouts that week" })
  workoutCount: number;

  @ApiProperty({ example: 3750, description: "Average volume per workout" })
  avgVolumePerWorkout: number;

  constructor(data: {
    weekStart: string;
    totalVolume: number;
    workoutCount: number;
    avgVolumePerWorkout: number;
  }) {
    this.weekStart = data.weekStart;
    this.totalVolume = data.totalVolume;
    this.workoutCount = data.workoutCount;
    this.avgVolumePerWorkout = data.avgVolumePerWorkout;
  }
}

export class VolumeProgressResponseDto {
  @ApiProperty({ type: [WeeklyVolumeDto] })
  weeklyData: WeeklyVolumeDto[];

  @ApiProperty({ example: 60000, description: "Total volume in period" })
  totalVolume: number;

  @ApiProperty({ example: 15000, description: "Average weekly volume" })
  avgWeeklyVolume: number;

  constructor(data: {
    weeklyData: WeeklyVolumeDto[];
    totalVolume: number;
    avgWeeklyVolume: number;
  }) {
    this.weeklyData = data.weeklyData;
    this.totalVolume = data.totalVolume;
    this.avgWeeklyVolume = data.avgWeeklyVolume;
  }
}
