import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ExerciseDto {
  @ApiProperty({ example: "Barbell Bench Press" })
  name: string;

  @ApiProperty({ example: "Chest" })
  muscleGroup: string;

  @ApiProperty({ example: 4 })
  sets: number;

  @ApiProperty({ example: "6-8" })
  reps: string;

  @ApiPropertyOptional({ example: "2-3 min" })
  rest?: string;

  @ApiPropertyOptional({
    example: "Control eccentric, explosive concentric",
  })
  notes?: string;

  @ApiPropertyOptional({
    example: ["Dumbbell Bench Press", "Push-ups"],
  })
  alternatives?: string[];

  constructor(data: Partial<ExerciseDto>) {
    this.name = data.name ?? "";
    this.muscleGroup = data.muscleGroup ?? "";
    this.sets = data.sets ?? 0;
    this.reps = data.reps ?? "";
    this.rest = data.rest;
    this.notes = data.notes;
    this.alternatives = data.alternatives;
  }
}

export class WorkoutDayResponseDto {
  @ApiProperty({ example: "Monday" })
  dayOfWeek: string;

  @ApiProperty({ example: "Upper Push" })
  focus: string;

  @ApiPropertyOptional({ example: 60 })
  duration?: number;

  @ApiProperty({ type: [ExerciseDto] })
  exercises: ExerciseDto[];

  constructor(data: {
    dayOfWeek: string;
    focus: string;
    duration?: number;
    exercises: Partial<ExerciseDto>[];
  }) {
    this.dayOfWeek = data.dayOfWeek;
    this.focus = data.focus;
    this.duration = data.duration;
    this.exercises = (data.exercises ?? []).map((e) => new ExerciseDto(e));
  }
}
