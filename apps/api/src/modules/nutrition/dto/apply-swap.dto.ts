import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

class SwapIngredientDto {
  @ApiProperty({ example: 200 })
  @IsInt()
  @Min(0)
  amount!: number;

  @ApiProperty({ example: "g" })
  @IsString()
  unit!: string;

  @ApiProperty({ example: "chicken breast" })
  @IsString()
  name!: string;
}

class SwapRecipeDto {
  @ApiProperty({ example: "Grilled Chicken Salad" })
  @IsString()
  name!: string;

  @ApiProperty({ example: "lunch" })
  @IsString()
  mealType!: string;

  @ApiProperty({ example: 450 })
  @IsInt()
  @Min(0)
  calories!: number;

  @ApiProperty({ example: 35 })
  @IsInt()
  @Min(0)
  protein!: number;

  @ApiProperty({ example: 40 })
  @IsInt()
  @Min(0)
  carbs!: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(0)
  fat!: number;

  @ApiProperty({ type: [SwapIngredientDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SwapIngredientDto)
  ingredients!: SwapIngredientDto[];

  @ApiProperty({ example: "Season chicken, grill 6 min each side..." })
  @IsString()
  instructions!: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  prepTime?: number;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsInt()
  @Min(0)
  cookTime?: number;
}

export class ApplySwapDto {
  @ApiProperty({ description: "Nutrition plan ID", example: "clxyz123" })
  @IsString()
  planId!: string;

  @ApiProperty({
    description: "Index of the meal to replace",
    example: 0,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  mealIndex!: number;

  @ApiProperty({
    description: "The chosen alternative recipe to swap in",
    type: SwapRecipeDto,
  })
  @ValidateNested()
  @Type(() => SwapRecipeDto)
  recipe!: SwapRecipeDto;
}
