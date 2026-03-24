import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ProductResponseDto } from "./dto/product-response.dto";
import { StripeHealthResponseDto } from "./dto/stripe-health-response.dto";
import { StripeService } from "./stripe.service";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  async checkHealth(): Promise<StripeHealthResponseDto> {
    const configured = this.stripeService.isConfigured();
    const connected = configured
      ? await this.stripeService.testConnection()
      : false;

    return new StripeHealthResponseDto({ configured, connected });
  }

  async getProducts(): Promise<ProductResponseDto> {
    const monthlyPriceId = this.stripeService.getPriceIdMonthly();
    const annualPriceId = this.stripeService.getPriceIdAnnual();
    const stripe = this.stripeService.getClient();

    const [monthly, annual] = await Promise.all([
      monthlyPriceId
        ? stripe.prices.retrieve(monthlyPriceId).catch(() => null)
        : null,
      annualPriceId
        ? stripe.prices.retrieve(annualPriceId).catch(() => null)
        : null,
    ]);

    return new ProductResponseDto({
      monthly: monthly
        ? {
            id: monthly.id,
            interval: monthly.recurring?.interval ?? "month",
            amountCents: monthly.unit_amount ?? 0,
            currency: monthly.currency,
          }
        : null,
      annual: annual
        ? {
            id: annual.id,
            interval: annual.recurring?.interval ?? "year",
            amountCents: annual.unit_amount ?? 0,
            currency: annual.currency,
          }
        : null,
    });
  }
}
