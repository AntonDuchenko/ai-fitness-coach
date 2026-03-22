import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ChatService } from "../chat/chat.service";
import { NutritionService } from "../nutrition/nutrition.service";
import { CreateProfileDto } from "../users/dto/create-profile.dto";
import { OnboardingStatusResponseDto } from "../users/dto/onboarding-status-response.dto";
import { ProfileResponseDto } from "../users/dto/profile-response.dto";
import { UsersService } from "../users/users.service";
import { WorkoutsService } from "../workouts/workouts.service";
import { PlanGenerationService } from "./plan-generation.service";

@ApiTags("Onboarding")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OnboardingController {
  private readonly logger = new Logger(OnboardingController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly planGenerationService: PlanGenerationService,
    private readonly workoutsService: WorkoutsService,
    private readonly nutritionService: NutritionService,
    private readonly chatService: ChatService,
  ) {}

  @Post("profile")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create user profile and trigger plan generation" })
  @ApiResponse({
    status: 201,
    description: "Profile created, plan generation queued",
  })
  @ApiUnauthorizedResponse({ description: "Invalid or missing token" })
  async createProfile(
    @Request() req: { user: { id: string } },
    @Body() dto: CreateProfileDto,
  ): Promise<{ profile: ProfileResponseDto; jobId: string }> {
    const profile = await this.usersService.createProfile(req.user.id, dto);

    let jobId: string;
    try {
      jobId = await this.planGenerationService.triggerPlanGeneration(
        req.user.id,
      );
      await this.usersService.setPlanGenerationJobId(req.user.id, jobId);
    } catch (error) {
      this.logger.warn(
        `Failed to queue plan generation for user ${req.user.id}, falling back to synchronous generation`,
        error,
      );
      await this.generatePlansSynchronously(req.user.id);
      jobId = "sync";
    }

    return { profile, jobId };
  }

  @Get("onboarding-status")
  @ApiOperation({ summary: "Get onboarding/plan generation status" })
  @ApiResponse({ status: 200, type: OnboardingStatusResponseDto })
  @ApiUnauthorizedResponse({ description: "Invalid or missing token" })
  async getOnboardingStatus(
    @Request() req: { user: { id: string } },
  ): Promise<OnboardingStatusResponseDto> {
    const jobId = await this.usersService.getPlanGenerationJobId(req.user.id);

    if (!jobId || jobId === "sync") {
      return new OnboardingStatusResponseDto("complete", 100);
    }

    const status = await this.planGenerationService.getJobStatus(jobId);
    return new OnboardingStatusResponseDto(status.status, status.progress);
  }

  private async generatePlansSynchronously(userId: string): Promise<void> {
    try {
      await this.workoutsService.generatePlan(userId);
    } catch (err) {
      this.logger.error(`Sync workout generation failed for ${userId}`, err);
    }

    try {
      await this.nutritionService.generatePlan(userId);
    } catch (err) {
      this.logger.error(`Sync nutrition generation failed for ${userId}`, err);
    }

    try {
      await this.chatService.sendWelcomeMessage(userId);
    } catch (err) {
      this.logger.error(`Sync welcome message failed for ${userId}`, err);
    }

    await this.usersService.setOnboardingComplete(userId);
  }
}
