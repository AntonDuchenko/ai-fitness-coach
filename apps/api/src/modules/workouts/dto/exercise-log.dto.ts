import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { SetLogDto } from "./set-log.dto";

export class ExerciseLogDto {
  @ApiProperty({ example: "Barbell Bench Press" })
  @IsString()
  exerciseName!: string;

  @ApiProperty({ type: [SetLogDto], description: "Sets performed" })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SetLogDto)
  sets!: SetLogDto[];

  @ApiPropertyOptional({ example: "Felt strong today" })
  @IsString()
  @IsOptional()
  notes?: string;
}
