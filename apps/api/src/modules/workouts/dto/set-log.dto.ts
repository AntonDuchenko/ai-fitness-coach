import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";

export class SetLogDto {
  @ApiProperty({ example: 1, description: "Set number in the exercise" })
  @IsInt()
  setNumber!: number;

  @ApiProperty({ example: 80, description: "Weight in kg" })
  @IsNumber()
  weight!: number;

  @ApiProperty({ example: 8, description: "Number of reps completed" })
  @IsInt()
  reps!: number;

  @ApiPropertyOptional({
    example: 7,
    description: "Rate of Perceived Exertion (1-10)",
  })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  rpe?: number;
}
