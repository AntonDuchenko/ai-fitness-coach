import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ChatService } from "./chat.service";
import { ChatHistoryQueryDto } from "./dto/chat-history-query.dto";
import { ChatMessageResponseDto } from "./dto/chat-message-response.dto";
import { ChatUsageResponseDto } from "./dto/chat-usage-response.dto";
import { SendMessageResponseDto } from "./dto/send-message-response.dto";
import { SendMessageDto } from "./dto/send-message.dto";

@ApiTags("Chat")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("send")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Send a message and get AI response" })
  @ApiResponse({ status: 201, type: SendMessageResponseDto })
  @ApiResponse({ status: 403, description: "Daily message limit reached" })
  async sendMessage(
    @Request() req: { user: { sub: string } },
    @Body() dto: SendMessageDto,
  ): Promise<SendMessageResponseDto> {
    return this.chatService.sendMessage(req.user.sub, dto.message);
  }

  @Get("history")
  @ApiOperation({ summary: "Get conversation history" })
  @ApiResponse({ status: 200, type: [ChatMessageResponseDto] })
  async getHistory(
    @Request() req: { user: { sub: string } },
    @Query() query: ChatHistoryQueryDto,
  ): Promise<ChatMessageResponseDto[]> {
    return this.chatService.getHistory(
      req.user.sub,
      query.limit ?? 50,
      query.offset ?? 0,
    );
  }

  @Delete("clear")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Clear conversation history" })
  @ApiResponse({ status: 204, description: "Conversation cleared" })
  async clearConversation(
    @Request() req: { user: { sub: string } },
  ): Promise<void> {
    return this.chatService.clearConversation(req.user.sub);
  }

  @Get("usage")
  @ApiOperation({ summary: "Get daily message usage" })
  @ApiResponse({ status: 200, type: ChatUsageResponseDto })
  async getUsage(
    @Request() req: { user: { sub: string } },
  ): Promise<ChatUsageResponseDto> {
    return this.chatService.getUsage(req.user.sub);
  }
}
