import {
  Body,
  Controller,
  DefaultValuePipe,
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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ConsistencyResponseDto } from "./dto/consistency-response.dto";
import { CreateWeightLogDto } from "./dto/create-weight-log.dto";
import { ProgressSummaryResponseDto } from "./dto/progress-summary-response.dto";
import { StrengthProgressResponseDto } from "./dto/strength-progress-response.dto";
import { VolumeProgressResponseDto } from "./dto/volume-progress-response.dto";
import { WeightHistoryResponseDto } from "./dto/weight-history-response.dto";
import { WeightLogResponseDto } from "./dto/weight-log-response.dto";
import { ProgressService } from "./progress.service";

const PERIOD_ENUM = ["1week", "1month", "3months", "6months", "1year", "all"];

@ApiTags("Progress")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("progress")
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // ─── Weight ──────────────────────────────────────────────

  @Post("weight")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Log weight (upserts for the same day)" })
  @ApiResponse({
    status: 201,
    description: "Weight logged successfully",
    type: WeightLogResponseDto,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async logWeight(
    @Request() req: { user: { id: string } },
    @Body() dto: CreateWeightLogDto,
  ): Promise<WeightLogResponseDto> {
    return this.progressService.logWeight(req.user.id, dto);
  }

  @Get("weight")
  @ApiOperation({ summary: "Get weight history for a period" })
  @ApiQuery({
    name: "period",
    required: false,
    enum: PERIOD_ENUM,
    example: "3months",
    description: "Time period for history (default: 3months)",
  })
  @ApiResponse({
    status: 200,
    description: "Weight history with stats",
    type: WeightHistoryResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getWeightHistory(
    @Request() req: { user: { id: string } },
    @Query("period", new DefaultValuePipe("3months")) period: string,
  ): Promise<WeightHistoryResponseDto> {
    return this.progressService.getWeightHistory(req.user.id, period);
  }

  // ─── Strength ────────────────────────────────────────────

  @Get("strength/:exercise")
  @ApiOperation({ summary: "Get strength progression for a specific exercise" })
  @ApiParam({
    name: "exercise",
    description: "Exercise name (e.g., Barbell Bench Press)",
    example: "Barbell Bench Press",
  })
  @ApiQuery({
    name: "period",
    required: false,
    enum: PERIOD_ENUM,
    example: "3months",
    description: "Time period (default: 3months)",
  })
  @ApiResponse({
    status: 200,
    description: "Strength progression data",
    type: StrengthProgressResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getStrengthProgress(
    @Request() req: { user: { id: string } },
    @Param("exercise") exercise: string,
    @Query("period", new DefaultValuePipe("3months")) period: string,
  ): Promise<StrengthProgressResponseDto> {
    return this.progressService.getStrengthProgress(
      req.user.id,
      exercise,
      period,
    );
  }

  // ─── Volume ──────────────────────────────────────────────

  @Get("volume")
  @ApiOperation({ summary: "Get training volume over time (weekly)" })
  @ApiQuery({
    name: "period",
    required: false,
    enum: PERIOD_ENUM,
    example: "3months",
    description: "Time period (default: 3months)",
  })
  @ApiResponse({
    status: 200,
    description: "Weekly training volume data",
    type: VolumeProgressResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getVolumeProgress(
    @Request() req: { user: { id: string } },
    @Query("period", new DefaultValuePipe("3months")) period: string,
  ): Promise<VolumeProgressResponseDto> {
    return this.progressService.getVolumeProgress(req.user.id, period);
  }

  // ─── Consistency ─────────────────────────────────────────

  @Get("consistency")
  @ApiOperation({ summary: "Get workout consistency data (calendar heatmap)" })
  @ApiQuery({
    name: "period",
    required: false,
    enum: PERIOD_ENUM,
    example: "3months",
    description: "Time period (default: 3months)",
  })
  @ApiResponse({
    status: 200,
    description: "Daily workout consistency data",
    type: ConsistencyResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getConsistency(
    @Request() req: { user: { id: string } },
    @Query("period", new DefaultValuePipe("3months")) period: string,
  ): Promise<ConsistencyResponseDto> {
    return this.progressService.getConsistency(req.user.id, period);
  }

  // ─── Summary ─────────────────────────────────────────────

  @Get("summary")
  @ApiOperation({ summary: "Get combined progress summary (all stats)" })
  @ApiResponse({
    status: 200,
    description: "Combined progress summary",
    type: ProgressSummaryResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getSummary(
    @Request() req: { user: { id: string } },
  ): Promise<ProgressSummaryResponseDto> {
    return this.progressService.getSummary(req.user.id);
  }
}
