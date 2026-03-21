import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AiService } from "./ai.service";
import { AiHealthResponseDto } from "./dto/ai-health-response.dto";

@ApiTags("AI")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get("health")
  @ApiOperation({ summary: "Check AI service connectivity" })
  @ApiResponse({
    status: 200,
    description: "AI service is connected",
    type: AiHealthResponseDto,
  })
  @ApiResponse({ status: 503, description: "AI service unavailable" })
  async checkHealth(): Promise<AiHealthResponseDto> {
    const result = await this.aiService.testConnection();
    return new AiHealthResponseDto(result);
  }
}
