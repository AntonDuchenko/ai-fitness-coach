import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { WorkoutsService } from "./workouts.service";

@ApiTags("Workouts")
@Controller("workouts")
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}
}
