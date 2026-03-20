import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NutritionService } from "./nutrition.service";

@ApiTags("Nutrition")
@Controller("nutrition")
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}
}
