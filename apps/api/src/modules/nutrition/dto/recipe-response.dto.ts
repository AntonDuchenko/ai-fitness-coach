import { ApiProperty } from "@nestjs/swagger";

class IngredientDto {
  @ApiProperty({ example: 200 })
  amount!: number;

  @ApiProperty({ example: "g" })
  unit!: string;

  @ApiProperty({ example: "chicken breast" })
  name!: string;
}

export class RecipeResponseDto {
  @ApiProperty({ example: "Grilled Chicken Salad" })
  name: string;

  @ApiProperty({ example: "lunch" })
  mealType: string;

  @ApiProperty({ example: 450 })
  calories: number;

  @ApiProperty({ example: 40 })
  protein: number;

  @ApiProperty({ example: 25 })
  carbs: number;

  @ApiProperty({ example: 20 })
  fat: number;

  @ApiProperty({ example: 10 })
  prepTime: number;

  @ApiProperty({ example: 15 })
  cookTime: number;

  @ApiProperty({ example: "easy" })
  difficulty: string;

  @ApiProperty({ example: 1 })
  servings: number;

  @ApiProperty({
    type: [IngredientDto],
    description: "List of ingredients",
  })
  ingredients: IngredientDto[];

  @ApiProperty({ example: "Season chicken, grill for 6 min each side..." })
  instructions: string;

  constructor(data: {
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
    ingredients: { amount: number; unit: string; name: string }[];
    instructions: string;
  }) {
    this.name = data.name;
    this.mealType = data.mealType;
    this.calories = data.calories;
    this.protein = data.protein;
    this.carbs = data.carbs;
    this.fat = data.fat;
    this.prepTime = data.prepTime;
    this.cookTime = data.cookTime;
    this.difficulty = data.difficulty;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.instructions = data.instructions;
  }
}
