import { Module, forwardRef } from "@nestjs/common";
import { PlanGenerationModule } from "../plan-generation/plan-generation.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [forwardRef(() => PlanGenerationModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
