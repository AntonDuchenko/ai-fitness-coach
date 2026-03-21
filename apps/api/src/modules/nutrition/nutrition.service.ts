import { Injectable } from "@nestjs/common";
import { NutritionPlan } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class NutritionService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentPlan(userId: string): Promise<NutritionPlan | null> {
    return this.prisma.nutritionPlan.findFirst({
      where: { userId, isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
