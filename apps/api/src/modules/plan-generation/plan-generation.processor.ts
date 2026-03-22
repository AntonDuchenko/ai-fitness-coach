import { OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import type { Job } from "bull";
import { ChatService } from "../chat/chat.service";
import { NutritionService } from "../nutrition/nutrition.service";
import { UsersService } from "../users/users.service";
import { WorkoutsService } from "../workouts/workouts.service";

@Processor("plan-generation")
export class PlanGenerationProcessor {
  private readonly logger = new Logger(PlanGenerationProcessor.name);

  constructor(
    private readonly workoutsService: WorkoutsService,
    private readonly nutritionService: NutritionService,
    private readonly chatService: ChatService,
    private readonly usersService: UsersService,
  ) {}

  @Process("generate-plans")
  async handlePlanGeneration(job: Job<{ userId: string }>) {
    const { userId } = job.data;
    this.logger.log(`Starting plan generation for user ${userId}`);

    await job.progress(10);

    this.logger.log(`Generating workout plan for user ${userId}`);
    await this.workoutsService.generatePlan(userId);
    await job.progress(30);

    this.logger.log(`Generating nutrition plan for user ${userId}`);
    await this.nutritionService.generatePlan(userId);
    await job.progress(60);

    this.logger.log(`Sending welcome message for user ${userId}`);
    await this.chatService.sendWelcomeMessage(userId);
    await job.progress(90);

    await this.usersService.setOnboardingComplete(userId);
    await job.progress(100);

    this.logger.log(`Plan generation complete for user ${userId}`);
    return { success: true };
  }

  @OnQueueFailed()
  async handleFailure(job: Job<{ userId: string }>, error: Error) {
    const { userId } = job.data;
    const attemptsMade = job.attemptsMade;
    const maxAttempts = (job.opts?.attempts as number) ?? 1;

    this.logger.error(
      `Plan generation failed for user ${userId} (attempt ${attemptsMade}/${maxAttempts}): ${error.message}`,
      error.stack,
    );

    if (attemptsMade >= maxAttempts) {
      this.logger.error(
        `All ${maxAttempts} retries exhausted for user ${userId}. Sending error notification.`,
      );

      try {
        await this.chatService.sendErrorMessage(userId);
      } catch (notifyError) {
        this.logger.error(
          `Failed to send error notification for user ${userId}: ${(notifyError as Error).message}`,
        );
      }
    }
  }
}
