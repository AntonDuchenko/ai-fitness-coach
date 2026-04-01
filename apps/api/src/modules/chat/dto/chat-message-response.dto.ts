import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ChatMessageResponseDto {
  @ApiProperty({ example: "clxyz123" })
  id!: string;

  @ApiProperty({ enum: ["user", "assistant"], example: "assistant" })
  role!: string;

  @ApiProperty({ example: "Based on your goals, I recommend..." })
  content!: string;

  @ApiPropertyOptional({ example: "clconv123" })
  conversationId?: string | null;

  @ApiPropertyOptional({ example: "gpt-4o" })
  model?: string | null;

  @ApiPropertyOptional({ example: 150 })
  tokens?: number | null;

  @ApiProperty({ example: "2026-03-21T14:00:00.000Z" })
  createdAt!: Date;

  constructor(partial: Partial<ChatMessageResponseDto>) {
    Object.assign(this, partial);
  }
}
