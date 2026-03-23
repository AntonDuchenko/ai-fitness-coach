import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WeightLogResponseDto {
  @ApiProperty({ example: "clxyz123" })
  id!: string;

  @ApiProperty({ example: 82.5, description: "Weight in kilograms" })
  weight!: number;

  @ApiProperty({ example: "2026-03-23T00:00:00.000Z" })
  date!: string;

  @ApiPropertyOptional({ example: "Morning weight" })
  notes?: string | null;

  @ApiProperty({ example: "2026-03-23T10:30:00.000Z" })
  createdAt!: string;
}
