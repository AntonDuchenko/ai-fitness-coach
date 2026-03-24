import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ProductResponseDto } from "./dto/product-response.dto";
import { StripeHealthResponseDto } from "./dto/stripe-health-response.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get("health")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Check Stripe connection health" })
  @ApiResponse({
    status: 200,
    description: "Stripe health status",
    type: StripeHealthResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async checkHealth(): Promise<StripeHealthResponseDto> {
    return this.paymentsService.checkHealth();
  }

  @Get("products")
  @ApiOperation({ summary: "Get available subscription products and prices" })
  @ApiResponse({
    status: 200,
    description: "Available products with pricing",
    type: ProductResponseDto,
  })
  async getProducts(): Promise<ProductResponseDto> {
    return this.paymentsService.getProducts();
  }
}
