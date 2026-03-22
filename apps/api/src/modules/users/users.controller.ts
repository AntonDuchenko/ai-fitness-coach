import {
  Body,
  Controller,
  Get,
  Patch,
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
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
