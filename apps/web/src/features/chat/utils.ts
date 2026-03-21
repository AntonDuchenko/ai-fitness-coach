import type { ChatMessage, ChatUsage } from "./types";

export function formatChatTime(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function userInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function conversationTitle(messages: ChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New Chat";
  const t = firstUser.content.trim().replace(/\s+/g, " ");
  if (t.length <= 42) return t;
  return `${t.slice(0, 40)}…`;
}

export function chatUsageLabels(usage: ChatUsage | undefined): {
  full: string | null;
  compact: string | null;
  isLimit: boolean;
} {
  if (usage && !usage.isPremium && usage.dailyLimit > 0) {
    const isLimit = usage.remaining === 0;
    return {
      full: `${usage.messagesUsedToday}/${usage.dailyLimit} messages today`,
      compact: `${usage.messagesUsedToday}/${usage.dailyLimit}`,
      isLimit,
    };
  }
  return { full: null, compact: null, isLimit: false };
}
