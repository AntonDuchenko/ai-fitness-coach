import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AiService } from "../ai/ai.service";
import { ContextService } from "../ai/context.service";
import { UsersService } from "../users/users.service";
import { ChatMessageResponseDto } from "./dto/chat-message-response.dto";
import { ChatUsageResponseDto } from "./dto/chat-usage-response.dto";
import { SendMessageResponseDto } from "./dto/send-message-response.dto";

const FREE_TIER_DAILY_LIMIT = 5;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly contextService: ContextService,
    private readonly usersService: UsersService,
  ) {}

  async sendMessage(
    userId: string,
    message: string,
  ): Promise<SendMessageResponseDto> {
    const user = await this.usersService.findById(userId);

    if (!user?.isPremium) {
      const todayCount = await this.checkAndResetDailyLimit(userId);
      if (todayCount >= FREE_TIER_DAILY_LIMIT) {
        throw new ForbiddenException(
          "Daily message limit reached. Upgrade to Premium for unlimited messages.",
        );
      }
    }

    const userMsg = await this.saveMessage(userId, "user", message);

    const context = await this.contextService.buildContext(userId);
    const systemPrompt = this.contextService.buildSystemPrompt(context);
    const model = this.selectModel(message);

    const historyMessages = context.conversationHistory.map((m) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    }));

    const aiResponseContent = await this.aiService.createChatCompletion(
      [
        { role: "system", content: systemPrompt },
        ...historyMessages,
        { role: "user", content: message },
      ],
      { model },
    );

    const aiMsg = await this.saveMessage(
      userId,
      "assistant",
      aiResponseContent,
      { model },
    );

    await this.updateUsageTracking(userId);
    this.contextService.invalidateCache(userId);

    return new SendMessageResponseDto(
      new ChatMessageResponseDto(userMsg),
      new ChatMessageResponseDto(aiMsg),
    );
  }

  async getHistory(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<ChatMessageResponseDto[]> {
    const messages = await this.prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return messages.reverse().map((m) => new ChatMessageResponseDto(m));
  }

  async clearConversation(userId: string): Promise<void> {
    await this.prisma.chatMessage.deleteMany({
      where: { userId },
    });

    this.contextService.invalidateCache(userId);

    this.logger.log(`Conversation cleared for user ${userId}`);
  }

  async getUsage(userId: string): Promise<ChatUsageResponseDto> {
    const todayCount = await this.checkAndResetDailyLimit(userId);
    const user = await this.usersService.findById(userId);
    const isPremium = user?.isPremium ?? false;

    const dailyLimit = isPremium ? -1 : FREE_TIER_DAILY_LIMIT;
    const remaining = isPremium
      ? -1
      : Math.max(0, FREE_TIER_DAILY_LIMIT - todayCount);

    return new ChatUsageResponseDto({
      messagesUsedToday: todayCount,
      dailyLimit,
      isPremium,
      remaining,
    });
  }

  private async checkAndResetDailyLimit(userId: string): Promise<number> {
    const user = await this.usersService.findById(userId);
    if (!user) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const resetAt = new Date(user.messagesResetAt);
    resetAt.setHours(0, 0, 0, 0);

    if (resetAt < today) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { messagesToday: 0, messagesResetAt: new Date() },
      });
      return 0;
    }

    return user.messagesToday;
  }

  private selectModel(message: string): string {
    const isComplex = message.includes("?") && message.length > 100;
    if (isComplex) return "gpt-4o-mini";
    return "gpt-3.5-turbo";
  }

  private async saveMessage(
    userId: string,
    role: string,
    content: string,
    metadata?: { model?: string; tokens?: number; cost?: number },
  ) {
    return this.prisma.chatMessage.create({
      data: {
        userId,
        role,
        content,
        model: metadata?.model,
        tokens: metadata?.tokens,
        cost: metadata?.cost,
      },
    });
  }

  private async updateUsageTracking(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { messagesToday: { increment: 1 } },
    });
  }
}
