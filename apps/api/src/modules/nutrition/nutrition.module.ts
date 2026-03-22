import { Module, forwardRef } from "@nestjs/common";
import { AiModule } from "../ai/ai.module";
import { NutritionController } from "./nutrition.controller";
import { NutritionService } from "./nutrition.service";

@Module({
  imports: [forwardRef(() => AiModule)],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
