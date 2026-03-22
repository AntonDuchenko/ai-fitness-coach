import { ApiProperty } from "@nestjs/swagger";
import type { NutritionPlan } from "@prisma/client";

export class NutritionPlanResponseDto {
  @ApiProperty({ example: "clxyz123" })
  id: string;

  @ApiProperty({ example: "Muscle Gain Meal Plan" })
  name: string;

  @ApiProperty({ example: 2500 })
  dailyCalories: number;

  @ApiProperty({ example: 188 })
  proteinGrams: number;

  @ApiProperty({ example: 281 })
  carbsGrams: number;

  @ApiProperty({ example: 69 })
  fatGrams: number;

  @ApiProperty({ example: 4 })
  mealsPerDay: number;

  @ApiProperty({
    description: "Array of meal objects with recipes and ingredients",
    example: [
      {
        mealType: "Breakfast",
        time: "7:00 AM",
        name: "Oatmeal with Protein",
        calories: 700,
        protein: 35,
        carbs: 95,
        fat: 20,
        ingredients: [{ amount: 80, unit: "g", name: "oats" }],
        instructions: "Mix oats with milk, microwave 2min",
        prepTime: 5,
        cookTime: 2,
      },
    ],
  })
  mealPlan: unknown;

  @ApiProperty({
    description: "Categorized grocery/shopping list",
    example: {
      proteins: ["2kg chicken breast - $15"],
      carbs: ["1kg oats - $4"],
      fats: ["1 jar peanut butter - $6"],
      vegetables: ["Broccoli, peppers - $8"],
      dairy: ["4L milk - $5"],
    },
  })
  groceryList: unknown;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: "2026-03-22T12:00:00.000Z" })
  createdAt: Date;

  constructor(plan: NutritionPlan) {
    this.id = plan.id;
    this.name = plan.name;
    this.dailyCalories = plan.dailyCalories;
    this.proteinGrams = plan.proteinGrams;
    this.carbsGrams = plan.carbsGrams;
    this.fatGrams = plan.fatGrams;
    this.mealsPerDay = plan.mealsPerDay;
    this.mealPlan = plan.mealPlan;
    this.groceryList = plan.groceryList;
    this.isActive = plan.isActive;
    this.createdAt = plan.createdAt;
  }
}
