# Architect Plan: Task 2.1 — OpenAI Setup

## Overview
Implement the OpenAI SDK integration in the existing AI module. This is a backend-only task: configure the OpenAI client, add environment validation, implement error handling with retry logic, and expose a health-check endpoint to verify connectivity.

## Current State
- AI module exists with empty `AiService`, `AiController`, and `AiModule`
- `OPENAI_API_KEY` is already in `.env.example` and env validation (optional)
- `ConfigModule` is global — available in all modules
- No OpenAI SDK installed

## Architecture Decisions
1. **OpenAI SDK v4** — official `openai` npm package
2. **ConfigService injection** — standard NestJS pattern for env access
3. **OPENAI_API_KEY becomes required** — update env validation from optional to required (since this is Phase 2, AI is now needed)
4. **Add `openai` config namespace** — new `openaiConfig` in `app.config.ts` for API key + model defaults
5. **Retry with exponential backoff** — custom utility method in AiService, handles rate limits (429) and server errors (5xx)
6. **Health check endpoint** — `GET /ai/health` to verify API connection with a simple models.list() call
7. **Structured error handling** — catch OpenAI-specific errors and map to NestJS HttpExceptions

## Files to Create/Modify

### 1. Install dependency
```bash
cd apps/api && pnpm add openai
```

### 2. Modify: `apps/api/src/config/app.config.ts`
- Add `openaiConfig` registered as `openai` namespace:
  - `apiKey: process.env.OPENAI_API_KEY`
  - `defaultModel: process.env.OPENAI_MODEL || 'gpt-4o'`
  - `maxRetries: 3`
  - `retryBaseDelayMs: 1000`

### 3. Modify: `apps/api/src/config/env.validation.ts`
- Change `OPENAI_API_KEY` from `z.string().optional()` to `z.string().min(1, "OPENAI_API_KEY is required")`
- Add `OPENAI_MODEL` as optional with default `gpt-4o`

### 4. Modify: `apps/api/src/app.module.ts`
- Add `openaiConfig` to `ConfigModule.forRoot({ load: [...] })`

### 5. Modify: `apps/api/src/modules/ai/ai.service.ts`
Full implementation:
- Inject `ConfigService`
- Initialize `OpenAI` client in constructor
- `async testConnection(): Promise<{ status: string; model: string }>` — calls `openai.models.list()` with limit 1
- `async createChatCompletion(messages, options?): Promise<string>` — wrapper around `openai.chat.completions.create()` with retry
- `private async withRetry<T>(fn: () => Promise<T>, retries?: number): Promise<T>` — exponential backoff, catches rate limit (429) and server errors (>=500)
- Proper error mapping: `RateLimitError` → 429, `AuthenticationError` → 401, `APIError` → 502

### 6. Modify: `apps/api/src/modules/ai/ai.controller.ts`
- `GET /ai/health` — calls `aiService.testConnection()`, returns status
- Swagger decorators: `@ApiTags('AI')`, `@ApiOperation`, `@ApiResponse`
- Protected with `@UseGuards(JwtAuthGuard)`

### 7. Create: `apps/api/src/modules/ai/dto/ai-health-response.dto.ts`
- `status: string` (e.g., "connected")
- `model: string` (default model name)
- `timestamp: string`

### 8. Create: `apps/api/src/modules/ai/dto/chat-completion-request.dto.ts`
- `messages: { role: string; content: string }[]`
- `model?: string`
- `temperature?: number`
- `maxTokens?: number`

## Error Handling Strategy
- `APIConnectionError` → `ServiceUnavailableException` (503) — OpenAI unreachable
- `RateLimitError` → retry with backoff, then `HttpException(429)` if exhausted
- `AuthenticationError` → `InternalServerErrorException` (log error, don't expose key issues)
- `BadRequestError` → `BadRequestException` (400)
- Generic `APIError` → `BadGatewayException` (502)
- All errors logged with NestJS Logger

## Retry Logic
```
Attempt 1 → fail → wait 1s
Attempt 2 → fail → wait 2s
Attempt 3 → fail → wait 4s
Attempt 4 → throw
```
Only retry on: rate limits (429), server errors (>=500), connection errors.

## Acceptance Criteria Match
- ✅ OpenAI client initialized — via ConfigService in constructor
- ✅ Test call works — `GET /ai/health` endpoint
- ✅ Errors handled gracefully — structured error mapping + retry logic
