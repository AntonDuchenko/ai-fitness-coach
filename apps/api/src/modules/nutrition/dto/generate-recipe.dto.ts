import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class GenerateRecipeDto {
  @ApiProperty({
    description: "Type of meal to generate",
    enum: ["breakfast", "lunch", "dinner", "snack"],
    example: "lunch",
  })
  @IsIn(["breakfast", "lunch", "dinner", "snack"])
  mealType!: string;

  @ApiProperty({
    description: "Target calories for the recipe",
    example: 600,
    minimum: 100,
    maximum: 5000,
  })
  @IsInt()
  @Min(100)
  @Max(5000)
  calories!: number;

  @ApiProperty({
    description: "Target protein in grams",
    example: 35,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  protein!: number;

  @ApiProperty({
    description: "Target carbs in grams",
    example: 60,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  carbs!: number;

  @ApiProperty({
    description: "Target fat in grams",
    example: 20,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  fat!: number;

  @ApiPropertyOptional({
    description: "Dietary restrictions",
    example: ["vegetarian", "gluten_free"],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  restrictions?: string[];

  @ApiPropertyOptional({
    description: "Disliked foods to avoid",
    example: ["mushrooms", "olives"],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  disliked?: string[];

  @ApiPropertyOptional({
    description: "User cooking skill level",
    enum: ["beginner", "regular", "advanced"],
    example: "regular",
  })
  @IsOptional()
  @IsIn(["beginner", "regular", "advanced"])
  cookingLevel?: string;

  @ApiPropertyOptional({
    description: "Maximum preparation time in minutes",
    example: 30,
    minimum: 5,
    maximum: 120,
  })
  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(120)
  maxPrepTime?: number;
}
