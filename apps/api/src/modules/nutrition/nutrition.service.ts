import { createHash } from "node:crypto";
import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
  UnprocessableEntityException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { NutritionPlan, UserProfile } from "@prisma/client";
import Redis from "ioredis";
import { PrismaService } from "../../prisma/prisma.service";
import { AiService } from "../ai/ai.service";
import type { ApplySwapDto } from "./dto/apply-swap.dto";
import type { GenerateRecipeDto } from "./dto/generate-recipe.dto";
import { NutritionPlanResponseDto } from "./dto/nutrition-plan-response.dto";
import { RecipeResponseDto } from "./dto/recipe-response.dto";
import type { SwapMealDto } from "./dto/swap-meal.dto";

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

const RECIPE_CACHE_TTL = 3600; // 1 hour in seconds

@Injectable()
export class NutritionService implements OnModuleDestroy {
  private readonly logger = new Logger(NutritionService.name);
  private redis: Redis | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
    private readonly configService: ConfigService,
  ) {}

  onModuleDestroy(): void {
    this.redis?.disconnect();
  }

  private getRedis(): Redis {
    if (!this.redis) {
      const url =
        this.configService.get<string>("redis.url") ?? "redis://localhost:6379";
      this.redis = new Redis(url, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
      });
      this.redis.on("error", (err) => {
        this.logger.warn(
          `Redis connection error (recipe cache): ${err.message}`,
        );
      });
    }
    return this.redis;
  }

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

  async generateRecipe(
    userId: string,
    dto: GenerateRecipeDto,
  ): Promise<RecipeResponseDto> {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        "User profile not found. Complete onboarding first.",
      );
    }

    const cacheKey = this.buildRecipeCacheKey(dto);
    const cached = await this.getCachedRecipe(cacheKey);
    if (cached) {
      this.logger.log(`Recipe cache hit for key ${cacheKey}`);
      return cached;
    }

    const prompt = this.buildRecipeGeneratePrompt(dto, profile);

    this.logger.log(
      `Generating recipe for user ${userId} (${dto.mealType}, ${dto.calories}kcal)`,
    );

    const data = await this.aiService.createJsonCompletion<GeneratedRecipe>(
      [
        {
          role: "system",
          content:
            "You are a certified nutritionist and chef. Generate a single recipe as valid JSON only. No markdown, no explanations outside the JSON structure.",
        },
        { role: "user", content: prompt },
      ],
      {
        model: "gpt-4o-mini",
        temperature: 0.9,
        maxTokens: 2000,
      },
    );

    this.validateRecipeStructure(data);
    this.logMacroAccuracy(dto, data);

    const result = new RecipeResponseDto(data);
    await this.setCachedRecipe(cacheKey, result);

    return result;
  }

  async generateSwapAlternatives(
    userId: string,
    dto: SwapMealDto,
  ): Promise<RecipeResponseDto[]> {
    const plan = await this.getCurrentPlan(userId);
    if (!plan) {
      throw new NotFoundException("No active nutrition plan found.");
    }

    const mealPlan = plan.mealPlan as unknown[];
    if (dto.mealIndex < 0 || dto.mealIndex >= mealPlan.length) {
      throw new UnprocessableEntityException(
        `Invalid mealIndex: ${dto.mealIndex}. Plan has ${mealPlan.length} meals.`,
      );
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        "User profile not found. Complete onboarding first.",
      );
    }

    const prompt = this.buildSwapAlternativesPrompt(dto.currentMeal, profile);

    this.logger.log(
      `Generating swap alternatives for user ${userId}, meal index ${dto.mealIndex} (${dto.currentMeal.name})`,
    );

    const data = await this.aiService.createJsonCompletion<GeneratedRecipeList>(
      [
        {
          role: "system",
          content:
            "You are a certified nutritionist and chef. Generate alternative meal suggestions as valid JSON only. No markdown, no explanations outside the JSON structure.",
        },
        { role: "user", content: prompt },
      ],
      {
        model: "gpt-4o-mini",
        temperature: 0.9,
        maxTokens: 3000,
      },
    );

    this.validateRecipeListStructure(data);

    return data.recipes.map((recipe) => new RecipeResponseDto(recipe));
  }

  async applyMealSwap(
    userId: string,
    dto: ApplySwapDto,
  ): Promise<NutritionPlanResponseDto> {
    const plan = await this.prisma.nutritionPlan.findFirst({
      where: { id: dto.planId, userId },
    });

    if (!plan) {
      throw new NotFoundException("Nutrition plan not found.");
    }

    const mealPlan = plan.mealPlan as unknown[];
    if (dto.mealIndex < 0 || dto.mealIndex >= mealPlan.length) {
      throw new UnprocessableEntityException(
        `Invalid mealIndex: ${dto.mealIndex}. Plan has ${mealPlan.length} meals.`,
      );
    }

    const updatedMealPlan = [...mealPlan];
    updatedMealPlan[dto.mealIndex] = {
      mealType: dto.recipe.mealType,
      name: dto.recipe.name,
      calories: dto.recipe.calories,
      protein: dto.recipe.protein,
      carbs: dto.recipe.carbs,
      fat: dto.recipe.fat,
      ingredients: dto.recipe.ingredients,
      instructions: dto.recipe.instructions,
      prepTime: dto.recipe.prepTime,
      cookTime: dto.recipe.cookTime,
    };

    const updated = await this.prisma.nutritionPlan.update({
      where: { id: dto.planId },
      data: { mealPlan: JSON.parse(JSON.stringify(updatedMealPlan)) },
    });

    this.logger.log(
      `Meal swap applied: plan ${dto.planId}, index ${dto.mealIndex} → "${dto.recipe.name}"`,
    );

    return new NutritionPlanResponseDto(updated);
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
    "proteins": ["200g chicken breast", "2 eggs"],
    "carbs": ["80g oats", "150g rice"],
    "fats": ["15ml olive oil", "30g peanut butter"],
    "vegetables": ["100g broccoli", "1 bell pepper"],
    "dairy": ["300ml milk (2%)"]
  }
}

