import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import type { ChatMessageDto } from "./dto/chat-completion-request.dto";

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly openai: OpenAI;
  private readonly defaultModel: string;
  private readonly maxRetries: number;
  private readonly retryBaseDelayMs: number;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>("openai.apiKey"),
    });
    this.defaultModel = this.configService.get<string>(
      "openai.defaultModel",
      "gpt-4o",
    );
    this.maxRetries = this.configService.get<number>("openai.maxRetries", 3);
    this.retryBaseDelayMs = this.configService.get<number>(
      "openai.retryBaseDelayMs",
      1000,
    );
  }

  async testConnection(): Promise<{
    status: string;
    model: string;
    timestamp: string;
  }> {
    try {
      await this.openai.models.retrieve(this.defaultModel);
      return {
        status: "connected",
        model: this.defaultModel,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error("OpenAI connection test failed", error);
      throw this.mapOpenAiError(error);
    }
  }

  async createChatCompletion(
    messages: ChatMessageDto[],
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    },
  ): Promise<string> {
    return this.withRetry(async () => {
      try {
        const response = await this.openai.chat.completions.create({
          model: options?.model || this.defaultModel,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new BadGatewayException("OpenAI returned an empty response");
        }
        return content;
      } catch (error) {
        if (error instanceof HttpException) throw error;
        throw this.mapOpenAiError(error);
      }
    });
  }

  private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (!this.isRetryable(error) || attempt === this.maxRetries) {
          throw error;
        }

        const delay = this.retryBaseDelayMs * 2 ** attempt;
        this.logger.warn(
          `OpenAI request failed (attempt ${attempt + 1}/${this.maxRetries + 1}), retrying in ${delay}ms`,
        );
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  private isRetryable(error: unknown): boolean {
    if (error instanceof OpenAI.RateLimitError) return true;
    if (error instanceof OpenAI.APIConnectionError) return true;
    if (error instanceof OpenAI.InternalServerError) return true;
    if (
      error instanceof OpenAI.APIError &&
      error.status &&
      error.status >= 500
    ) {
      return true;
    }
    return false;
  }

  private mapOpenAiError(error: unknown): HttpException {
    if (error instanceof HttpException) return error;

    if (error instanceof OpenAI.AuthenticationError) {
      this.logger.error("OpenAI authentication failed — check API key");
      return new ServiceUnavailableException("AI service configuration error");
    }

    if (error instanceof OpenAI.RateLimitError) {
      return new HttpException("AI service rate limited, try again later", 429);
    }

    if (error instanceof OpenAI.BadRequestError) {
      return new BadRequestException(error.message);
    }

    if (error instanceof OpenAI.APIConnectionError) {
      return new ServiceUnavailableException("AI service unreachable");
    }

    if (error instanceof OpenAI.APIError) {
      this.logger.error(`OpenAI API error: ${error.status} ${error.message}`);
      return new BadGatewayException("AI service error");
    }

    this.logger.error("Unexpected AI error", error);
    return new BadGatewayException("AI service error");
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
