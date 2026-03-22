import { Module, forwardRef } from "@nestjs/common";
import { AiModule } from "../ai/ai.module";
import { WorkoutsController } from "./workouts.controller";
import { WorkoutsService } from "./workouts.service";

@Module({
  imports: [forwardRef(() => AiModule)],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