IMPORTANT for groceryList:
- Sum up the exact amounts from ALL meal ingredients and group them by category.
- Each item must show the TOTAL amount needed across all meals (e.g. if 2 meals use chicken, sum the grams).
- Use metric units (g, ml, pieces) matching the ingredient amounts.
- Do NOT invent quantities or prices — derive totals strictly from the mealPlan ingredients.

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

  private buildSwapAlternativesPrompt(
    currentMeal: SwapMealDto["currentMeal"],
    profile: UserProfile,
  ): string {
    const dietaryRestrictions = Array.isArray(profile.dietaryRestrictions)
      ? (profile.dietaryRestrictions as string[]).join(", ")
      : "None";

    const dislikedFoods = Array.isArray(profile.dislikedFoods)
      ? (profile.dislikedFoods as string[]).join(", ")
      : "None";

    return `Generate 3 alternative ${currentMeal.mealType} meals to swap with the current meal.

Current meal to replace:
- Name: ${currentMeal.name}
- Type: ${currentMeal.mealType}
- Calories: ${currentMeal.calories} kcal
- Protein: ${currentMeal.protein}g
- Carbs: ${currentMeal.carbs}g
- Fat: ${currentMeal.fat}g

User context:
- Goal: ${profile.primaryGoal}
- Dietary restrictions: ${dietaryRestrictions}
- Disliked foods: ${dislikedFoods}
- Cooking level: ${profile.cookingLevel}
- Budget: $${profile.foodBudget}/day

Requirements:
- Each alternative must have SIMILAR macros (within ±15% of the current meal)
- Same meal type (${currentMeal.mealType})
- Respect dietary restrictions and disliked foods
- Appropriate for ${profile.cookingLevel} cooking level
- Different recipes from the current meal
- Include full ingredients and instructions

Return JSON format:
{
  "recipes": [
    {
      "name": "Alternative Name",
      "mealType": "${currentMeal.mealType}",
      "calories": ${currentMeal.calories},
      "protein": ${currentMeal.protein},
      "carbs": ${currentMeal.carbs},
      "fat": ${currentMeal.fat},
      "prepTime": 10,
      "cookTime": 15,
      "difficulty": "easy",
      "servings": 1,
      "ingredients": [
        { "amount": 200, "unit": "g", "name": "ingredient" }
      ],
      "instructions": "Step-by-step instructions..."
    }
  ]
}

Generate exactly 3 alternatives with similar macros.`;
  }

  private validateRecipeListStructure(data: GeneratedRecipeList): void {
    if (!Array.isArray(data.recipes) || data.recipes.length === 0) {
      throw new BadGatewayException(
        "AI generated response missing 'recipes' array.",
      );
    }

    for (const recipe of data.recipes) {
      this.validateRecipeStructure(recipe);
    }
  }

  private validateRecipeStructure(recipe: GeneratedRecipe): void {
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

    if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
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

  private buildRecipeGeneratePrompt(
    dto: GenerateRecipeDto,
    profile: UserProfile,
  ): string {
    const restrictions =
      dto.restrictions?.join(", ") ||
      (Array.isArray(profile.dietaryRestrictions)
        ? (profile.dietaryRestrictions as string[]).join(", ")
        : "None");

    const disliked =
      dto.disliked?.join(", ") ||
      (Array.isArray(profile.dislikedFoods)
        ? (profile.dislikedFoods as string[]).join(", ")
        : "None");

    const cookingLevel = dto.cookingLevel ?? profile.cookingLevel ?? "regular";
    const maxPrepTime = dto.maxPrepTime || 30;

    return `Generate a ${dto.mealType} recipe with these requirements:

Target Macros:
- Calories: ${dto.calories} kcal (±50)
- Protein: ${dto.protein}g (±5g)
- Carbs: ${dto.carbs}g (±10g)
- Fat: ${dto.fat}g (±5g)

Restrictions:
- Dietary: ${restrictions}
- Disliked: ${disliked}
- Cooking level: ${cookingLevel}
- Prep time: <${maxPrepTime} minutes

Return JSON:
{
  "name": "Recipe name",
  "mealType": "${dto.mealType}",
  "servings": 1,
  "prepTime": 10,
  "cookTime": 15,
  "difficulty": "easy",
  "calories": ${dto.calories},
  "protein": ${dto.protein},
  "carbs": ${dto.carbs},
  "fat": ${dto.fat},
  "ingredients": [
    { "amount": 80, "unit": "g", "name": "oats" }
  ],
  "instructions": "Step 1...\\nStep 2..."
}

Generate exactly 1 recipe. Match the target macros as closely as possible.`;
  }

  private logMacroAccuracy(
    dto: GenerateRecipeDto,
    recipe: GeneratedRecipe,
  ): void {
    const checks = [
      { name: "calories", target: dto.calories, actual: recipe.calories },
      { name: "protein", target: dto.protein, actual: recipe.protein },
      { name: "carbs", target: dto.carbs, actual: recipe.carbs },
      { name: "fat", target: dto.fat, actual: recipe.fat },
    ];

    for (const { name, target, actual } of checks) {
      if (target === 0) continue;
      const deviation = Math.abs(actual - target) / target;
      if (deviation > 0.1) {
        this.logger.warn(
          `Recipe '${recipe.name}' ${name} deviation: ${(deviation * 100).toFixed(1)}% (target=${target}, actual=${actual})`,
        );
      }
    }
  }

  private buildRecipeCacheKey(dto: GenerateRecipeDto): string {
    const normalized = {
      mealType: dto.mealType,
      calories: dto.calories,
      protein: dto.protein,
      carbs: dto.carbs,
      fat: dto.fat,
      restrictions: [...(dto.restrictions || [])].sort(),
      disliked: [...(dto.disliked || [])].sort(),
      cookingLevel: dto.cookingLevel || "",
      maxPrepTime: dto.maxPrepTime || 30,
    };
    const hash = createHash("md5")
      .update(JSON.stringify(normalized))
      .digest("hex");
    return `recipe:generate:${hash}`;
  }

  private async getCachedRecipe(
    key: string,
  ): Promise<RecipeResponseDto | null> {
    try {
      const redis = this.getRedis();
      const data = await redis.get(key);
      if (!data) return null;
      const parsed = JSON.parse(data) as GeneratedRecipe;
      return new RecipeResponseDto(parsed);
    } catch {
      this.logger.warn("Redis cache read failed, proceeding without cache");
      return null;
    }
  }

  private async setCachedRecipe(
    key: string,
    recipe: RecipeResponseDto,
  ): Promise<void> {
    try {
      const redis = this.getRedis();
      await redis.set(key, JSON.stringify(recipe), "EX", RECIPE_CACHE_TTL);
    } catch {
      this.logger.warn("Redis cache write failed");
    }
  }
}
