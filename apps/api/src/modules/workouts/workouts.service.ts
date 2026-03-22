import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import type { UserProfile, WorkoutPlan } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { AiService } from "../ai/ai.service";
import { WorkoutDayResponseDto } from "./dto/workout-day-response.dto";
import { WorkoutPlanResponseDto } from "./dto/workout-plan-response.dto";

interface GeneratedExercise {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest?: string;
  notes?: string;
  alternatives?: string[];
}

interface GeneratedWorkoutDay {
  dayOfWeek: string;
  focus: string;
  duration?: number;
  exercises: GeneratedExercise[];
}

interface GeneratedPlan {
  name: string;
  durationWeeks: number;
  weeklySchedule: GeneratedWorkoutDay[];
  progressionScheme: string;
  deloadWeek?: number;
  notes?: string;
}

@Injectable()
export class WorkoutsService {
  private readonly logger = new Logger(WorkoutsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async generatePlan(userId: string): Promise<WorkoutPlanResponseDto> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        "User profile not found. Complete onboarding first.",
      );
    }

    this.validateProfileForGeneration(profile);

    const prompt = this.buildWorkoutPlanPrompt(profile);

    this.logger.log(`Generating workout plan for user ${userId}`);

    const planData = await this.aiService.createJsonCompletion<GeneratedPlan>(
      [
        {
          role: "system",
          content:
            "You are a certified personal trainer and exercise scientist. Generate workout plans as valid JSON only. No markdown, no explanations outside the JSON structure.",
        },
        { role: "user", content: prompt },
      ],
      {
        model: "gpt-4o",
        temperature: 0.8,
        maxTokens: 4000,
      },
    );

    this.validatePlanStructure(planData, profile.trainingDaysPerWeek);

    await this.prisma.workoutPlan.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    const plan = await this.prisma.workoutPlan.create({
      data: {
        userId,
        name: planData.name,
        weeklySchedule: JSON.parse(JSON.stringify(planData.weeklySchedule)),
        startDate: new Date(),
        durationWeeks: planData.durationWeeks,
        progressionScheme: planData.progressionScheme,
        deloadWeek: planData.deloadWeek ?? null,
        notes: planData.notes ?? null,
        isActive: true,
      },
    });

    this.logger.log(`Workout plan created: ${plan.id} for user ${userId}`);

    return new WorkoutPlanResponseDto(plan);
  }

  async getCurrentPlan(userId: string): Promise<WorkoutPlan | null> {
    return this.prisma.workoutPlan.findFirst({
      where: { userId, isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getActivePlan(userId: string): Promise<WorkoutPlanResponseDto> {
    const plan = await this.getCurrentPlan(userId);

    if (!plan) {
      throw new NotFoundException("No active workout plan found.");
    }

    return new WorkoutPlanResponseDto(plan);
  }

  async getPlanById(
    userId: string,
    planId: string,
  ): Promise<WorkoutPlanResponseDto> {
    const plan = await this.prisma.workoutPlan.findFirst({
      where: { id: planId, userId },
    });

    if (!plan) {
      throw new NotFoundException("Workout plan not found.");
    }

    return new WorkoutPlanResponseDto(plan);
  }

  async getUserPlans(userId: string): Promise<WorkoutPlanResponseDto[]> {
    const plans = await this.prisma.workoutPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return plans.map((plan) => new WorkoutPlanResponseDto(plan));
  }

  async getWorkoutByDay(
    userId: string,
    dayOfWeek: string,
  ): Promise<WorkoutDayResponseDto | null> {
    const plan = await this.getCurrentPlan(userId);
    if (!plan) return null;

    const schedule = plan.weeklySchedule as unknown as GeneratedWorkoutDay[];
    const workout = schedule.find(
      (w) => w.dayOfWeek.toLowerCase() === dayOfWeek.toLowerCase(),
    );

    return workout ? new WorkoutDayResponseDto(workout) : null;
  }

  async getTodaysWorkout(
    userId: string,
  ): Promise<WorkoutDayResponseDto | null> {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return this.getWorkoutByDay(userId, today);
  }

  async regeneratePlan(userId: string): Promise<WorkoutPlanResponseDto> {
    this.logger.log(`Regenerating workout plan for user ${userId}`);
    return this.generatePlan(userId);
  }

  private buildWorkoutPlanPrompt(profile: UserProfile): string {
    const equipment = Array.isArray(profile.equipment)
      ? (profile.equipment as string[]).join(", ")
      : "Bodyweight only";

    return `Generate a personalized workout plan for this user:

Profile:
- Age: ${profile.age}, Gender: ${profile.gender}
- Goal: ${profile.primaryGoal}
- Experience: ${profile.fitnessLevel}
- Training days: ${profile.trainingDaysPerWeek} days/week
- Session duration: ${profile.sessionDuration} minutes
- Equipment: ${equipment}
- Training location: ${profile.trainingLocation}
- Injuries/limitations: ${profile.injuries || "None"}
${profile.medicalConditions ? `- Medical conditions: ${profile.medicalConditions}` : ""}

Requirements:
- Create ${profile.trainingDaysPerWeek}-day split
- Each workout ~${profile.sessionDuration} minutes
- Use only available equipment
- Appropriate for ${profile.fitnessLevel} level
- Progressive overload scheme
- Include warm-up and cool-down

Return JSON format:
{
  "name": "Program name",
  "durationWeeks": 8,
  "weeklySchedule": [
    {
      "dayOfWeek": "Monday",
      "focus": "Upper Push",
      "duration": 60,
      "exercises": [
        {
          "name": "Barbell Bench Press",
          "muscleGroup": "Chest",
          "sets": 4,
          "reps": "6-8",
          "rest": "2-3 min",
          "notes": "Control eccentric, explosive concentric",
          "alternatives": ["Dumbbell Bench Press", "Push-ups"]
        }
      ]
    }
  ],
  "progressionScheme": "Linear progression: +2.5kg when hit top of rep range",
  "deloadWeek": 4,
  "notes": "Additional coach notes"
}

Generate complete plan with all ${profile.trainingDaysPerWeek} days.`;
  }

  private validateProfileForGeneration(profile: UserProfile): void {
    const missing: string[] = [];

    if (!profile.primaryGoal) missing.push("primaryGoal");
    if (!profile.fitnessLevel) missing.push("fitnessLevel");
    if (!profile.trainingDaysPerWeek) missing.push("trainingDaysPerWeek");
    if (!profile.sessionDuration) missing.push("sessionDuration");

    if (missing.length > 0) {
      throw new UnprocessableEntityException(
        `Profile is missing required fields: ${missing.join(", ")}. Complete your profile first.`,
      );
    }
  }

  private validatePlanStructure(
    data: GeneratedPlan,
    expectedDays: number,
  ): void {
    if (!data.name || typeof data.name !== "string") {
      throw new BadGatewayException("AI generated plan missing 'name' field.");
    }

    if (
      !Array.isArray(data.weeklySchedule) ||
      data.weeklySchedule.length === 0
    ) {
      throw new BadGatewayException(
        "AI generated plan missing 'weeklySchedule' array.",
      );
    }

    if (data.weeklySchedule.length !== expectedDays) {
      this.logger.warn(
        `Expected ${expectedDays} days, got ${data.weeklySchedule.length}. Accepting anyway.`,
      );
    }

    for (const day of data.weeklySchedule) {
      if (!day.dayOfWeek || !day.focus) {
        throw new BadGatewayException(
          "AI generated workout day missing 'dayOfWeek' or 'focus'.",
        );
      }

      if (!Array.isArray(day.exercises) || day.exercises.length === 0) {
        throw new BadGatewayException(
          `AI generated day '${day.dayOfWeek}' has no exercises.`,
        );
      }

      for (const exercise of day.exercises) {
        if (!exercise.name || !exercise.muscleGroup) {
          throw new BadGatewayException(
            `Exercise in '${day.dayOfWeek}' missing 'name' or 'muscleGroup'.`,
          );
        }

        if (exercise.sets === undefined || !exercise.reps) {
          throw new BadGatewayException(
            `Exercise '${exercise.name}' missing 'sets' or 'reps'.`,
          );
        }
      }
    }

    if (!data.progressionScheme) {
      throw new BadGatewayException(
        "AI generated plan missing 'progressionScheme'.",
      );
    }
  }
}
