import { ApiProperty } from "@nestjs/swagger";

export class AiHealthResponseDto {
  @ApiProperty({ example: "connected" })
  status!: string;

  @ApiProperty({ example: "gpt-4o" })
  model!: string;

  @ApiProperty({ example: "2026-03-21T12:00:00.000Z" })
  timestamp!: string;

  constructor(partial: Partial<AiHealthResponseDto>) {
    Object.assign(this, partial);
  }
}
