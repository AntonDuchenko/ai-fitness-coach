import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WeightSummaryDto {
  @ApiPropertyOptional({ example: 85.0 })
  startWeight!: number | null;

  @ApiPropertyOptional({ example: 82.5 })
  currentWeight!: number | null;

  @ApiPropertyOptional({ example: 80.0 })
  targetWeight!: number | null;

  @ApiPropertyOptional({ example: -2.5 })
  change!: number | null;

  @ApiPropertyOptional({ example: -2.94 })
  changePercent!: number | null;
}

export class WorkoutsSummaryDto {
  @ApiProperty({ example: 42 })
  totalCompleted!: number;

  @ApiProperty({ example: 3 })
  thisWeek!: number;

  @ApiProperty({ example: 14 })
  thisMonth!: number;

  @ApiProperty({ example: 5 })
  currentStreak!: number;

  @ApiProperty({ example: 14 })
  bestStreak!: number;
}

export class VolumeSummaryDto {
  @ApiProperty({ example: 15000 })
  thisWeekVolume!: number;

  @ApiProperty({ example: 14000 })
  lastWeekVolume!: number;

  @ApiPropertyOptional({ example: 7.14 })
  changePercent!: number | null;
}

export class PersonalRecordSummaryDto {
  @ApiProperty({ example: "Barbell Bench Press" })
  exerciseName!: string;

  @ApiProperty({ example: 100 })
  maxWeight!: number;

  @ApiProperty({ example: 5 })
  repsAtMax!: number;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  achievedAt!: string;
}

export class ProgressSummaryResponseDto {
  @ApiProperty({ type: WeightSummaryDto })
  weight!: WeightSummaryDto;

  @ApiProperty({ type: WorkoutsSummaryDto })
  workouts!: WorkoutsSummaryDto;

  @ApiProperty({ type: VolumeSummaryDto })
  volume!: VolumeSummaryDto;

  @ApiProperty({ type: [PersonalRecordSummaryDto] })
  personalRecords!: PersonalRecordSummaryDto[];
}
