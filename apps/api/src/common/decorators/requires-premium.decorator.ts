import { UseGuards, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { PremiumGuard } from "../guards/premium.guard";

export function RequiresPremium() {
  return applyDecorators(
    UseGuards(PremiumGuard),
    ApiResponse({
      status: 403,
      description: "Premium subscription required",
    }),
  );
}
