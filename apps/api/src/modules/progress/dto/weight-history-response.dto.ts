import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { WeightLogResponseDto } from "./weight-log-response.dto";

export class WeightHistoryResponseDto {
  @ApiProperty({ type: [WeightLogResponseDto] })
  logs!: WeightLogResponseDto[];

  @ApiPropertyOptional({ example: 85.0, description: "First weight in period" })
  startWeight!: number | null;

  @ApiPropertyOptional({ example: 82.5, description: "Most recent weight" })
  currentWeight!: number | null;

  @ApiPropertyOptional({ example: -2.5, description: "Weight change in kg" })
  change!: number | null;

  @ApiPropertyOptional({ example: -2.94, description: "Change as percentage" })
  changePercent!: number | null;
}
