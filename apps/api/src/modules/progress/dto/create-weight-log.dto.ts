import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateWeightLogDto {
  @ApiProperty({ example: 82.5, description: "Weight in kilograms" })
  @IsNumber()
  @Min(0)
  weight!: number;

  @ApiPropertyOptional({
    example: "2026-03-23",
    description: "Date of the log (ISO string). Defaults to today.",
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ example: "Morning weight, before breakfast" })
  @IsString()
  @IsOptional()
  notes?: string;
}
