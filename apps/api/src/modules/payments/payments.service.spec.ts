import { BadRequestException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import type { PrismaService } from "../../prisma/prisma.service";
import type { UsersService } from "../users/users.service";
import { PaymentsService } from "./payments.service";
import type { StripeService } from "./stripe.service";

function setup() {
  const stripeClient = {
    checkout: {
      sessions: {
        create: jest
          .fn()
          .mockResolvedValue({ id: "cs_1", url: "https://stripe/cs_1" }),
      },
    },
    webhooks: { constructEvent: jest.fn() },
  };
  const stripeService = {
    getClient: () => stripeClient,
    getPriceIdMonthly: () => "price_monthly",
    getPriceIdAnnual: () => "price_annual",
    getWebhookSecret: () => "whsec_test",
  } as unknown as StripeService;
  const prisma = {
    stripeEvent: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    user: { update: jest.fn(), updateMany: jest.fn() },
  };
  const usersService = {
    findById: jest
      .fn()
      .mockResolvedValue({ id: "u1", email: "a@b.c", stripeCustomerId: null }),
  } as unknown as UsersService;
  const config = {
    get: (_k: string, d?: unknown) => d,
  } as unknown as ConfigService;

  const service = new PaymentsService(
    stripeService,
    prisma as unknown as PrismaService,
    usersService,
    config,
  );
  return { service, stripeClient, prisma };
}

const checkoutEvent = {
  id: "evt_1",
  type: "checkout.session.completed",
  data: {
    object: {
      client_reference_id: "u1",
      customer: "cus_1",
      subscription: "sub_1",
    },
  },
};

describe("PaymentsService", () => {
  describe("createCheckoutSession", () => {
    it("rejects a price id that is not one of the configured plans", async () => {
      const { service, stripeClient } = setup();

      await expect(
        service.createCheckoutSession("u1", "price_cheap_or_test"),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(stripeClient.checkout.sessions.create).not.toHaveBeenCalled();
    });

    it("creates a session for a configured plan", async () => {
      const { service, stripeClient } = setup();

      const res = await service.createCheckoutSession("u1", "price_annual");

      expect(res.sessionId).toBe("cs_1");
      expect(stripeClient.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          client_reference_id: "u1",
          line_items: [{ price: "price_annual", quantity: 1 }],
        }),
      );
    });
  });

  describe("handleWebhook", () => {
    it("reprocesses a retried event whose first delivery failed", async () => {
      const { service, stripeClient, prisma } = setup();
      stripeClient.webhooks.constructEvent.mockReturnValue(checkoutEvent);

      // First delivery: row is stored, then the DB update fails.
      prisma.stripeEvent.findUnique.mockResolvedValueOnce(null);
      prisma.user.update.mockRejectedValueOnce(new Error("db down"));
      await expect(
        service.handleWebhook(Buffer.from(""), "sig"),
      ).rejects.toThrow("db down");

      // Stripe retries: row exists but is unprocessed.
      prisma.stripeEvent.findUnique.mockResolvedValueOnce({
        eventId: "evt_1",
        processed: false,
      });
      prisma.user.update.mockResolvedValueOnce({});
      await service.handleWebhook(Buffer.from(""), "sig");

      expect(prisma.user.update).toHaveBeenCalledTimes(2);
      expect(prisma.user.update).toHaveBeenLastCalledWith(
        expect.objectContaining({
          where: { id: "u1" },
          data: expect.objectContaining({ isPremium: true }),
        }),
      );
      expect(prisma.stripeEvent.create).toHaveBeenCalledTimes(1);
      expect(prisma.stripeEvent.update).toHaveBeenCalledWith({
        where: { eventId: "evt_1" },
        data: { processed: true },
      });
    });

    it("skips an event that was already processed", async () => {
      const { service, stripeClient, prisma } = setup();
      stripeClient.webhooks.constructEvent.mockReturnValue(checkoutEvent);
      prisma.stripeEvent.findUnique.mockResolvedValue({
        eventId: "evt_1",
        processed: true,
      });

      await service.handleWebhook(Buffer.from(""), "sig");

      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it("rejects an invalid signature", async () => {
      const { service, stripeClient } = setup();
      stripeClient.webhooks.constructEvent.mockImplementation(() => {
        throw new Error("bad sig");
      });

      await expect(
        service.handleWebhook(Buffer.from(""), "sig"),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it.each([
      ["active", true],
      ["trialing", true],
      ["past_due", false],
      ["unpaid", false],
    ])("subscription status %s → isPremium %s", async (status, premium) => {
      const { service, stripeClient, prisma } = setup();
      stripeClient.webhooks.constructEvent.mockReturnValue({
        id: `evt_${status}`,
        type: "customer.subscription.updated",
        data: { object: { customer: "cus_1", status } },
      });
      prisma.stripeEvent.findUnique.mockResolvedValue(null);

      await service.handleWebhook(Buffer.from(""), "sig");

      expect(prisma.user.updateMany).toHaveBeenCalledWith({
        where: { stripeCustomerId: "cus_1" },
        data: { subscriptionStatus: status, isPremium: premium },
      });
    });
  });
});
