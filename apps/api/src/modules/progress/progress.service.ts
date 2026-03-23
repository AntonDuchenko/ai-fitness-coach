import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import type { CreateWeightLogDto } from "./dto/create-weight-log.dto";
import type { WeightHistoryResponseDto } from "./dto/weight-history-response.dto";
import type { WeightLogResponseDto } from "./dto/weight-log-response.dto";

const PERIOD_DAYS: Record<string, number> = {
  "1month": 30,
  "3months": 90,
  "6months": 180,
  "1year": 365,
};

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);

  constructor(private readonly prisma: PrismaService) {}

  async logWeight(
    userId: string,
    dto: CreateWeightLogDto,
  ): Promise<WeightLogResponseDto> {
    const logDate = this.normalizeToStartOfDay(
      dto.date ? new Date(dto.date) : new Date(),
    );

    const dayStart = logDate;
    const dayEnd = new Date(logDate);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

    const existing = await this.prisma.weightLog.findFirst({
      where: {
        userId,
        date: { gte: dayStart, lt: dayEnd },
      },
    });

    const log = existing
      ? await this.prisma.weightLog.update({
          where: { id: existing.id },
          data: { weight: dto.weight, notes: dto.notes ?? existing.notes },
        })
      : await this.prisma.weightLog.create({
          data: {
            userId,
            weight: dto.weight,
            date: logDate,
            notes: dto.notes,
          },
        });

    this.logger.log(
      `Weight logged for user ${userId}: ${dto.weight}kg on ${logDate.toISOString()}`,
    );

    return this.toLogResponse(log);
  }

  async getWeightHistory(
    userId: string,
    period: string,
  ): Promise<WeightHistoryResponseDto> {
    const startDate = this.getStartDate(period);

    const logs = await this.prisma.weightLog.findMany({
      where: {
        userId,
        ...(startDate ? { date: { gte: startDate } } : {}),
      },
      orderBy: { date: "asc" },
    });

    const startWeight = logs[0]?.weight ?? null;
    const currentWeight = logs[logs.length - 1]?.weight ?? null;

    let change: number | null = null;
    let changePercent: number | null = null;

    if (startWeight !== null && currentWeight !== null) {
      change = Math.round((currentWeight - startWeight) * 100) / 100;
      changePercent =
        startWeight > 0
          ? Math.round((change / startWeight) * 10000) / 100
          : null;
    }

    return {
      logs: logs.map((l) => this.toLogResponse(l)),
      startWeight,
      currentWeight,
      change,
      changePercent,
    };
  }

  private normalizeToStartOfDay(date: Date): Date {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }

  private getStartDate(period: string): Date | null {
    const days = PERIOD_DAYS[period];
    if (!days) return null;

    const start = new Date();
    start.setUTCDate(start.getUTCDate() - days);
    start.setUTCHours(0, 0, 0, 0);
    return start;
  }

  private toLogResponse(log: {
    id: string;
    weight: number;
    date: Date;
    notes: string | null;
    createdAt: Date;
  }): WeightLogResponseDto {
    return {
      id: log.id,
      weight: log.weight,
      date: log.date.toISOString(),
      notes: log.notes,
      createdAt: log.createdAt.toISOString(),
    };
  }
}
