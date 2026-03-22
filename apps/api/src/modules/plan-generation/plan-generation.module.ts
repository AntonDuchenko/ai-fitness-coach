import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ChatModule } from "../chat/chat.module";
import { NutritionModule } from "../nutrition/nutrition.module";
import { UsersModule } from "../users/users.module";
import { WorkoutsModule } from "../workouts/workouts.module";
import { OnboardingController } from "./onboarding.controller";
import { PlanGenerationProcessor } from "./plan-generation.processor";
import { PlanGenerationService } from "./plan-generation.service";

@Module({
  imports: [
    BullModule.registerQueue({ name: "plan-generation" }),
    WorkoutsModule,
    NutritionModule,
    ChatModule,
    UsersModule,
  ],
  controllers: [OnboardingController],
  providers: [PlanGenerationProcessor, PlanGenerationService],
  exports: [PlanGenerationService],
})
export class PlanGenerationModule {}
