import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ApplySwapDto } from "./dto/apply-swap.dto";
import { GenerateRecipeDto } from "./dto/generate-recipe.dto";
import { NutritionPlanResponseDto } from "./dto/nutrition-plan-response.dto";
import { RecipeRequestQueryDto } from "./dto/recipe-request-query.dto";
import { RecipeResponseDto } from "./dto/recipe-response.dto";
import { SwapMealDto } from "./dto/swap-meal.dto";
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

  @Post("plan/regenerate")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Regenerate nutrition plan (archives current plan)",
  })
  @ApiResponse({
    status: 201,
    description: "New nutrition plan generated, old plan archived",
    type: NutritionPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "User profile not found" })
  @ApiResponse({ status: 422, description: "Profile incomplete" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async regeneratePlan(
    @Request() req: { user: { id: string } },
  ): Promise<NutritionPlanResponseDto> {
    return this.nutritionService.regeneratePlan(req.user.id);
  }

  @Post("swap-meal")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Generate 3 alternative meals for swapping",
  })
  @ApiBody({ type: SwapMealDto })
  @ApiResponse({
    status: 201,
    description: "3 alternative recipes generated",
    type: [RecipeResponseDto],
  })
  @ApiResponse({ status: 404, description: "No active plan or profile found" })
  @ApiResponse({ status: 422, description: "Invalid meal index" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async generateSwapAlternatives(
    @Request() req: { user: { id: string } },
    @Body() dto: SwapMealDto,
  ): Promise<RecipeResponseDto[]> {
    return this.nutritionService.generateSwapAlternatives(req.user.id, dto);
  }

  @Post("swap-meal/apply")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Apply a meal swap to the nutrition plan",
  })
  @ApiBody({ type: ApplySwapDto })
  @ApiResponse({
    status: 200,
    description: "Meal swapped and plan updated",
    type: NutritionPlanResponseDto,
  })
  @ApiResponse({ status: 404, description: "Plan not found" })
  @ApiResponse({ status: 422, description: "Invalid meal index" })
  async applyMealSwap(
    @Request() req: { user: { id: string } },
    @Body() dto: ApplySwapDto,
  ): Promise<NutritionPlanResponseDto> {
    return this.nutritionService.applyMealSwap(req.user.id, dto);
  }

  @Post("recipe/generate")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Generate a single recipe matching specific macro targets",
  })
  @ApiBody({ type: GenerateRecipeDto })
  @ApiResponse({
    status: 201,
    description: "Recipe generated successfully",
    type: RecipeResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid request body" })
  @ApiResponse({ status: 404, description: "User profile not found" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async generateRecipe(
    @Request() req: { user: { id: string } },
    @Body() dto: GenerateRecipeDto,
  ): Promise<RecipeResponseDto> {
    return this.nutritionService.generateRecipe(req.user.id, dto);
  }

  @Get("recipes")
  @ApiOperation({
    summary: "Search/generate recipes based on user profile and criteria",
  })
  @ApiQuery({
    name: "search",
    required: false,
    type: String,
    description: "Search term for recipe name or ingredients",
    example: "chicken salad",
  })
  @ApiQuery({
    name: "type",
    required: false,
    type: String,
    description: "Meal type filter",
    enum: ["breakfast", "lunch", "dinner", "snack"],
  })
  @ApiResponse({
    status: 200,
    description: "List of matching recipes",
    type: [RecipeResponseDto],
  })
  @ApiResponse({ status: 404, description: "User profile not found" })
  @ApiResponse({ status: 502, description: "AI service error" })
  async searchRecipes(
    @Request() req: { user: { id: string } },
    @Query() query: RecipeRequestQueryDto,
  ): Promise<RecipeResponseDto[]> {
    return this.nutritionService.searchRecipes(
      req.user.id,
      query.search,
      query.type,
    );
  }
}
