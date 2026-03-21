import { ApiProperty } from "@nestjs/swagger";

export class ChatUsageResponseDto {
  @ApiProperty({ example: 3 })
  messagesUsedToday!: number;

  @ApiProperty({ example: 5 })
  dailyLimit!: number;

  @ApiProperty({ example: true })
  isPremium!: boolean;

  @ApiProperty({ example: 2 })
  remaining!: number;

  constructor(partial: Partial<ChatUsageResponseDto>) {
    Object.assign(this, partial);
  }
}
