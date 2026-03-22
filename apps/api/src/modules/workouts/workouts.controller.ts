import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { WorkoutPlanResponseDto } from "./dto/workout-plan-response.dto";
import { WorkoutsService } from "./workouts.service";

@ApiTags("Workouts")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("workouts")
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post("generate")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Generate a personalized workout plan using AI" })
  @ApiResponse({
    status: 201,
    description: "Workout plan generated successfully",
    type: WorkoutPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "User profile not found" })
  @ApiResponse({ status: 422, description: "Profile incomplete" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async generatePlan(
    @Request() req: { user: { id: string } },
  ): Promise<WorkoutPlanResponseDto> {
    return this.workoutsService.generatePlan(req.user.id);
  }

  @Get("plan")
  @ApiOperation({ summary: "Get current active workout plan" })
  @ApiResponse({
    status: 200,
    description: "Active workout plan",
    type: WorkoutPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "No active plan found" })
  async getActivePlan(
    @Request() req: { user: { id: string } },
  ): Promise<WorkoutPlanResponseDto> {
    return this.workoutsService.getActivePlan(req.user.id);
  }

  @Get("plans")
  @ApiOperation({ summary: "List all workout plans for the user" })
  @ApiResponse({
    status: 200,
    description: "List of all workout plans",
    type: [WorkoutPlanResponseDto],
  })
  async getUserPlans(
    @Request() req: { user: { id: string } },
  ): Promise<WorkoutPlanResponseDto[]> {
    return this.workoutsService.getUserPlans(req.user.id);
  }

  @Get("plan/:id")
  @ApiOperation({ summary: "Get a specific workout plan by ID" })
  @ApiParam({ name: "id", description: "Workout plan ID" })
  @ApiResponse({
    status: 200,
    description: "Workout plan details",
    type: WorkoutPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "Plan not found" })
  async getPlanById(
    @Request() req: { user: { id: string } },
    @Param("id") planId: string,
  ): Promise<WorkoutPlanResponseDto> {
    return this.workoutsService.getPlanById(req.user.id, planId);
  }
}
