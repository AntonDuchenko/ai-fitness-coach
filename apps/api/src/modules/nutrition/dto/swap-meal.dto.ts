import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString, Min, ValidateNested } from "class-validator";

class CurrentMealDto {
  @ApiProperty({ example: "Oatmeal with Protein" })
  @IsString()
  name!: string;

  @ApiProperty({ example: "Breakfast" })
  @IsString()
  mealType!: string;

  @ApiProperty({ example: 700 })
  @IsInt()
  @Min(0)
  calories!: number;

  @ApiProperty({ example: 35 })
  @IsInt()
  @Min(0)
  protein!: number;

  @ApiProperty({ example: 95 })
  @IsInt()
  @Min(0)
  carbs!: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(0)
  fat!: number;
}

export class SwapMealDto {
  @ApiProperty({
    description: "Index of the meal in the mealPlan array to swap",
    example: 0,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  mealIndex!: number;

  @ApiProperty({
    description: "Current meal data for macro-matching context",
    type: CurrentMealDto,
  })
  @ValidateNested()
  @Type(() => CurrentMealDto)
  currentMeal!: CurrentMealDto;
}
