export interface ChatMessage {
  id: string;
  role: string;
  content: string;
  conversationId?: string | null;
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

export interface Conversation {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageResponse {
  conversationId: string;
  userMessage: ChatMessage;
  aiMessage: ChatMessage;
}
