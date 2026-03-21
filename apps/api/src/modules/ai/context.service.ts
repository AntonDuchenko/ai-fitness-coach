import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { NutritionService } from "../nutrition/nutrition.service";
import { WorkoutsService } from "../workouts/workouts.service";
import type { AiContext, CachedContext } from "./types/ai-context.type";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_VERBATIM_MESSAGES = 10;
const MAX_TOKEN_TARGET = 4000;
const CHARS_PER_TOKEN = 4;

@Injectable()
export class ContextService {
  private readonly logger = new Logger(ContextService.name);
  private readonly cache = new Map<string, CachedContext>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly workoutsService: WorkoutsService,
    private readonly nutritionService: NutritionService,
  ) {}

  async buildContext(userId: string): Promise<AiContext> {
    const cached = this.cache.get(userId);
    if (cached && cached.expiresAt > Date.now()) {
      this.logger.debug(`Cache hit for user ${userId}`);
      return cached.data;
    }

    const [
      profile,
      conversationHistory,
      currentWorkoutPlan,
      currentNutritionPlan,
      recentWorkouts,
    ] = await Promise.all([
      this.prisma.userProfile.findUnique({ where: { userId } }),
      this.prisma.chatMessage.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      this.workoutsService.getCurrentPlan(userId),
      this.nutritionService.getCurrentPlan(userId),
      this.prisma.workoutLog.findMany({
        where: { userId },
        orderBy: { completedAt: "desc" },
        take: 5,
        select: {
          workoutName: true,
          exercises: true,
          completedAt: true,
          duration: true,
          rating: true,
        },
      }),
    ]);

    const optimizedHistory = this.optimizeHistory(
      conversationHistory.reverse(),
    );

    const context: AiContext = {
      profile,
      conversationHistory: optimizedHistory,
      workoutPlan: currentWorkoutPlan,
      nutritionPlan: currentNutritionPlan,
      recentWorkouts,
      language: "en",
    };

    this.cache.set(userId, {
      data: context,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    return context;
  }

  buildSystemPrompt(context: AiContext): string {
    const profileSection = context.profile
      ? this.formatProfile(context.profile)
      : "No profile available";

    const workoutSection = context.workoutPlan
      ? `Plan: ${context.workoutPlan.name} (${context.workoutPlan.durationWeeks} weeks, ${context.workoutPlan.progressionScheme})`
      : "Not yet created";

    const nutritionSection = context.nutritionPlan
      ? `Plan: ${context.nutritionPlan.name} — ${context.nutritionPlan.dailyCalories} kcal (P: ${context.nutritionPlan.proteinGrams}g, F: ${context.nutritionPlan.fatGrams}g, C: ${context.nutritionPlan.carbsGrams}g)`
      : "Not yet created";

    const workoutLogsSection =
      context.recentWorkouts.length > 0
        ? context.recentWorkouts.map((w) => this.formatWorkoutLog(w)).join("\n")
        : "No recent workouts";

    const historySection =
      context.conversationHistory.length > 0
        ? context.conversationHistory
            .map((m) => `${m.role}: ${m.content}`)
            .join("\n")
        : "";

    let prompt = `You are a certified personal fitness trainer and nutritionist.

User Profile:
${profileSection}

Current Workout Plan:
${workoutSection}

Current Nutrition Plan:
${nutritionSection}

Recent Workouts:
${workoutLogsSection}

Guidelines:
- Always respond in ${context.language}
- Be supportive but honest
- Provide specific, actionable advice
- Reference user's profile and history
- If medical issue, recommend seeing a doctor
- Use Markdown for formatting
- Keep responses concise (200-400 words) unless detail requested`;

    if (historySection) {
      prompt += `\n\nPrevious conversation:\n${historySection}`;
    }

    prompt = this.truncateToTokenLimit(prompt);

    return prompt;
  }

  invalidateCache(userId: string): void {
    this.cache.delete(userId);
  }

  private optimizeHistory(
    messages: { role: string; content: string }[],
  ): { role: string; content: string }[] {
    if (messages.length <= MAX_VERBATIM_MESSAGES) {
      return messages;
    }

    const olderMessages = messages.slice(0, -MAX_VERBATIM_MESSAGES);
    const recentMessages = messages.slice(-MAX_VERBATIM_MESSAGES);

    const topics = olderMessages
      .filter((m) => m.role === "user")
      .map((m) => m.content.slice(0, 50))
      .join(", ");

    const summary = {
      role: "system",
      content: `[Earlier conversation summary: User discussed ${topics}]`,
    };

    return [summary, ...recentMessages];
  }

  private formatProfile(profile: NonNullable<AiContext["profile"]>): string {
    return [
      `Age: ${profile.age}, Gender: ${profile.gender}`,
      `Height: ${profile.height}cm, Weight: ${profile.weight}kg${profile.targetWeight ? `, Target: ${profile.targetWeight}kg` : ""}`,
      `Goal: ${profile.primaryGoal}, Level: ${profile.fitnessLevel}`,
      `Training: ${profile.trainingDaysPerWeek}x/week, ${profile.sessionDuration}min, ${profile.preferredTime}`,
      `Location: ${profile.trainingLocation}`,
      profile.injuries ? `Injuries: ${profile.injuries}` : null,
      profile.medicalConditions
        ? `Medical: ${profile.medicalConditions}`
        : null,
      profile.tdee
        ? `TDEE: ${profile.tdee} kcal, Target: ${profile.targetCalories} kcal`
        : null,
      profile.targetProtein
        ? `Macros — P: ${profile.targetProtein}g, F: ${profile.targetFat}g, C: ${profile.targetCarbs}g`
        : null,
    ]
      .filter(Boolean)
      .join("\n");
  }

  private formatWorkoutLog(log: AiContext["recentWorkouts"][number]): string {
    const date = log.completedAt.toISOString().split("T")[0];
    const duration = log.duration ? ` (${log.duration}min)` : "";
    const rating = log.rating ? ` — Rating: ${log.rating}/5` : "";
    return `- ${date}: ${log.workoutName}${duration}${rating}`;
  }

  private truncateToTokenLimit(text: string): string {
    const maxChars = MAX_TOKEN_TARGET * CHARS_PER_TOKEN;
    if (text.length <= maxChars) {
      return text;
    }
    return text.slice(0, maxChars);
  }
}
