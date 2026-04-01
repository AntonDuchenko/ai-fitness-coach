import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import { ConversationResponseDto } from "./dto/conversation-response.dto";
import { SendMessageResponseDto } from "./dto/send-message-response.dto";
import { SendMessageDto } from "./dto/send-message.dto";

@ApiTags("Chat")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("conversations")
  @ApiOperation({ summary: "List all conversations" })
  @ApiResponse({ status: 200, type: [ConversationResponseDto] })
  async getConversations(
    @Request() req: { user: { id: string } },
  ): Promise<ConversationResponseDto[]> {
    return this.chatService.getConversations(req.user.id);
  }

  @Post("conversations")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new conversation" })
  @ApiResponse({ status: 201, type: ConversationResponseDto })
  async createConversation(
    @Request() req: { user: { id: string } },
  ): Promise<ConversationResponseDto> {
    return this.chatService.createConversation(req.user.id);
  }

  @Delete("conversations/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a conversation" })
  @ApiResponse({ status: 204, description: "Conversation deleted" })
  @ApiResponse({ status: 404, description: "Conversation not found" })
  async deleteConversation(
    @Request() req: { user: { id: string } },
    @Param("id") id: string,
  ): Promise<void> {
    return this.chatService.deleteConversation(req.user.id, id);
  }

  @Post("send")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Send a message and get AI response" })
  @ApiResponse({ status: 201, type: SendMessageResponseDto })
  @ApiResponse({ status: 403, description: "Daily message limit reached" })
  async sendMessage(
    @Request() req: { user: { id: string } },
    @Body() dto: SendMessageDto,
  ): Promise<SendMessageResponseDto> {
    return this.chatService.sendMessage(
      req.user.id,
      dto.message,
      dto.conversationId,
    );
  }

  @Get("history")
  @ApiOperation({ summary: "Get conversation history" })
  @ApiResponse({ status: 200, type: [ChatMessageResponseDto] })
  async getHistory(
    @Request() req: { user: { id: string } },
    @Query() query: ChatHistoryQueryDto,
  ): Promise<ChatMessageResponseDto[]> {
    return this.chatService.getHistory(
      req.user.id,
      query.limit ?? 50,
      query.offset ?? 0,
      query.conversationId,
    );
  }

  @Delete("clear")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Clear conversation history" })
  @ApiResponse({ status: 204, description: "Conversation cleared" })
  async clearConversation(
    @Request() req: { user: { id: string } },
  ): Promise<void> {
    return this.chatService.clearConversation(req.user.id);
  }

  @Get("usage")
  @ApiOperation({ summary: "Get daily message usage" })
  @ApiResponse({ status: 200, type: ChatUsageResponseDto })
  async getUsage(
    @Request() req: { user: { id: string } },
  ): Promise<ChatUsageResponseDto> {
    return this.chatService.getUsage(req.user.id);
  }
}
