import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { ExerciseLogDto } from "./exercise-log.dto";

export class CreateWorkoutLogDto {
  @ApiProperty({
    example: "clxyz123",
    description: "Associated workout plan ID",
  })
  @IsString()
  workoutPlanId!: string;

  @ApiProperty({ example: "Upper Push", description: "Name of the workout" })
  @IsString()
  workoutName!: string;

  @ApiProperty({ type: [ExerciseLogDto], description: "Exercises performed" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseLogDto)
  exercises!: ExerciseLogDto[];

  @ApiPropertyOptional({
    example: 55,
    description: "Actual duration in minutes",
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({
    example: 4,
    description: "How the workout felt (1-5)",
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ example: "Great session, hit all sets" })
  @IsString()
  @IsOptional()
  notes?: string;
}
