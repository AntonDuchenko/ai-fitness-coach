import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class StrengthBestSetDto {
  @ApiProperty({ example: 80, description: "Weight in kg" })
  weight: number;

  @ApiProperty({ example: 8, description: "Reps performed" })
  reps: number;

  constructor(data: { weight: number; reps: number }) {
    this.weight = data.weight;
    this.reps = data.reps;
  }
}

export class StrengthDataPointDto {
  @ApiProperty({ example: "2026-03-22T00:00:00.000Z" })
  date: string;

  @ApiProperty({ example: 80, description: "Heaviest set weight (kg)" })
  maxWeight: number;

  @ApiProperty({
    example: 2400,
    description: "Total volume (sum of weight*reps)",
  })
  totalVolume: number;

  @ApiProperty({ type: StrengthBestSetDto, description: "Best set by weight" })
  bestSet: StrengthBestSetDto;

  constructor(data: {
    date: string;
    maxWeight: number;
    totalVolume: number;
    bestSet: { weight: number; reps: number };
  }) {
    this.date = data.date;
    this.maxWeight = data.maxWeight;
    this.totalVolume = data.totalVolume;
    this.bestSet = new StrengthBestSetDto(data.bestSet);
  }
}

export class StrengthProgressResponseDto {
  @ApiProperty({ example: "Barbell Bench Press" })
  exercise: string;

  @ApiProperty({ type: [StrengthDataPointDto] })
  data: StrengthDataPointDto[];

  @ApiPropertyOptional({
    example: 60,
    description: "Max weight at start of period",
  })
  startMaxWeight: number | null;

  @ApiPropertyOptional({
    example: 80,
    description: "Most recent max weight",
  })
  currentMaxWeight: number | null;

  @ApiPropertyOptional({ example: 20, description: "Improvement in kg" })
  improvementKg: number | null;

  @ApiPropertyOptional({ example: 33.33, description: "Improvement as %" })
  improvementPercent: number | null;

  constructor(data: {
    exercise: string;
    data: StrengthDataPointDto[];
    startMaxWeight: number | null;
    currentMaxWeight: number | null;
    improvementKg: number | null;
    improvementPercent: number | null;
  }) {
    this.exercise = data.exercise;
    this.data = data.data;
    this.startMaxWeight = data.startMaxWeight;
    this.currentMaxWeight = data.currentMaxWeight;
    this.improvementKg = data.improvementKg;
    this.improvementPercent = data.improvementPercent;
  }
}
