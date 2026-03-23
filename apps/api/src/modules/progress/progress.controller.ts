import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateWeightLogDto } from "./dto/create-weight-log.dto";
import { WeightHistoryResponseDto } from "./dto/weight-history-response.dto";
import { WeightLogResponseDto } from "./dto/weight-log-response.dto";
import { ProgressService } from "./progress.service";

@ApiTags("Progress")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("progress")
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

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
    enum: ["1month", "3months", "6months", "1year", "all"],
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
}
