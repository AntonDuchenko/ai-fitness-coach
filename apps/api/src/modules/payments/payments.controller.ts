import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  RawBody,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CheckoutSessionResponseDto } from "./dto/checkout-session-response.dto";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import { PortalSessionResponseDto } from "./dto/portal-session-response.dto";
import { ProductResponseDto } from "./dto/product-response.dto";
import { StripeHealthResponseDto } from "./dto/stripe-health-response.dto";
import { SubscriptionResponseDto } from "./dto/subscription-response.dto";
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

  @Post("create-checkout-session")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Create a Stripe checkout session for subscription",
  })
  @ApiBody({ type: CreateCheckoutSessionDto })
  @ApiResponse({
    status: 201,
    description: "Checkout session created",
    type: CheckoutSessionResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  async createCheckoutSession(
    @Req() req: { user: { sub: string } },
    @Body() dto: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponseDto> {
    return this.paymentsService.createCheckoutSession(
      req.user.sub,
      dto.priceId,
    );
  }

  @Post("webhook")
  @ApiOperation({ summary: "Handle Stripe webhook events" })
  @ApiResponse({ status: 200, description: "Webhook received" })
  @ApiResponse({ status: 400, description: "Invalid webhook signature" })
  async handleWebhook(
    @RawBody() rawBody: Buffer,
    @Headers("stripe-signature") signature: string,
  ): Promise<{ received: true }> {
    return this.paymentsService.handleWebhook(rawBody, signature);
  }

  @Post("create-portal-session")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a Stripe billing portal session" })
  @ApiResponse({
    status: 201,
    description: "Portal session created",
    type: PortalSessionResponseDto,
  })
  @ApiResponse({ status: 400, description: "No active subscription" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  async createPortalSession(
    @Req() req: { user: { sub: string } },
  ): Promise<PortalSessionResponseDto> {
    return this.paymentsService.createPortalSession(req.user.sub);
  }

  @Get("subscription")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user subscription info" })
  @ApiResponse({
    status: 200,
    description: "Current subscription info",
    type: SubscriptionResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "User not found" })
  async getSubscription(
    @Req() req: { user: { sub: string } },
  ): Promise<SubscriptionResponseDto> {
    return this.paymentsService.getSubscription(req.user.sub);
  }
}
