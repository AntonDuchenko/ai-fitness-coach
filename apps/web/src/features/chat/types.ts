export interface ChatMessage {
  id: string;
  role: string;
  content: string;
  model?: string | null;
  tokens?: number | null;
  createdAt: string;
}

export interface ChatUsage {
  messagesUsedToday: number;
  dailyLimit: number;
  isPremium: boolean;
  remaining: number;
}
