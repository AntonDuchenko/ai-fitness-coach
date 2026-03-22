import { Module } from "@nestjs/common";
import { AiModule } from "../ai/ai.module";
import { NutritionController } from "./nutrition.controller";
import { NutritionService } from "./nutrition.service";

@Module({
  imports: [AiModule],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
