import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import type { WorkoutLog } from "@prisma/client";

export class WorkoutLogResponseDto {
  @ApiProperty({ example: "clxyz456" })
  id: string;

  @ApiProperty({ example: "clxyz123" })
  workoutPlanId: string | null;

  @ApiProperty({ example: "Upper Push" })
  workoutName: string;

  @ApiProperty({
    description: "Array of exercise log objects",
    example: [
      {
        exerciseName: "Barbell Bench Press",
        sets: [{ setNumber: 1, weight: 80, reps: 8, rpe: 7 }],
        notes: "Felt strong",
      },
    ],
  })
  exercises: unknown;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  completedAt: Date;

  @ApiPropertyOptional({ example: 55, description: "Duration in minutes" })
  duration: number | null;

  @ApiPropertyOptional({ example: 4, description: "Rating 1-5" })
  rating: number | null;

  @ApiPropertyOptional({ example: "Great session" })
  notes: string | null;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  createdAt: Date;

  constructor(log: WorkoutLog) {
    this.id = log.id;
    this.workoutPlanId = log.workoutPlanId;
    this.workoutName = log.workoutName;
    this.exercises = log.exercises;
    this.completedAt = log.completedAt;
    this.duration = log.duration;
    this.rating = log.rating;
    this.notes = log.notes;
    this.createdAt = log.createdAt;
  }
}
