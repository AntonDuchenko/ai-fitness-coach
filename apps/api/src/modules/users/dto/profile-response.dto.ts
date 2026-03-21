import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ProfileResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  userId!: string;

  // Basic Info
  @Expose()
  @ApiProperty()
  age!: number;

  @Expose()
  @ApiProperty()
  gender!: string;

  @Expose()
  @ApiProperty()
  height!: number;

  @Expose()
  @ApiProperty()
  weight!: number;

  @Expose()
  @ApiPropertyOptional()
  targetWeight!: number | null;

  // Goals
  @Expose()
  @ApiProperty()
  primaryGoal!: string;

  @Expose()
  @ApiProperty()
  secondaryGoals!: string[];

  // Experience
  @Expose()
  @ApiProperty()
  fitnessLevel!: string;

  @Expose()
  @ApiProperty()
  nutritionKnowledge!: string;

  // Schedule
  @Expose()
  @ApiProperty()
  trainingDaysPerWeek!: number;

  @Expose()
  @ApiProperty()
  sessionDuration!: number;

  @Expose()
  @ApiProperty()
  preferredTime!: string;

  // Equipment
  @Expose()
  @ApiProperty()
  trainingLocation!: string;

  @Expose()
  @ApiProperty()
  equipment!: string[];

  // Health
  @Expose()
  @ApiPropertyOptional()
  injuries!: string | null;

  @Expose()
  @ApiPropertyOptional()
  medicalConditions!: string | null;

  @Expose()
  @ApiPropertyOptional()
  medications!: string | null;

  @Expose()
  @ApiProperty()
  dietaryRestrictions!: string[];

  // Nutrition
  @Expose()
  @ApiProperty()
  mealsPerDay!: number;

  @Expose()
  @ApiProperty()
  cookingLevel!: string;

  @Expose()
  @ApiProperty()
  cuisinePreferences!: string[];

  @Expose()
  @ApiProperty()
  dislikedFoods!: string[];

  @Expose()
  @ApiProperty()
  foodBudget!: number;

  // Motivation
  @Expose()
  @ApiProperty()
  motivation!: string;

  @Expose()
  @ApiProperty()
  previousAttempts!: boolean;

  @Expose()
  @ApiPropertyOptional()
  previousAttemptsDetails!: string | null;

  @Expose()
  @ApiProperty()
  biggestChallenges!: string[];

  // Calculated values
  @Expose()
  @ApiPropertyOptional()
  tdee!: number | null;

  @Expose()
  @ApiPropertyOptional()
  bmr!: number | null;

  @Expose()
  @ApiPropertyOptional()
  targetCalories!: number | null;

  @Expose()
  @ApiPropertyOptional()
  targetProtein!: number | null;

  @Expose()
  @ApiPropertyOptional()
  targetFat!: number | null;

  @Expose()
  @ApiPropertyOptional()
  targetCarbs!: number | null;

  // Metadata
  @Expose()
  @ApiProperty()
  onboardingCompleted!: boolean;

  @Expose()
  @ApiPropertyOptional()
  onboardingCompletedAt!: Date | null;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<ProfileResponseDto>) {
    Object.assign(this, partial);
  }
}
