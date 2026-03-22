import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import type { WorkoutPlan } from "@prisma/client";

export class WorkoutPlanResponseDto {
  @ApiProperty({ example: "clxyz123" })
  id: string;

  @ApiProperty({ example: "8-Week Muscle Building Program" })
  name: string;

  @ApiProperty({
    description: "Array of workout day objects with exercises",
    example: [
      {
        dayOfWeek: "Monday",
        focus: "Upper Push",
        duration: 60,
        exercises: [
          {
            name: "Barbell Bench Press",
            muscleGroup: "Chest",
            sets: 4,
            reps: "6-8",
            rest: "2-3 min",
            notes: "Control eccentric, explosive concentric",
            alternatives: ["Dumbbell Bench Press", "Push-ups"],
          },
        ],
      },
    ],
  })
  weeklySchedule: unknown;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  startDate: Date;

  @ApiProperty({ example: 8 })
  durationWeeks: number;

  @ApiProperty({
    example: "Linear progression: +2.5kg when hit top of rep range",
  })
  progressionScheme: string;

  @ApiPropertyOptional({ example: 4 })
  deloadWeek: number | null;

  @ApiPropertyOptional({ example: "Focus on form before increasing weight" })
  notes: string | null;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  createdAt: Date;

  constructor(plan: WorkoutPlan) {
    this.id = plan.id;
    this.name = plan.name;
    this.weeklySchedule = plan.weeklySchedule;
    this.startDate = plan.startDate;
    this.durationWeeks = plan.durationWeeks;
    this.progressionScheme = plan.progressionScheme;
    this.deloadWeek = plan.deloadWeek;
    this.notes = plan.notes;
    this.isActive = plan.isActive;
    this.createdAt = plan.createdAt;
  }
}
