import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ConversationResponseDto {
  @ApiProperty({ example: "clxyz123" })
  id!: string;

  @ApiPropertyOptional({ example: "Workout advice" })
  title?: string | null;

  @ApiProperty({ example: "2026-03-21T14:00:00.000Z" })
  createdAt!: Date;

  @ApiProperty({ example: "2026-03-21T14:30:00.000Z" })
  updatedAt!: Date;

  constructor(partial: Partial<ConversationResponseDto>) {
    Object.assign(this, partial);
  }
}
