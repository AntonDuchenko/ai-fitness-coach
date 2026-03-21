import { ApiProperty } from "@nestjs/swagger";
import { ChatMessageResponseDto } from "./chat-message-response.dto";

export class SendMessageResponseDto {
  @ApiProperty({ type: ChatMessageResponseDto })
  userMessage!: ChatMessageResponseDto;

  @ApiProperty({ type: ChatMessageResponseDto })
  aiMessage!: ChatMessageResponseDto;

  constructor(
    userMessage: ChatMessageResponseDto,
    aiMessage: ChatMessageResponseDto,
  ) {
    this.userMessage = userMessage;
    this.aiMessage = aiMessage;
  }
}
