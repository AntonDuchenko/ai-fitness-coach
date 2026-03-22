import { ApiProperty } from "@nestjs/swagger";
import { PersonalRecordDto } from "./personal-record.dto";

export class WorkoutStatsResponseDto {
  @ApiProperty({ example: 42, description: "Total number of logged workouts" })
  totalWorkouts: number;

  @ApiProperty({
    example: 5,
    description: "Current consecutive workout streak (days)",
  })
  currentStreak: number;

  @ApiProperty({
    example: 14,
    description: "Longest consecutive workout streak (days)",
  })
  longestStreak: number;

  @ApiProperty({
    type: [PersonalRecordDto],
    description: "Personal records per exercise",
  })
  personalRecords: PersonalRecordDto[];

  constructor(data: {
    totalWorkouts: number;
    currentStreak: number;
    longestStreak: number;
    personalRecords: PersonalRecordDto[];
  }) {
    this.totalWorkouts = data.totalWorkouts;
    this.currentStreak = data.currentStreak;
    this.longestStreak = data.longestStreak;
    this.personalRecords = data.personalRecords;
  }
}
