import { BullModule } from "@nestjs/bull";
import { Module, forwardRef } from "@nestjs/common";
import { ChatModule } from "../chat/chat.module";
import { NutritionModule } from "../nutrition/nutrition.module";
import { UsersModule } from "../users/users.module";
import { WorkoutsModule } from "../workouts/workouts.module";
import { PlanGenerationProcessor } from "./plan-generation.processor";
import { PlanGenerationService } from "./plan-generation.service";

@Module({
  imports: [
    BullModule.registerQueue({ name: "plan-generation" }),
    WorkoutsModule,
    NutritionModule,
    ChatModule,
    forwardRef(() => UsersModule),
  ],
  providers: [PlanGenerationProcessor, PlanGenerationService],
  exports: [PlanGenerationService],
})
export class PlanGenerationModule {}
