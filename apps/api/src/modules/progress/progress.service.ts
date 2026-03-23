import { Injectable, Logger } from "@nestjs/common";
import type { WorkoutLog } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import {
  ConsistencyResponseDto,
  DailyConsistencyDto,
} from "./dto/consistency-response.dto";
import type { CreateWeightLogDto } from "./dto/create-weight-log.dto";
import type { ProgressSummaryResponseDto } from "./dto/progress-summary-response.dto";
import {
  StrengthDataPointDto,
  StrengthProgressResponseDto,
} from "./dto/strength-progress-response.dto";
import {
  VolumeProgressResponseDto,
  WeeklyVolumeDto,
} from "./dto/volume-progress-response.dto";
import type { WeightHistoryResponseDto } from "./dto/weight-history-response.dto";
import type { WeightLogResponseDto } from "./dto/weight-log-response.dto";

interface ExerciseSet {
  weight: number;
  reps: number;
  setNumber?: number;
  rpe?: number;
}

interface ExerciseLog {
  exerciseName: string;
  sets: ExerciseSet[];
  notes?: string;
}

const PERIOD_DAYS: Record<string, number> = {
  "1week": 7,
  "1month": 30,
  "3months": 90,
  "6months": 180,
  "1year": 365,
};

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);

  constructor(private readonly prisma: PrismaService) {}

  // ─── Weight Logging ──────────────────────────────────────

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

  // ─── Strength Analytics ──────────────────────────────────

  async getStrengthProgress(
    userId: string,
    exercise: string,
    period: string,
  ): Promise<StrengthProgressResponseDto> {
    const startDate = this.getStartDate(period);

    const workouts = await this.prisma.workoutLog.findMany({
      where: {
        userId,
        ...(startDate ? { completedAt: { gte: startDate } } : {}),
      },
      orderBy: { completedAt: "asc" },
    });

    const dataPoints: StrengthDataPointDto[] = [];

    for (const workout of workouts) {
      const exercises = this.parseExercises(workout);
      const ex = exercises.find(
        (e) => e.exerciseName.toLowerCase() === exercise.toLowerCase(),
      );
      if (!ex || ex.sets.length === 0) continue;

      const maxWeight = Math.max(...ex.sets.map((s) => s.weight));
      const totalVolume = ex.sets.reduce(
        (sum, s) => sum + s.weight * s.reps,
        0,
      );
      const bestSet = ex.sets.reduce(
        (best, s) => (s.weight > best.weight ? s : best),
        ex.sets[0],
      );

      dataPoints.push(
        new StrengthDataPointDto({
          date: workout.completedAt.toISOString(),
          maxWeight,
          totalVolume,
          bestSet: { weight: bestSet.weight, reps: bestSet.reps },
        }),
      );
    }

    const startMaxWeight =
      dataPoints.length > 0 ? dataPoints[0].maxWeight : null;
    const currentMaxWeight =
      dataPoints.length > 0
        ? dataPoints[dataPoints.length - 1].maxWeight
        : null;

    let improvementKg: number | null = null;
    let improvementPercent: number | null = null;

    if (startMaxWeight !== null && currentMaxWeight !== null) {
      improvementKg =
        Math.round((currentMaxWeight - startMaxWeight) * 100) / 100;
      improvementPercent =
        startMaxWeight > 0
          ? Math.round((improvementKg / startMaxWeight) * 10000) / 100
          : null;
    }

    this.logger.log(
      `Strength progress for "${exercise}": ${dataPoints.length} data points`,
    );

    return new StrengthProgressResponseDto({
      exercise,
      data: dataPoints,
      startMaxWeight,
      currentMaxWeight,
      improvementKg,
      improvementPercent,
    });
  }

  // ─── Volume Analytics ────────────────────────────────────

  async getVolumeProgress(
    userId: string,
    period: string,
  ): Promise<VolumeProgressResponseDto> {
    const startDate = this.getStartDate(period);

    const workouts = await this.prisma.workoutLog.findMany({
      where: {
        userId,
        ...(startDate ? { completedAt: { gte: startDate } } : {}),
      },
      orderBy: { completedAt: "asc" },
    });

    const weeklyMap = new Map<
      string,
      { totalVolume: number; workoutCount: number }
    >();

    for (const workout of workouts) {
      const weekStart = this.getWeekStart(
        new Date(workout.completedAt),
      ).toISOString();
      const exercises = this.parseExercises(workout);

      const workoutVolume = exercises.reduce(
        (sum, ex) =>
          sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0),
        0,
      );

      const existing = weeklyMap.get(weekStart) ?? {
        totalVolume: 0,
        workoutCount: 0,
      };
      weeklyMap.set(weekStart, {
        totalVolume: existing.totalVolume + workoutVolume,
        workoutCount: existing.workoutCount + 1,
      });
    }

    const weeklyData = Array.from(weeklyMap.entries()).map(
      ([weekStart, data]) =>
        new WeeklyVolumeDto({
          weekStart,
          totalVolume: Math.round(data.totalVolume),
          workoutCount: data.workoutCount,
          avgVolumePerWorkout:
            data.workoutCount > 0
              ? Math.round(data.totalVolume / data.workoutCount)
              : 0,
        }),
    );

    const totalVolume = weeklyData.reduce((sum, w) => sum + w.totalVolume, 0);
    const avgWeeklyVolume =
      weeklyData.length > 0 ? Math.round(totalVolume / weeklyData.length) : 0;

    return new VolumeProgressResponseDto({
      weeklyData,
      totalVolume,
      avgWeeklyVolume,
    });
  }

  // ─── Consistency Analytics ───────────────────────────────

  async getConsistency(
    userId: string,
    period: string,
  ): Promise<ConsistencyResponseDto> {
    const startDate = this.getStartDate(period);

    const workouts = await this.prisma.workoutLog.findMany({
      where: {
        userId,
        ...(startDate ? { completedAt: { gte: startDate } } : {}),
      },
      orderBy: { completedAt: "asc" },
    });

    const dailyMap = new Map<
      string,
      { workoutCount: number; totalDuration: number }
    >();

    for (const workout of workouts) {
      const dateKey = this.formatDateKey(new Date(workout.completedAt));
      const existing = dailyMap.get(dateKey) ?? {
        workoutCount: 0,
        totalDuration: 0,
      };
      dailyMap.set(dateKey, {
        workoutCount: existing.workoutCount + 1,
        totalDuration: existing.totalDuration + (workout.duration ?? 0),
      });
    }

    const dailyData = Array.from(dailyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(
        ([date, data]) =>
          new DailyConsistencyDto({
            date: new Date(date).toISOString(),
            workoutCount: data.workoutCount,
            totalDuration: data.totalDuration,
          }),
      );

    const totalWorkouts = workouts.length;

    const periodDays = startDate
      ? Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : dailyData.length > 0
        ? Math.ceil(
            (Date.now() - new Date(dailyData[0].date).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : 1;

    const weeks = Math.max(periodDays / 7, 1);
    const workoutsPerWeek = Math.round((totalWorkouts / weeks) * 100) / 100;

    const uniqueDates = Array.from(dailyMap.keys()).sort((a, b) =>
      b.localeCompare(a),
    );
    const { currentStreak, longestStreak } = this.calculateStreaks(uniqueDates);

    return new ConsistencyResponseDto({
      dailyData,
      totalWorkouts,
      workoutsPerWeek,
      currentStreak,
      bestStreak: longestStreak,
    });
  }

  // ─── Summary ─────────────────────────────────────────────

  async getSummary(userId: string): Promise<ProgressSummaryResponseDto> {
    const [weightHistory, profile, allWorkouts] = await Promise.all([
      this.getWeightHistory(userId, "all"),
      this.prisma.userProfile.findUnique({ where: { userId } }),
      this.prisma.workoutLog.findMany({
        where: { userId },
        orderBy: { completedAt: "desc" },
      }),
    ]);

    // Weight summary
    const weight = {
      startWeight: weightHistory.startWeight,
      currentWeight: weightHistory.currentWeight,
      targetWeight: profile?.targetWeight ?? null,
      change: weightHistory.change,
      changePercent: weightHistory.changePercent,
    };

    // Workout counts
    const now = new Date();
    const weekStart = this.getWeekStart(now);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const thisWeek = allWorkouts.filter(
      (w) => new Date(w.completedAt) >= weekStart,
    ).length;
    const thisMonth = allWorkouts.filter(
      (w) => new Date(w.completedAt) >= monthStart,
    ).length;

    const uniqueDates = [
      ...new Set(
        allWorkouts.map((w) => this.formatDateKey(new Date(w.completedAt))),
      ),
    ].sort((a, b) => b.localeCompare(a));

    const { currentStreak, longestStreak } = this.calculateStreaks(uniqueDates);

    const workouts = {
      totalCompleted: allWorkouts.length,
      thisWeek,
      thisMonth,
      currentStreak,
      bestStreak: longestStreak,
    };

    // Volume comparison (this week vs last week)
    const lastWeekStart = new Date(weekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const thisWeekWorkouts = allWorkouts.filter(
      (w) => new Date(w.completedAt) >= weekStart,
    );
    const lastWeekWorkouts = allWorkouts.filter((w) => {
      const d = new Date(w.completedAt);
      return d >= lastWeekStart && d < weekStart;
    });

    const thisWeekVolume = this.calculateTotalVolume(thisWeekWorkouts);
    const lastWeekVolume = this.calculateTotalVolume(lastWeekWorkouts);

    const volumeChangePercent =
      lastWeekVolume > 0
        ? Math.round(
            ((thisWeekVolume - lastWeekVolume) / lastWeekVolume) * 10000,
          ) / 100
        : null;

    const volume = {
      thisWeekVolume: Math.round(thisWeekVolume),
      lastWeekVolume: Math.round(lastWeekVolume),
      changePercent: volumeChangePercent,
    };

    // Personal records
    const personalRecords = this.calculatePersonalRecords(allWorkouts);

    return { weight, workouts, volume, personalRecords };
  }

  // ─── Private Helpers ─────────────────────────────────────

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

  private getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getUTCDay();
    const diff = day === 0 ? 6 : day - 1; // Monday = 0
    d.setUTCDate(d.getUTCDate() - diff);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }

  private formatDateKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  private parseExercises(workout: WorkoutLog): ExerciseLog[] {
    const exercises = workout.exercises;
    if (!Array.isArray(exercises)) return [];
    return exercises as unknown as ExerciseLog[];
  }

  private calculateTotalVolume(workouts: WorkoutLog[]): number {
    let total = 0;
    for (const workout of workouts) {
      const exercises = this.parseExercises(workout);
      for (const ex of exercises) {
        for (const set of ex.sets) {
          total += set.weight * set.reps;
        }
      }
    }
    return total;
  }

  private calculateStreaks(sortedDatesDesc: string[]): {
    currentStreak: number;
    longestStreak: number;
  } {
    if (sortedDatesDesc.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    const today = new Date();
    const todayStr = this.formatDateKey(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this.formatDateKey(yesterday);

    const isStreakActive =
      sortedDatesDesc[0] === todayStr || sortedDatesDesc[0] === yesterdayStr;

    const streaks: number[] = [];
    let streak = 1;

    for (let i = 1; i < sortedDatesDesc.length; i++) {
      const newer = new Date(sortedDatesDesc[i - 1]);
      const older = new Date(sortedDatesDesc[i]);
      const diffDays = Math.round(
        (newer.getTime() - older.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays <= 2) {
        streak++;
      } else {
        streaks.push(streak);
        streak = 1;
      }
    }
    streaks.push(streak);

    const longestStreak = Math.max(...streaks);
    const currentStreak = isStreakActive ? streaks[0] : 0;

    return { currentStreak, longestStreak };
  }

  private calculatePersonalRecords(workouts: WorkoutLog[]): Array<{
    exerciseName: string;
    maxWeight: number;
    repsAtMax: number;
    achievedAt: string;
  }> {
    const prMap = new Map<
      string,
      { maxWeight: number; repsAtMax: number; achievedAt: Date }
    >();

    for (const workout of workouts) {
      const exercises = this.parseExercises(workout);

      for (const exercise of exercises) {
        for (const set of exercise.sets) {
          const name = exercise.exerciseName;
          const existing = prMap.get(name);

          if (!existing || set.weight > existing.maxWeight) {
            prMap.set(name, {
              maxWeight: set.weight,
              repsAtMax: set.reps,
              achievedAt: workout.completedAt,
            });
          }
        }
      }
    }

    return Array.from(prMap.entries()).map(([exerciseName, data]) => ({
      exerciseName,
      maxWeight: data.maxWeight,
      repsAtMax: data.repsAtMax,
      achievedAt: data.achievedAt.toISOString(),
    }));
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
