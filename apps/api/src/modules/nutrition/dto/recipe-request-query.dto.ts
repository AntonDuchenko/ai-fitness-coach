import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RecipeRequestQueryDto {
  @ApiPropertyOptional({
    description: "Search term for recipe name or ingredients",
    example: "chicken salad",
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: "Meal type filter",
    example: "lunch",
    enum: ["breakfast", "lunch", "dinner", "snack"],
  })
  @IsOptional()
  @IsString()
  type?: string;
}
