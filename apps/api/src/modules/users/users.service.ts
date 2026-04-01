import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: { select: { onboardingCompleted: true } } },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: { select: { onboardingCompleted: true } } },
    });
  }

  async create(data: { email: string; passwordHash: string; name?: string }) {
    return this.prisma.user.create({ data });
  }

  async updateLastLogin(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }

  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    return new ProfileResponseDto(
      profile as unknown as Partial<ProfileResponseDto>,
    );
  }

  async createProfile(
    userId: string,
    dto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    const bmr = this.calculateBMR(dto.gender, dto.weight, dto.height, dto.age);
    const tdee = this.calculateTDEE(bmr, dto.trainingDaysPerWeek);
    const targetCalories = this.getGoalCalories(tdee, dto.primaryGoal);
    const macros = this.calculateMacros(dto.weight, targetCalories);

    const data = {
      age: dto.age,
      gender: dto.gender,
      height: dto.height,
      weight: dto.weight,
      targetWeight: dto.targetWeight ?? null,
      primaryGoal: dto.primaryGoal,
      secondaryGoals: dto.secondaryGoals,
      fitnessLevel: dto.fitnessLevel,
      nutritionKnowledge: dto.nutritionKnowledge,
      trainingDaysPerWeek: dto.trainingDaysPerWeek,
      sessionDuration: dto.sessionDuration,
      preferredTime: dto.preferredTime,
      trainingLocation: dto.trainingLocation,
      equipment: dto.equipment,
      injuries: dto.injuries ?? null,
      medicalConditions: dto.medicalConditions ?? null,
      medications: dto.medications ?? null,
      dietaryRestrictions: dto.dietaryRestrictions,
      mealsPerDay: dto.mealsPerDay,
      cookingLevel: dto.cookingLevel,
      cuisinePreferences: dto.cuisinePreferences,
      dislikedFoods: dto.dislikedFoods,
      foodBudget: dto.foodBudget,
      motivation: dto.motivation,
      previousAttempts: dto.previousAttempts,
      previousAttemptsDetails: dto.previousAttemptsDetails ?? null,
      biggestChallenges: dto.biggestChallenges,
      bmr,
      tdee,
      targetCalories,
      targetProtein: macros.protein,
      targetFat: macros.fat,
      targetCarbs: macros.carbs,
      onboardingCompleted: false,
    };

    const profile = await this.prisma.userProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });

    return new ProfileResponseDto(
      profile as unknown as Partial<ProfileResponseDto>,
    );
  }

  async setOnboardingComplete(userId: string) {
    return this.prisma.userProfile.update({
      where: { userId },
      data: {
        onboardingCompleted: true,
        onboardingCompletedAt: new Date(),
      },
    });
  }

  async setPlanGenerationJobId(userId: string, jobId: string) {
    return this.prisma.userProfile.update({
      where: { userId },
      data: { planGenerationJobId: jobId },
    });
  }

  async getPlanGenerationJobId(userId: string): Promise<string | null> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { planGenerationJobId: true, onboardingCompleted: true },
    });
    if (!profile) return null;
    if (profile.onboardingCompleted) return null;
    return profile.planGenerationJobId;
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const existing = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!existing) {
      throw new NotFoundException("Profile not found");
    }

    const merged = { ...existing, ...dto };

    const needsRecalc =
      dto.weight !== undefined ||
      dto.height !== undefined ||
      dto.age !== undefined ||
      dto.gender !== undefined ||
      dto.trainingDaysPerWeek !== undefined ||
      dto.primaryGoal !== undefined;

    let calculatedFields = {};
    if (needsRecalc) {
      const bmr = this.calculateBMR(
        merged.gender,
        merged.weight,
        merged.height,
        merged.age,
      );
      const tdee = this.calculateTDEE(bmr, merged.trainingDaysPerWeek);
      const targetCalories = this.getGoalCalories(tdee, merged.primaryGoal);
      const macros = this.calculateMacros(merged.weight, targetCalories);

      calculatedFields = {
        bmr,
        tdee,
        targetCalories,
        targetProtein: macros.protein,
        targetFat: macros.fat,
        targetCarbs: macros.carbs,
      };
    }

    const profile = await this.prisma.userProfile.update({
      where: { userId },
      data: {
        ...dto,
        ...calculatedFields,
      },
    });

    return new ProfileResponseDto(
      profile as unknown as Partial<ProfileResponseDto>,
    );
  }

  calculateBMR(
    gender: string,
    weight: number,
    height: number,
    age: number,
  ): number {
    const base = 10 * weight + 6.25 * height - 5 * age;
    return gender === "male" ? base + 5 : base - 161;
  }

  calculateTDEE(bmr: number, trainingDaysPerWeek: number): number {
    return Math.round(bmr * this.getActivityMultiplier(trainingDaysPerWeek));
  }

  getActivityMultiplier(trainingDays: number): number {
    if (trainingDays <= 0) return 1.2;
    if (trainingDays <= 2) return 1.375;
    if (trainingDays <= 4) return 1.55;
    if (trainingDays <= 6) return 1.725;
    return 1.9;
  }

  getGoalCalories(tdee: number, primaryGoal: string): number {
    switch (primaryGoal) {
      case "weight_loss":
        return tdee - 500;
      case "muscle_gain":
        return tdee + 400;
      case "recomp":
        return tdee - 200;
      case "performance":
        return tdee + 200;
      default:
        return tdee;
    }
  }

  calculateMacros(
    weight: number,
    goalCalories: number,
  ): { protein: number; fat: number; carbs: number } {
    const protein = Math.round(weight * 2.2);
    const fat = Math.round(weight * 1.0);
    const carbs = Math.round((goalCalories - protein * 4 - fat * 9) / 4);

    return { protein, fat, carbs };
  }
}
