import { ApiProperty } from "@nestjs/swagger";
import { ChatMessageResponseDto } from "./chat-message-response.dto";

export class SendMessageResponseDto {
  @ApiProperty({ example: "clconv123" })
  conversationId!: string;

  @ApiProperty({ type: ChatMessageResponseDto })
  userMessage!: ChatMessageResponseDto;

  @ApiProperty({ type: ChatMessageResponseDto })
  aiMessage!: ChatMessageResponseDto;

  constructor(
    conversationId: string,
    userMessage: ChatMessageResponseDto,
    aiMessage: ChatMessageResponseDto,
  ) {
    this.conversationId = conversationId;
    this.userMessage = userMessage;
    this.aiMessage = aiMessage;
  }
}
