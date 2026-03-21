import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import type { Queue } from "bull";

export interface PlanGenerationStatus {
  status: "pending" | "processing" | "complete" | "failed";
  progress: number;
}

const QUEUE_TIMEOUT_MS = 3000;

@Injectable()
export class PlanGenerationService {
  private readonly logger = new Logger(PlanGenerationService.name);

  constructor(@InjectQueue("plan-generation") private readonly queue: Queue) {}

  async triggerPlanGeneration(userId: string): Promise<string> {
    const job = await Promise.race([
      this.queue.add("generate-plans", { userId }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Redis queue timeout")),
          QUEUE_TIMEOUT_MS,
        ),
      ),
    ]);
    this.logger.log(`Queued plan generation job ${job.id} for user ${userId}`);
    return String(job.id);
  }

  async getJobStatus(jobId: string): Promise<PlanGenerationStatus> {
    const job = await Promise.race([
      this.queue.getJob(jobId),
      new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), QUEUE_TIMEOUT_MS),
      ),
    ]);

    if (!job) {
      return { status: "complete", progress: 100 };
    }

    const state = await job.getState();
    const progress = typeof job.progress() === "number" ? job.progress() : 0;

    switch (state) {
      case "completed":
        return { status: "complete", progress: 100 };
      case "failed":
        return { status: "failed", progress: progress as number };
      case "active":
        return { status: "processing", progress: progress as number };
      default:
        return { status: "pending", progress: 0 };
    }
  }
}
