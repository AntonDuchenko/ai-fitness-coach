import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { PrismaService } from "../../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import { CheckoutSessionResponseDto } from "./dto/checkout-session-response.dto";
import { PortalSessionResponseDto } from "./dto/portal-session-response.dto";
import { ProductResponseDto } from "./dto/product-response.dto";
import { StripeHealthResponseDto } from "./dto/stripe-health-response.dto";
import { SubscriptionResponseDto } from "./dto/subscription-response.dto";
import { StripeService } from "./stripe.service";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
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

  async createCheckoutSession(
    userId: string,
    priceId: string,
  ): Promise<CheckoutSessionResponseDto> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const stripe = this.stripeService.getClient();
    const frontendUrl = this.configService.get<string>(
      "app.frontendUrl",
      "http://localhost:3000",
    );

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      client_reference_id: userId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${frontendUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/pricing`,
    };

    if (user.stripeCustomerId) {
      sessionParams.customer = user.stripeCustomerId;
    } else {
      sessionParams.customer_email = user.email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new CheckoutSessionResponseDto({
      sessionId: session.id,
      url: session.url ?? "",
    });
  }

  async handleWebhook(
    rawBody: Buffer,
    signature: string,
  ): Promise<{ received: true }> {
    const stripe = this.stripeService.getClient();
    const webhookSecret = this.stripeService.getWebhookSecret();

    if (!webhookSecret) {
      throw new BadRequestException("Webhook secret not configured");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      this.logger.error("Webhook signature verification failed", err);
      throw new BadRequestException("Webhook signature verification failed");
    }

    const existing = await this.prisma.stripeEvent.findUnique({
      where: { eventId: event.id },
    });
    if (existing) {
      this.logger.log(`Duplicate event ${event.id}, skipping`);
      return { received: true };
    }

    await this.prisma.stripeEvent.create({
      data: {
        eventId: event.id,
        type: event.type,
        data: JSON.parse(JSON.stringify(event.data)),
        processed: false,
      },
    });

    try {
      switch (event.type) {
        case "checkout.session.completed":
          await this.handleCheckoutComplete(
            event.data.object as Stripe.Checkout.Session,
          );
          break;
        case "customer.subscription.updated":
          await this.handleSubscriptionUpdate(
            event.data.object as Stripe.Subscription,
          );
          break;
        case "customer.subscription.deleted":
          await this.handleSubscriptionCancel(
            event.data.object as Stripe.Subscription,
          );
          break;
        case "invoice.payment_failed":
          await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
          break;
        default:
          this.logger.log(`Unhandled event type: ${event.type}`);
      }

      await this.prisma.stripeEvent.update({
        where: { eventId: event.id },
        data: { processed: true },
      });
    } catch (err) {
      this.logger.error(`Error processing event ${event.id}`, err);
      throw err;
    }

    return { received: true };
  }

  async createPortalSession(userId: string): Promise<PortalSessionResponseDto> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!user.stripeCustomerId) {
      throw new BadRequestException("No active subscription to manage");
    }

    const stripe = this.stripeService.getClient();
    const frontendUrl = this.configService.get<string>(
      "app.frontendUrl",
      "http://localhost:3000",
    );

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${frontendUrl}/dashboard/settings`,
    });

    return new PortalSessionResponseDto({ url: session.url });
  }

  async getSubscription(userId: string): Promise<SubscriptionResponseDto> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return new SubscriptionResponseDto({
      isPremium: user.isPremium,
      subscriptionStatus: user.subscriptionStatus,
      subscriptionId: user.subscriptionId,
      subscriptionEndsAt: user.subscriptionEndsAt,
    });
  }

  private async handleCheckoutComplete(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    const userId = session.client_reference_id;
    if (!userId) {
      this.logger.warn("Checkout session missing client_reference_id");
      return;
    }

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isPremium: true,
        stripeCustomerId: customerId,
        subscriptionId: subscriptionId,
        subscriptionStatus: "active",
      },
    });

    this.logger.log(`User ${userId} upgraded to premium`);
  }

  private async handleSubscriptionUpdate(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    const customerId = subscription.customer as string;

    await this.prisma.user.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        subscriptionStatus: subscription.status,
        isPremium: subscription.status === "active",
      },
    });

    this.logger.log(
      `Subscription updated for customer ${customerId}: ${subscription.status}`,
    );
  }

  private async handleSubscriptionCancel(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    const customerId = subscription.customer as string;

    await this.prisma.user.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        isPremium: false,
        subscriptionStatus: "canceled",
        subscriptionEndsAt: subscription.ended_at
          ? new Date(subscription.ended_at * 1000)
          : new Date(),
      },
    });

    this.logger.log(`Subscription canceled for customer ${customerId}`);
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    const customerId = invoice.customer as string;

    await this.prisma.user.updateMany({
      where: { stripeCustomerId: customerId },
      data: {
        subscriptionStatus: "past_due",
      },
    });

    this.logger.log(`Payment failed for customer ${customerId}`);
  }
}
