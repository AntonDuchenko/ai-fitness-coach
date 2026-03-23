export type NutritionMealIngredient = {
  amount: number;
  unit: string;
  name: string;
};

export type NutritionMeal = {
  mealType: string;
  time?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: NutritionMealIngredient[];
  instructions?: string;
  prepTime?: number;
  cookTime?: number;
  difficulty?: string;
  servings?: number;
};

export type NutritionPlan = {
  id: string;
  name: string;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealsPerDay: number;
  mealPlan: NutritionMeal[];
  groceryList: Record<string, string[]>;
  isActive: boolean;
  createdAt: string;
};

export type NutritionRecipeIngredient = NutritionMealIngredient;

export type NutritionRecipe = {
  name: string;
  mealType: string; // expected: breakfast|lunch|dinner|snack (lowercase)
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  servings: number;
  ingredients: NutritionRecipeIngredient[];
  instructions: string;
};

export type NutritionTab = "mealPlan" | "groceryList" | "recipes";
