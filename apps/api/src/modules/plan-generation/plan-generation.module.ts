import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { PlanGenerationProcessor } from "./plan-generation.processor";
import { PlanGenerationService } from "./plan-generation.service";

@Module({
  imports: [BullModule.registerQueue({ name: "plan-generation" })],
  providers: [PlanGenerationProcessor, PlanGenerationService],
  exports: [PlanGenerationService],
})
export class PlanGenerationModule {}
