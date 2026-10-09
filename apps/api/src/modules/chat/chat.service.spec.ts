import { ForbiddenPremiumException } from "../../common/exceptions/forbidden-premium.exception";
import type { PrismaService } from "../../prisma/prisma.service";
import type { AiService } from "../ai/ai.service";
import type { ContextService } from "../ai/context.service";
import type { UsersService } from "../users/users.service";
import { ChatService } from "./chat.service";

const LIMIT = 5;

function setup({
  isPremium = false,
  messagesToday = 0,
}: { isPremium?: boolean; messagesToday?: number } = {}) {
  // Minimal in-memory stand-in for the user row so the conditional
  // UPDATE ... WHERE messagesToday < limit behaves like Postgres.
  const row = {
    id: "u1",
    isPremium,
    messagesToday,
    messagesResetAt: new Date(),
  };

  const prisma = {
    user: {
      update: jest.fn(),
      updateMany: jest.fn(async ({ where, data }) => {
        if (where.messagesResetAt) return { count: 0 };
        if (where.messagesToday?.lt !== undefined) {
          if (row.messagesToday >= where.messagesToday.lt) return { count: 0 };
        }
        if (where.messagesToday?.gt !== undefined) {
          if (row.messagesToday <= where.messagesToday.gt) return { count: 0 };
        }
        if (data.messagesToday?.increment) row.messagesToday += 1;
        if (data.messagesToday?.decrement) row.messagesToday -= 1;
        return { count: 1 };
      }),
    },
    conversation: {
      findFirst: jest.fn(),
      create: jest.fn().mockResolvedValue({ id: "c1" }),
      update: jest.fn(),
    },
    chatMessage: {
      create: jest.fn(async ({ data }) => ({
        id: `m-${data.role}`,
        createdAt: new Date(),
        ...data,
      })),
    },
  };
  const aiService = {
    createChatCompletion: jest.fn().mockResolvedValue("AI reply"),
  };
  const contextService = {
    buildContext: jest.fn().mockResolvedValue({ conversationHistory: [] }),
    buildSystemPrompt: jest.fn().mockReturnValue("SYSTEM"),
    invalidateCache: jest.fn(),
  };
  const usersService = {
    findById: jest.fn(async () => ({ ...row })),
  };

  const service = new ChatService(
    prisma as unknown as PrismaService,
    aiService as unknown as AiService,
    contextService as unknown as ContextService,
    usersService as unknown as UsersService,
  );
  return { service, row, prisma, aiService, contextService };
}

describe("ChatService.sendMessage", () => {
  it("blocks a free user at the daily limit without calling the AI", async () => {
    const { service, aiService } = setup({ messagesToday: LIMIT });

    await expect(service.sendMessage("u1", "hi")).rejects.toBeInstanceOf(
      ForbiddenPremiumException,
    );
    expect(aiService.createChatCompletion).not.toHaveBeenCalled();
  });

  it("does not let concurrent requests exceed the free limit", async () => {
    const { service, row, aiService } = setup({ messagesToday: LIMIT - 1 });

    const results = await Promise.allSettled(
      Array.from({ length: 10 }, () => service.sendMessage("u1", "hi")),
    );

    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(aiService.createChatCompletion).toHaveBeenCalledTimes(1);
    expect(row.messagesToday).toBe(LIMIT);
  });

  it("refunds the free-tier slot when the AI call fails", async () => {
    const { service, row, aiService } = setup({ messagesToday: 2 });
    aiService.createChatCompletion.mockRejectedValueOnce(new Error("503"));

    await expect(service.sendMessage("u1", "hi")).rejects.toThrow("503");
    expect(row.messagesToday).toBe(2);
  });

  it("counts a successful free message exactly once", async () => {
    const { service, row, prisma } = setup({ messagesToday: 0 });

    await service.sendMessage("u1", "hi");

    expect(row.messagesToday).toBe(1);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it("does not limit premium users", async () => {
    const { service, aiService } = setup({
      isPremium: true,
      messagesToday: 999,
    });

    await service.sendMessage("u1", "hi");

    expect(aiService.createChatCompletion).toHaveBeenCalledTimes(1);
  });

  it("builds context before saving the new message so it is sent once", async () => {
    const { service, prisma, contextService, aiService } = setup();
    contextService.buildContext.mockResolvedValue({
      conversationHistory: [
        { role: "user", content: "earlier" },
        { role: "assistant", content: "earlier reply" },
      ],
    });

    await service.sendMessage("u1", "new question");

    expect(
      contextService.buildContext.mock.invocationCallOrder[0],
    ).toBeLessThan(prisma.chatMessage.create.mock.invocationCallOrder[0]);
    const sent = aiService.createChatCompletion.mock.calls[0][0] as {
      content: string;
    }[];
    expect(sent.filter((m) => m.content === "new question")).toHaveLength(1);
    expect(sent.map((m) => m.content)).toEqual([
      "SYSTEM",
      "earlier",
      "earlier reply",
      "new question",
    ]);
  });

  it("bumps the conversation so it sorts first in the list", async () => {
    const { service, prisma } = setup();

    await service.sendMessage("u1", "hi");

    expect(prisma.conversation.update).toHaveBeenCalledWith({
      where: { id: "c1" },
      data: { updatedAt: expect.any(Date) },
    });
  });
});
