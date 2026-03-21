import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { PlanGenerationService } from "../plan-generation/plan-generation.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { OnboardingStatusResponseDto } from "./dto/onboarding-status-response.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly planGenerationService: PlanGenerationService,
  ) {}

  @Get("profile")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  @ApiNotFoundResponse({ description: "Profile not found" })
  @ApiUnauthorizedResponse({ description: "Invalid or missing token" })
  async getProfile(
    @Request() req: { user: { id: string } },
  ): Promise<ProfileResponseDto> {
    return this.usersService.getProfile(req.user.id);
  }

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
        `Failed to queue plan generation for user ${req.user.id}, completing synchronously`,
        error,
      );
      await this.usersService.setOnboardingComplete(req.user.id);
      jobId = "sync";
    }

    return { profile, jobId };
  }

  @Patch("profile")
  @ApiOperation({ summary: "Update user profile" })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  @ApiNotFoundResponse({ description: "Profile not found" })
  @ApiUnauthorizedResponse({ description: "Invalid or missing token" })
  async updateProfile(
    @Request() req: { user: { id: string } },
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @Get("onboarding-status")
  @ApiOperation({ summary: "Get onboarding/plan generation status" })
  @ApiResponse({ status: 200, type: OnboardingStatusResponseDto })
  @ApiUnauthorizedResponse({ description: "Invalid or missing token" })
  async getOnboardingStatus(
    @Request() req: { user: { id: string } },
  ): Promise<OnboardingStatusResponseDto> {
    const jobId = await this.usersService.getPlanGenerationJobId(req.user.id);

    if (!jobId) {
      return new OnboardingStatusResponseDto("complete", 100);
    }

    if (jobId === "sync") {
      return new OnboardingStatusResponseDto("complete", 100);
    }

    const status = await this.planGenerationService.getJobStatus(jobId);
    return new OnboardingStatusResponseDto(status.status, status.progress);
  }
}
