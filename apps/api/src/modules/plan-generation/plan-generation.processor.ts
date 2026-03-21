import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import type { Job } from "bull";
import { PrismaService } from "../../prisma/prisma.service";

const GENERATION_STEPS = [
  "Analyzing profile",
  "Calculating optimal macros",
  "Designing workout program",
  "Creating meal plans",
  "Finalizing plan",
];

@Processor("plan-generation")
export class PlanGenerationProcessor {
  private readonly logger = new Logger(PlanGenerationProcessor.name);

  constructor(private readonly prisma: PrismaService) {}

  @Process("generate-plans")
  async handlePlanGeneration(job: Job<{ userId: string }>) {
    const { userId } = job.data;
    this.logger.log(`Starting plan generation for user ${userId}`);

    for (let i = 0; i < GENERATION_STEPS.length; i++) {
      this.logger.debug(`Step ${i + 1}: ${GENERATION_STEPS[i]}`);
      await job.progress(((i + 1) / GENERATION_STEPS.length) * 100);
      // Simulate AI work — will be replaced with real AI generation in Phase 2
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await this.prisma.userProfile.update({
      where: { userId },
      data: {
        onboardingCompleted: true,
        onboardingCompletedAt: new Date(),
      },
    });

    this.logger.log(`Plan generation complete for user ${userId}`);
    return { success: true };
  }
}
