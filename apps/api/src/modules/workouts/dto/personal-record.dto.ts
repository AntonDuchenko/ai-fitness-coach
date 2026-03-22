import { ApiProperty } from "@nestjs/swagger";

export class PersonalRecordDto {
  @ApiProperty({ example: "Barbell Bench Press" })
  exerciseName: string;

  @ApiProperty({ example: 100, description: "Max weight in kg" })
  maxWeight: number;

  @ApiProperty({ example: 5, description: "Reps at max weight" })
  repsAtMax: number;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  achievedAt: Date;

  constructor(data: {
    exerciseName: string;
    maxWeight: number;
    repsAtMax: number;
    achievedAt: Date;
  }) {
    this.exerciseName = data.exerciseName;
    this.maxWeight = data.maxWeight;
    this.repsAtMax = data.repsAtMax;
    this.achievedAt = data.achievedAt;
  }
}
