import { Module } from "@nestjs/common";
import { NutritionModule } from "../nutrition/nutrition.module";
import { WorkoutsModule } from "../workouts/workouts.module";
import { ContextService } from "./context.service";

@Module({
  imports: [WorkoutsModule, NutritionModule],
  providers: [ContextService],
  exports: [ContextService],
})
export class ContextModule {}
