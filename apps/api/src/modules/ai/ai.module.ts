import { Module } from "@nestjs/common";
import { NutritionModule } from "../nutrition/nutrition.module";
import { WorkoutsModule } from "../workouts/workouts.module";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { ContextService } from "./context.service";

@Module({
  imports: [WorkoutsModule, NutritionModule],
  controllers: [AiController],
  providers: [AiService, ContextService],
  exports: [AiService, ContextService],
})
export class AiModule {}
