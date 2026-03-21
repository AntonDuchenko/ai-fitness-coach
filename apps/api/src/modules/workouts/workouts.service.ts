import { Injectable } from "@nestjs/common";
import { WorkoutPlan } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentPlan(userId: string): Promise<WorkoutPlan | null> {
    return this.prisma.workoutPlan.findFirst({
      where: { userId, isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
