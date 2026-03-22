import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateWorkoutLogDto } from "./dto/create-workout-log.dto";
import { WorkoutDayResponseDto } from "./dto/workout-day-response.dto";
import { WorkoutLogResponseDto } from "./dto/workout-log-response.dto";
import { WorkoutPlanResponseDto } from "./dto/workout-plan-response.dto";
import { WorkoutStatsResponseDto } from "./dto/workout-stats-response.dto";
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

  @Get("today")
  @ApiOperation({ summary: "Get today's workout from the active plan" })
  @ApiResponse({
    status: 200,
    description: "Today's workout",
    type: WorkoutDayResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "No active plan or no workout scheduled for today",
  })
  async getTodaysWorkout(
    @Request() req: { user: { id: string } },
  ): Promise<WorkoutDayResponseDto> {
    const workout = await this.workoutsService.getTodaysWorkout(req.user.id);

    if (!workout) {
      throw new NotFoundException(
        "No workout scheduled for today. It may be a rest day or you have no active plan.",
      );
    }

    return workout;
  }

  @Get("day/:dayOfWeek")
  @ApiOperation({
    summary: "Get workout for a specific day of the week",
  })
  @ApiParam({
    name: "dayOfWeek",
    description: "Day of the week",
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  })
  @ApiResponse({
    status: 200,
    description: "Workout for the specified day",
    type: WorkoutDayResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "No active plan or no workout for that day",
  })
  async getWorkoutByDay(
    @Request() req: { user: { id: string } },
    @Param("dayOfWeek") dayOfWeek: string,
  ): Promise<WorkoutDayResponseDto> {
    const workout = await this.workoutsService.getWorkoutByDay(
      req.user.id,
      dayOfWeek,
    );

    if (!workout) {
      throw new NotFoundException(
        `No workout scheduled for ${dayOfWeek}. It may be a rest day or you have no active plan.`,
      );
    }

    return workout;
  }

  @Post("plan/regenerate")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Regenerate workout plan (archives current plan)",
  })
  @ApiResponse({
    status: 201,
    description: "New workout plan generated, old plan archived",
    type: WorkoutPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "User profile not found" })
  @ApiResponse({ status: 422, description: "Profile incomplete" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async regeneratePlan(
    @Request() req: { user: { id: string } },
  ): Promise<WorkoutPlanResponseDto> {
    return this.workoutsService.regeneratePlan(req.user.id);
  }

  // ─── Workout Logging ────────────────────────────────────

  @Post("log")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Log a completed workout" })
  @ApiResponse({
    status: 201,
    description: "Workout logged successfully",
    type: WorkoutLogResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async logWorkout(
    @Request() req: { user: { id: string } },
    @Body() dto: CreateWorkoutLogDto,
  ): Promise<WorkoutLogResponseDto> {
    return this.workoutsService.logWorkout(req.user.id, dto);
  }

  @Get("logs")
  @ApiOperation({ summary: "Get workout history" })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    example: 10,
    description: "Number of logs to return (default 10)",
  })
  @ApiQuery({
    name: "offset",
    required: false,
    type: Number,
    example: 0,
    description: "Number of logs to skip (default 0)",
  })
  @ApiResponse({
    status: 200,
    description: "Workout history",
    type: [WorkoutLogResponseDto],
  })
  async getWorkoutLogs(
    @Request() req: { user: { id: string } },
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<WorkoutLogResponseDto[]> {
    return this.workoutsService.getWorkoutLogs(req.user.id, limit, offset);
  }

  @Get("log/:id")
  @ApiOperation({ summary: "Get a specific workout log" })
  @ApiParam({ name: "id", description: "Workout log ID" })
  @ApiResponse({
    status: 200,
    description: "Workout log details",
    type: WorkoutLogResponseDto,
  })
  @ApiResponse({ status: 404, description: "Workout log not found" })
  async getWorkoutLog(
    @Request() req: { user: { id: string } },
    @Param("id") logId: string,
  ): Promise<WorkoutLogResponseDto> {
    return this.workoutsService.getWorkoutLog(req.user.id, logId);
  }

  @Delete("log/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a workout log" })
  @ApiParam({ name: "id", description: "Workout log ID" })
  @ApiResponse({ status: 204, description: "Workout log deleted" })
  @ApiResponse({ status: 404, description: "Workout log not found" })
  async deleteWorkoutLog(
    @Request() req: { user: { id: string } },
    @Param("id") logId: string,
  ): Promise<void> {
    await this.workoutsService.deleteWorkoutLog(req.user.id, logId);
  }

  @Get("stats")
  @ApiOperation({
    summary: "Get workout statistics (streaks, PRs, totals)",
  })
  @ApiResponse({
    status: 200,
    description: "Workout statistics",
    type: WorkoutStatsResponseDto,
  })
  async getWorkoutStats(
    @Request() req: { user: { id: string } },
  ): Promise<WorkoutStatsResponseDto> {
    return this.workoutsService.getWorkoutStats(req.user.id);
  }
}
