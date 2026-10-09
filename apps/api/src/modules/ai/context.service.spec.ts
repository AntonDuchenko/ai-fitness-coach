import type { PrismaService } from "../../prisma/prisma.service";
import type { NutritionService } from "../nutrition/nutrition.service";
import type { WorkoutsService } from "../workouts/workouts.service";
import { ContextService } from "./context.service";

function setup() {
  const prisma = {
    userProfile: { findUnique: jest.fn().mockResolvedValue(null) },
    chatMessage: { findMany: jest.fn() },
    workoutLog: { findMany: jest.fn().mockResolvedValue([]) },
  };
  const workouts = { getCurrentPlan: jest.fn().mockResolvedValue(null) };
  const nutrition = { getCurrentPlan: jest.fn().mockResolvedValue(null) };
  const service = new ContextService(
    prisma as unknown as PrismaService,
    workouts as unknown as WorkoutsService,
    nutrition as unknown as NutritionService,
  );
  return { service, prisma };
}

describe("ContextService.buildContext", () => {
  it("returns fresh conversation history on every call", async () => {
    const { service, prisma } = setup();
    prisma.chatMessage.findMany
      .mockResolvedValueOnce([{ role: "user", content: "first" }])
      .mockResolvedValueOnce([
        { role: "user", content: "second" },
        { role: "assistant", content: "reply to first" },
        { role: "user", content: "first" },
      ]);

    await service.buildContext("u1", "c1");
    const second = await service.buildContext("u1", "c1");

    expect(second.conversationHistory.map((m) => m.content)).toEqual([
      "first",
      "reply to first",
      "second",
    ]);
  });

  it("caches user-level data between calls", async () => {
    const { service, prisma } = setup();
    prisma.chatMessage.findMany.mockResolvedValue([]);

    await service.buildContext("u1", "c1");
    await service.buildContext("u1", "c2");

    expect(prisma.userProfile.findUnique).toHaveBeenCalledTimes(1);
  });

  it("reloads user-level data after invalidateCache", async () => {
    const { service, prisma } = setup();
    prisma.chatMessage.findMany.mockResolvedValue([]);

    await service.buildContext("u1", "c1");
    service.invalidateCache("u1");
    await service.buildContext("u1", "c1");

    expect(prisma.userProfile.findUnique).toHaveBeenCalledTimes(2);
  });

  it("scopes history to the conversation", async () => {
    const { service, prisma } = setup();
    prisma.chatMessage.findMany.mockResolvedValue([]);

    await service.buildContext("u1", "c1");

    expect(prisma.chatMessage.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: "u1", conversationId: "c1" },
      }),
    );
  });
});
