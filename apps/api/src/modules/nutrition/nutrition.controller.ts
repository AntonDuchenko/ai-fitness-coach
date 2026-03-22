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
import { NutritionPlanResponseDto } from "./dto/nutrition-plan-response.dto";
import { NutritionService } from "./nutrition.service";

@ApiTags("Nutrition")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("nutrition")
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Post("generate")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Generate a personalized nutrition plan using AI",
  })
  @ApiResponse({
    status: 201,
    description: "Nutrition plan generated successfully",
    type: NutritionPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "User profile not found" })
  @ApiResponse({ status: 422, description: "Profile incomplete" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async generatePlan(
    @Request() req: { user: { id: string } },
  ): Promise<NutritionPlanResponseDto> {
    return this.nutritionService.generatePlan(req.user.id);
  }

  @Get("plan")
  @ApiOperation({ summary: "Get current active nutrition plan" })
  @ApiResponse({
    status: 200,
    description: "Active nutrition plan",
    type: NutritionPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "No active plan found" })
  async getActivePlan(
    @Request() req: { user: { id: string } },
  ): Promise<NutritionPlanResponseDto> {
    return this.nutritionService.getActivePlan(req.user.id);
  }

  @Get("plans")
  @ApiOperation({ summary: "List all nutrition plans for the user" })
  @ApiResponse({
    status: 200,
    description: "List of all nutrition plans",
    type: [NutritionPlanResponseDto],
  })
  async getUserPlans(
    @Request() req: { user: { id: string } },
  ): Promise<NutritionPlanResponseDto[]> {
    return this.nutritionService.getUserPlans(req.user.id);
  }

  @Get("plan/:id")
  @ApiOperation({ summary: "Get a specific nutrition plan by ID" })
  @ApiParam({ name: "id", description: "Nutrition plan ID" })
  @ApiResponse({
    status: 200,
    description: "Nutrition plan details",
    type: NutritionPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "Plan not found" })
  async getPlanById(
    @Request() req: { user: { id: string } },
    @Param("id") planId: string,
  ): Promise<NutritionPlanResponseDto> {
    return this.nutritionService.getPlanById(req.user.id, planId);
  }
}
