import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from "class-validator";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  NOT_SPECIFIED = "not_specified",
}

export enum PrimaryGoal {
  WEIGHT_LOSS = "weight_loss",
  MUSCLE_GAIN = "muscle_gain",
  RECOMP = "recomp",
  HEALTH = "health",
  PERFORMANCE = "performance",
}

export enum FitnessLevel {
  COMPLETE_BEGINNER = "complete_beginner",
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum NutritionKnowledge {
  NONE = "none",
  BASIC = "basic",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum PreferredTime {
  MORNING = "morning",
  MIDDAY = "midday",
  AFTERNOON = "afternoon",
  EVENING = "evening",
  FLEXIBLE = "flexible",
}

export enum TrainingLocation {
  HOME_NONE = "home_none",
  HOME_BASIC = "home_basic",
  HOME_GYM = "home_gym",
  COMMERCIAL_GYM = "commercial_gym",
  OUTDOOR = "outdoor",
}

export enum CookingLevel {
  REGULAR = "regular",
  SOMETIMES = "sometimes",
  RARELY = "rarely",
  NEVER = "never",
}

export class CreateProfileDto {
  // Basic Info
  @ApiProperty({ example: 25, minimum: 16, maximum: 80 })
  @IsInt()
  @Min(16)
  @Max(80)
  age!: number;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ example: 175, description: "Height in cm" })
  @IsNumber()
  @Min(100)
  @Max(250)
  height!: number;

  @ApiProperty({ example: 80, description: "Weight in kg" })
  @IsNumber()
  @Min(30)
  @Max(300)
  weight!: number;

  @ApiPropertyOptional({ example: 75, description: "Target weight in kg" })
  @IsNumber()
  @IsOptional()
  @Min(30)
  @Max(300)
  targetWeight?: number;

  // Goals
  @ApiProperty({ enum: PrimaryGoal, example: PrimaryGoal.MUSCLE_GAIN })
  @IsEnum(PrimaryGoal)
  primaryGoal!: PrimaryGoal;

  @ApiProperty({ example: ["strength", "endurance"], type: [String] })
  @IsArray()
  @IsString({ each: true })
  secondaryGoals!: string[];

  // Experience
  @ApiProperty({ enum: FitnessLevel, example: FitnessLevel.INTERMEDIATE })
  @IsEnum(FitnessLevel)
  fitnessLevel!: FitnessLevel;

  @ApiProperty({
    enum: NutritionKnowledge,
    example: NutritionKnowledge.BASIC,
  })
  @IsEnum(NutritionKnowledge)
  nutritionKnowledge!: NutritionKnowledge;

  // Schedule
  @ApiProperty({ example: 4, minimum: 1, maximum: 7 })
  @IsInt()
  @Min(1)
  @Max(7)
  trainingDaysPerWeek!: number;

  @ApiProperty({ example: 60, description: "Session duration in minutes" })
  @IsInt()
  @Min(15)
  @Max(180)
  sessionDuration!: number;

  @ApiProperty({ enum: PreferredTime, example: PreferredTime.MORNING })
  @IsEnum(PreferredTime)
  preferredTime!: PreferredTime;

  // Equipment & Location
  @ApiProperty({
    enum: TrainingLocation,
    example: TrainingLocation.COMMERCIAL_GYM,
  })
  @IsEnum(TrainingLocation)
  trainingLocation!: TrainingLocation;

  @ApiProperty({
    example: ["dumbbells", "barbell", "pull_up_bar"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  equipment!: string[];

  // Health & Limitations
  @ApiPropertyOptional({ example: "Lower back pain" })
  @IsString()
  @IsOptional()
  injuries?: string;

  @ApiPropertyOptional({ example: "None" })
  @IsString()
  @IsOptional()
  medicalConditions?: string;

  @ApiPropertyOptional({ example: "None" })
  @IsString()
  @IsOptional()
  medications?: string;

  @ApiProperty({ example: [], type: [String] })
  @IsArray()
  @IsString({ each: true })
  dietaryRestrictions!: string[];

  // Nutrition Preferences
  @ApiProperty({ example: 4, minimum: 2, maximum: 6 })
  @IsInt()
  @Min(2)
  @Max(6)
  mealsPerDay!: number;

  @ApiProperty({ enum: CookingLevel, example: CookingLevel.REGULAR })
  @IsEnum(CookingLevel)
  cookingLevel!: CookingLevel;

  @ApiProperty({ example: ["italian", "asian"], type: [String] })
  @IsArray()
  @IsString({ each: true })
  cuisinePreferences!: string[];

  @ApiProperty({ example: ["liver", "olives"], type: [String] })
  @IsArray()
  @IsString({ each: true })
  dislikedFoods!: string[];

  @ApiProperty({ example: 15, description: "Food budget in USD per day" })
  @IsNumber()
  @Min(0)
  foodBudget!: number;

  // Motivation & History
  @ApiProperty({ example: "Want to get in shape for summer" })
  @IsString()
  @MinLength(1)
  motivation!: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  previousAttempts!: boolean;

  @ApiPropertyOptional({ example: "Tried keto for 2 months" })
  @IsString()
  @IsOptional()
  previousAttemptsDetails?: string;

  @ApiProperty({
    example: ["consistency", "nutrition"],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  biggestChallenges!: string[];
}
