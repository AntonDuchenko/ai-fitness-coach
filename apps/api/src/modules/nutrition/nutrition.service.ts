import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import type { NutritionPlan, UserProfile } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { AiService } from "../ai/ai.service";
import { NutritionPlanResponseDto } from "./dto/nutrition-plan-response.dto";
import { RecipeResponseDto } from "./dto/recipe-response.dto";

interface GeneratedIngredient {
  amount: number;
  unit: string;
  name: string;
}

interface GeneratedMeal {
  mealType: string;
  time?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: GeneratedIngredient[];
  instructions?: string;
  prepTime?: number;
  cookTime?: number;
}

interface GeneratedGroceryList {
  [category: string]: string[];
}

interface GeneratedNutritionPlan {
  name: string;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealsPerDay: number;
  mealPlan: GeneratedMeal[];
  groceryList: GeneratedGroceryList;
}

interface GeneratedRecipe {
  name: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  servings: number;
  ingredients: GeneratedIngredient[];
  instructions: string;
}

interface GeneratedRecipeList {
  recipes: GeneratedRecipe[];
}

interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

@Injectable()
export class NutritionService {
  private readonly logger = new Logger(NutritionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async generatePlan(userId: string): Promise<NutritionPlanResponseDto> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        "User profile not found. Complete onboarding first.",
      );
    }

    this.validateProfileForGeneration(profile);

    const { bmr, tdee, targetCalories } = this.calculateTDEE(profile);
    const macros = this.calculateMacros(profile.primaryGoal, targetCalories);
    const prompt = this.buildNutritionPlanPrompt(
      profile,
      targetCalories,
      macros,
    );

    this.logger.log(`Generating nutrition plan for user ${userId}`);

    const planData =
      await this.aiService.createJsonCompletion<GeneratedNutritionPlan>(
        [
          {
            role: "system",
            content:
              "You are a certified nutritionist and dietitian. Generate meal plans as valid JSON only. No markdown, no explanations outside the JSON structure.",
          },
          { role: "user", content: prompt },
        ],
        {
          model: "gpt-4o",
          temperature: 0.8,
          maxTokens: 4000,
        },
      );

    this.validatePlanStructure(planData, profile.mealsPerDay);

    await this.prisma.nutritionPlan.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    const plan = await this.prisma.nutritionPlan.create({
      data: {
        userId,
        name: planData.name,
        dailyCalories: targetCalories,
        proteinGrams: macros.protein,
        carbsGrams: macros.carbs,
        fatGrams: macros.fat,
        mealsPerDay: profile.mealsPerDay,
        mealPlan: JSON.parse(JSON.stringify(planData.mealPlan)),
        groceryList: JSON.parse(JSON.stringify(planData.groceryList)),
        isActive: true,
      },
    });

    await this.prisma.userProfile.update({
      where: { userId },
      data: {
        tdee,
        bmr,
        targetCalories,
        targetProtein: macros.protein,
        targetCarbs: macros.carbs,
        targetFat: macros.fat,
      },
    });

    this.logger.log(`Nutrition plan created: ${plan.id} for user ${userId}`);

    return new NutritionPlanResponseDto(plan);
  }

  async getCurrentPlan(userId: string): Promise<NutritionPlan | null> {
    return this.prisma.nutritionPlan.findFirst({
      where: { userId, isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getActivePlan(userId: string): Promise<NutritionPlanResponseDto> {
    const plan = await this.getCurrentPlan(userId);

    if (!plan) {
      throw new NotFoundException("No active nutrition plan found.");
    }

    return new NutritionPlanResponseDto(plan);
  }

  async getPlanById(
    userId: string,
    planId: string,
  ): Promise<NutritionPlanResponseDto> {
    const plan = await this.prisma.nutritionPlan.findFirst({
      where: { id: planId, userId },
    });

    if (!plan) {
      throw new NotFoundException("Nutrition plan not found.");
    }

    return new NutritionPlanResponseDto(plan);
  }

  async getUserPlans(userId: string): Promise<NutritionPlanResponseDto[]> {
    const plans = await this.prisma.nutritionPlan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return plans.map((plan) => new NutritionPlanResponseDto(plan));
  }

  async regeneratePlan(userId: string): Promise<NutritionPlanResponseDto> {
    this.logger.log(`Regenerating nutrition plan for user ${userId}`);
    return this.generatePlan(userId);
  }

  async searchRecipes(
    userId: string,
    search?: string,
    type?: string,
  ): Promise<RecipeResponseDto[]> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        "User profile not found. Complete onboarding first.",
      );
    }

    const prompt = this.buildRecipeSearchPrompt(profile, search, type);

    this.logger.log(
      `Searching recipes for user ${userId} (search="${search ?? ""}", type="${type ?? ""}")`,
    );

    const data = await this.aiService.createJsonCompletion<GeneratedRecipeList>(
      [
        {
          role: "system",
          content:
            "You are a certified nutritionist and chef. Generate recipe suggestions as valid JSON only. No markdown, no explanations outside the JSON structure.",
        },
        { role: "user", content: prompt },
      ],
      {
        model: "gpt-4o",
        temperature: 0.9,
        maxTokens: 3000,
      },
    );

    this.validateRecipeListStructure(data);

    return data.recipes.map((recipe) => new RecipeResponseDto(recipe));
  }

  calculateTDEE(profile: UserProfile): {
    bmr: number;
    tdee: number;
    targetCalories: number;
  } {
    const baseBmr =
      10 * profile.weight + 6.25 * profile.height - 5 * profile.age;

    let bmr: number;
    if (profile.gender === "male") {
      bmr = baseBmr + 5;
    } else if (profile.gender === "female") {
      bmr = baseBmr - 161;
    } else {
      bmr = baseBmr + (5 + -161) / 2; // average
    }

    const activityMultiplier = this.getActivityMultiplier(
      profile.trainingDaysPerWeek,
    );
    const tdee = Math.round(bmr * activityMultiplier);

    const goalAdjustment = this.getGoalAdjustment(profile.primaryGoal);
    const targetCalories = Math.round(tdee + goalAdjustment);

    return { bmr: Math.round(bmr), tdee, targetCalories };
  }

  private calculateMacros(goal: string, calories: number): Macros {
    let proteinPct: number;
    let carbsPct: number;
    let fatPct: number;

    switch (goal) {
      case "weight_loss":
        proteinPct = 0.4;
        carbsPct = 0.3;
        fatPct = 0.3;
        break;
      case "muscle_gain":
        proteinPct = 0.3;
        carbsPct = 0.45;
        fatPct = 0.25;
        break;
      default:
        proteinPct = 0.3;
        carbsPct = 0.4;
        fatPct = 0.3;
        break;
    }

    return {
      protein: Math.round((calories * proteinPct) / 4),
      carbs: Math.round((calories * carbsPct) / 4),
      fat: Math.round((calories * fatPct) / 9),
    };
  }

  private getActivityMultiplier(trainingDaysPerWeek: number): number {
    if (trainingDaysPerWeek <= 1) return 1.2;
    if (trainingDaysPerWeek <= 3) return 1.375;
    if (trainingDaysPerWeek <= 5) return 1.55;
    return 1.725;
  }

  private getGoalAdjustment(goal: string): number {
    switch (goal) {
      case "weight_loss":
        return -500;
      case "muscle_gain":
        return 300;
      default:
        return 0;
    }
  }

  private buildNutritionPlanPrompt(
    profile: UserProfile,
    calories: number,
    macros: Macros,
  ): string {
    const dietaryRestrictions = Array.isArray(profile.dietaryRestrictions)
      ? (profile.dietaryRestrictions as string[]).join(", ")
      : "None";

    const cuisinePreferences = Array.isArray(profile.cuisinePreferences)
      ? (profile.cuisinePreferences as string[]).join(", ")
      : "Any";

    const dislikedFoods = Array.isArray(profile.dislikedFoods)
      ? (profile.dislikedFoods as string[]).join(", ")
      : "None";

    return `Generate a personalized nutrition plan for this user:

Profile:
- Goal: ${profile.primaryGoal}
- Current weight: ${profile.weight}kg
- Meals per day: ${profile.mealsPerDay}
- Dietary restrictions: ${dietaryRestrictions || "None"}
- Cooking level: ${profile.cookingLevel}
- Cuisine preferences: ${cuisinePreferences || "Any"}
- Disliked foods: ${dislikedFoods || "None"}
- Budget: $${profile.foodBudget}/day

Daily Targets:
- Calories: ${calories} kcal
- Protein: ${macros.protein}g
- Carbs: ${macros.carbs}g
- Fat: ${macros.fat}g

Requirements:
- Create ${profile.mealsPerDay} meals
- Respect dietary restrictions
- Simple recipes (${profile.cookingLevel} cook)
- Stay within budget
- Hit macro targets (±5%)

Return JSON format:
{
  "name": "Plan name",
  "dailyCalories": ${calories},
  "proteinGrams": ${macros.protein},
  "carbsGrams": ${macros.carbs},
  "fatGrams": ${macros.fat},
  "mealsPerDay": ${profile.mealsPerDay},
  "mealPlan": [
    {
      "mealType": "Breakfast",
      "time": "7:00 AM",
      "name": "Oatmeal with Protein",
      "calories": 700,
      "protein": 35,
      "carbs": 95,
      "fat": 20,
      "ingredients": [
        { "amount": 80, "unit": "g", "name": "oats" },
        { "amount": 300, "unit": "ml", "name": "milk (2%)" }
      ],
      "instructions": "Mix oats with milk, microwave 2min...",
      "prepTime": 5,
      "cookTime": 2
    }
  ],
  "groceryList": {
    "proteins": ["2kg chicken breast - $15"],
    "carbs": ["1kg oats - $4"],
    "fats": ["1 jar peanut butter - $6"],
    "vegetables": ["Broccoli, peppers - $8"],
    "dairy": ["4L milk - $5"]
  }
}

Generate complete daily plan with all ${profile.mealsPerDay} meals.`;
  }

  private validateProfileForGeneration(profile: UserProfile): void {
    const missing: string[] = [];

    if (!profile.primaryGoal) missing.push("primaryGoal");
    if (!profile.mealsPerDay) missing.push("mealsPerDay");
    if (!profile.weight) missing.push("weight");
    if (!profile.height) missing.push("height");
    if (!profile.age) missing.push("age");
    if (!profile.gender) missing.push("gender");

    if (missing.length > 0) {
      throw new UnprocessableEntityException(
        `Profile is missing required fields: ${missing.join(", ")}. Complete your profile first.`,
      );
    }
  }

  private validatePlanStructure(
    data: GeneratedNutritionPlan,
    expectedMeals: number,
  ): void {
    if (!data.name || typeof data.name !== "string") {
      throw new BadGatewayException("AI generated plan missing 'name' field.");
    }

    if (!Array.isArray(data.mealPlan) || data.mealPlan.length === 0) {
      throw new BadGatewayException(
        "AI generated plan missing 'mealPlan' array.",
      );
    }

    if (data.mealPlan.length !== expectedMeals) {
      this.logger.warn(
        `Expected ${expectedMeals} meals, got ${data.mealPlan.length}. Accepting anyway.`,
      );
    }

    for (const meal of data.mealPlan) {
      if (!meal.mealType || !meal.name) {
        throw new BadGatewayException(
          "AI generated meal missing 'mealType' or 'name'.",
        );
      }

      if (
        meal.calories === undefined ||
        meal.protein === undefined ||
        meal.carbs === undefined ||
        meal.fat === undefined
      ) {
        throw new BadGatewayException(
          `Meal '${meal.name}' missing macro information.`,
        );
      }

      if (!Array.isArray(meal.ingredients) || meal.ingredients.length === 0) {
        throw new BadGatewayException(
          `Meal '${meal.name}' missing ingredients.`,
        );
      }
    }

    if (
      !data.groceryList ||
      typeof data.groceryList !== "object" ||
      Array.isArray(data.groceryList)
    ) {
      throw new BadGatewayException(
        "AI generated plan missing 'groceryList' object.",
      );
    }
  }

  private buildRecipeSearchPrompt(
    profile: UserProfile,
    search?: string,
    type?: string,
  ): string {
    const dietaryRestrictions = Array.isArray(profile.dietaryRestrictions)
      ? (profile.dietaryRestrictions as string[]).join(", ")
      : "None";

    const dislikedFoods = Array.isArray(profile.dislikedFoods)
      ? (profile.dislikedFoods as string[]).join(", ")
      : "None";

    const searchClause = search
      ? `The recipes should match this search: "${search}".`
      : "Generate diverse recipe suggestions.";

    const typeClause = type
      ? `All recipes must be suitable for: ${type}.`
      : "Include a mix of meal types (breakfast, lunch, dinner, snack).";

    return `Generate 3 recipe suggestions for this user:

User context:
- Goal: ${profile.primaryGoal}
- Dietary restrictions: ${dietaryRestrictions}
- Disliked foods: ${dislikedFoods}
- Cooking level: ${profile.cookingLevel}
- Budget: $${profile.foodBudget}/day

${searchClause}
${typeClause}

Requirements:
- Respect dietary restrictions and disliked foods
- Appropriate for ${profile.cookingLevel} cooking level
- Include full macro information
- Simple, actionable instructions

Return JSON format:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "mealType": "lunch",
      "calories": 450,
      "protein": 35,
      "carbs": 40,
      "fat": 15,
      "prepTime": 10,
      "cookTime": 15,
      "difficulty": "easy",
      "servings": 1,
      "ingredients": [
        { "amount": 200, "unit": "g", "name": "chicken breast" }
      ],
      "instructions": "Step-by-step instructions..."
    }
  ]
}

Generate exactly 3 recipes.`;
  }

  private validateRecipeListStructure(data: GeneratedRecipeList): void {
    if (!Array.isArray(data.recipes) || data.recipes.length === 0) {
      throw new BadGatewayException(
        "AI generated response missing 'recipes' array.",
      );
    }

    for (const recipe of data.recipes) {
      if (!recipe.name || typeof recipe.name !== "string") {
        throw new BadGatewayException("AI generated recipe missing 'name'.");
      }

      if (
        recipe.calories === undefined ||
        recipe.protein === undefined ||
        recipe.carbs === undefined ||
        recipe.fat === undefined
      ) {
        throw new BadGatewayException(
          `Recipe '${recipe.name}' missing macro information.`,
        );
      }

      if (
        !Array.isArray(recipe.ingredients) ||
        recipe.ingredients.length === 0
      ) {
        throw new BadGatewayException(
          `Recipe '${recipe.name}' missing ingredients.`,
        );
      }

      if (!recipe.instructions) {
        throw new BadGatewayException(
          `Recipe '${recipe.name}' missing instructions.`,
        );
      }
    }
  }
}
