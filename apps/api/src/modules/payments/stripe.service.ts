import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";

@Injectable()
export class StripeService implements OnModuleInit {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe | null = null;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const secretKey = this.configService.get<string>("stripe.secretKey");
    if (!secretKey) {
      this.logger.warn(
        "STRIPE_SECRET_KEY not set — Stripe features will be unavailable",
      );
      return;
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: "2026-02-25.clover",
    });

    this.logger.log("Stripe client initialized");
  }

  getClient(): Stripe {
    if (!this.stripe) {
      throw new Error(
        "Stripe client is not initialized — check STRIPE_SECRET_KEY",
      );
    }
    return this.stripe;
  }

  isConfigured(): boolean {
    return this.stripe !== null;
  }

  async testConnection(): Promise<boolean> {
    if (!this.stripe) return false;

    try {
      await this.stripe.customers.list({ limit: 1 });
      return true;
    } catch (error) {
      this.logger.error("Stripe connection test failed", error);
      return false;
    }
  }

  getPriceIdMonthly(): string | undefined {
    return this.configService.get<string>("stripe.priceIdMonthly");
  }

  getPriceIdAnnual(): string | undefined {
    return this.configService.get<string>("stripe.priceIdAnnual");
  }

  getWebhookSecret(): string | undefined {
    return this.configService.get<string>("stripe.webhookSecret");
  }
}
