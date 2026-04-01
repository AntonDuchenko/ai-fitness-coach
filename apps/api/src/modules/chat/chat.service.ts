import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { TIER_LIMITS } from "../../common/constants/tier-limits";
import { ForbiddenPremiumException } from "../../common/exceptions/forbidden-premium.exception";
import { PrismaService } from "../../prisma/prisma.service";
import { AiService } from "../ai/ai.service";
import { ContextService } from "../ai/context.service";
import { UsersService } from "../users/users.service";
import { ChatMessageResponseDto } from "./dto/chat-message-response.dto";
import { ChatUsageResponseDto } from "./dto/chat-usage-response.dto";
import { ConversationResponseDto } from "./dto/conversation-response.dto";
import { SendMessageResponseDto } from "./dto/send-message-response.dto";

const FREE_TIER_DAILY_LIMIT = TIER_LIMITS.FREE.CHAT_MESSAGES_PER_DAY;

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
    conversationId?: string,
  ): Promise<SendMessageResponseDto> {
    const user = await this.usersService.findById(userId);

    if (!user?.isPremium) {
      const todayCount = await this.checkAndResetDailyLimit(userId);
      if (todayCount >= FREE_TIER_DAILY_LIMIT) {
        throw new ForbiddenPremiumException(
          "Daily message limit reached. Upgrade to Premium for unlimited messages.",
        );
      }
    }

    const conversation = await this.resolveConversation(
      userId,
      message,
      conversationId,
    );

    const userMsg = await this.saveMessage(
      userId,
      "user",
      message,
      conversation.id,
    );

    const context = await this.contextService.buildContext(
      userId,
      conversation.id,
    );
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
      conversation.id,
      { model },
    );

    await this.updateUsageTracking(userId);
    this.contextService.invalidateCache(userId);

    return new SendMessageResponseDto(
      conversation.id,
      new ChatMessageResponseDto(userMsg),
      new ChatMessageResponseDto(aiMsg),
    );
  }

  async getConversations(userId: string): Promise<ConversationResponseDto[]> {
    const conversations = await this.prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
    return conversations.map((c) => new ConversationResponseDto(c));
  }

  async createConversation(userId: string): Promise<ConversationResponseDto> {
    const conversation = await this.prisma.conversation.create({
      data: { userId },
    });
    return new ConversationResponseDto(conversation);
  }

  async deleteConversation(
    userId: string,
    conversationId: string,
  ): Promise<void> {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id: conversationId, userId },
    });
    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }
    await this.prisma.conversation.delete({
      where: { id: conversationId },
    });
    this.contextService.invalidateCache(userId);
  }

  async getHistory(
    userId: string,
    limit: number,
    offset: number,
    conversationId?: string,
  ): Promise<ChatMessageResponseDto[]> {
    const where: { userId: string; conversationId?: string } = { userId };
    if (conversationId) {
      where.conversationId = conversationId;
    }

    const messages = await this.prisma.chatMessage.findMany({
      where,
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

  async sendWelcomeMessage(userId: string): Promise<void> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    const name = profile
      ? await this.prisma.user
          .findUnique({ where: { id: userId }, select: { name: true } })
          .then((u) => u?.name)
      : null;

    const greeting = name || "there";
    const goal = profile?.primaryGoal?.replace(/_/g, " ") ?? "your goals";
    const days = profile?.trainingDaysPerWeek ?? 3;
    const calories = profile?.targetCalories
      ? Math.round(profile.targetCalories)
      : null;

    const caloriesLine = calories
      ? `\n* **Nutrition plan** with ${calories} calories and balanced macros`
      : "\n* **Personalized nutrition plan** with balanced macros";

    const message = `Hi ${greeting}! 👋

I'm your AI fitness coach, and I've just created personalized workout and nutrition plans for you based on your profile.

Here's what I've prepared:
* **${days}-day workout plan** targeting ${goal}${caloriesLine}
* **24/7 support** - ask me anything!

Ready to start? Check out your plans in the dashboard, or ask me any questions you have!`;

    const conversation = await this.prisma.conversation.create({
      data: { userId, title: "Welcome" },
    });
    await this.saveMessage(userId, "assistant", message, conversation.id);
    this.logger.log(`Welcome message sent for user ${userId}`);
  }

  async sendErrorMessage(userId: string): Promise<void> {
    const message = `Hi there! 👋

I ran into an issue generating your personalized plans. Don't worry — you can try again from your dashboard, or just ask me in the chat and I'll help you get set up!`;

    const conversation = await this.prisma.conversation.create({
      data: { userId, title: "Setup Issue" },
    });
    await this.saveMessage(userId, "assistant", message, conversation.id);
    this.logger.log(`Error notification message sent for user ${userId}`);
  }

  private async resolveConversation(
    userId: string,
    message: string,
    conversationId?: string,
  ) {
    if (conversationId) {
      const existing = await this.prisma.conversation.findFirst({
        where: { id: conversationId, userId },
      });
      if (!existing) {
        throw new NotFoundException("Conversation not found");
      }
      return existing;
    }

    const title = message.length > 50 ? `${message.slice(0, 47)}...` : message;
    return this.prisma.conversation.create({
      data: { userId, title },
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
    conversationId: string,
    metadata?: { model?: string; tokens?: number; cost?: number },
  ) {
    return this.prisma.chatMessage.create({
      data: {
        userId,
        role,
        content,
        conversationId,
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
