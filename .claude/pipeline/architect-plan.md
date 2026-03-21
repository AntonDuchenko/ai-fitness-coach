# Architect Plan — Task 2.3: Chat Backend

## Overview
Implement the chat backend: send messages with AI response, conversation history, clear conversation, and usage tracking. Free tier limited to 5 messages/day; premium unlimited.

## Existing Infrastructure
- `ChatModule` — empty scaffold (controller + service)
- `AiService.createChatCompletion()` — calls OpenAI with retry logic
- `ContextService.buildContext()` + `buildSystemPrompt()` — builds AI context from user profile/history
- `UsersService.findById()` — fetches user (includes `isPremium`, `messagesToday`, `messagesResetAt`)
- Prisma `ChatMessage` model — `id, userId, role, content, contextUsed, model, tokens, cost, createdAt`
- Prisma `User` model — has `isPremium`, `messagesToday`, `messagesResetAt` fields

## Files to Create

### 1. DTOs (`apps/api/src/modules/chat/dto/`)

**send-message.dto.ts**
- `SendMessageDto` — `{ message: string }` with `@IsString()`, `@IsNotEmpty()`, `@MinLength(1)`, `@MaxLength(5000)`

**chat-message-response.dto.ts**
- `ChatMessageResponseDto` — `{ id, role, content, model?, tokens?, createdAt }`

**send-message-response.dto.ts**
- `SendMessageResponseDto` — `{ userMessage: ChatMessageResponseDto, aiMessage: ChatMessageResponseDto }`

**chat-history-query.dto.ts**
- `ChatHistoryQueryDto` — `{ limit?: number (default 50, max 100), offset?: number (default 0) }`

**chat-usage-response.dto.ts**
- `ChatUsageResponseDto` — `{ messagesUsedToday: number, dailyLimit: number, isPremium: boolean, remaining: number }`

### 2. Service (`apps/api/src/modules/chat/chat.service.ts`)

Methods:
- `sendMessage(userId, message)` — check limit -> save user msg -> build context -> select model -> call AI -> save AI msg -> update usage -> return both
- `getHistory(userId, limit, offset)` — paginated history
- `clearConversation(userId)` — delete all + invalidate cache
- `getUsage(userId)` — today's count and limits
- `private checkAndResetDailyLimit(userId)` — lazy reset if new day
- `private selectModel(message)` — heuristic per task spec
- `private saveMessage(userId, role, content, metadata?)` — save to DB
- `private updateUsageTracking(userId)` — increment messagesToday

Dependencies: PrismaService, AiService, ContextService, UsersService

### 3. Controller (`apps/api/src/modules/chat/chat.controller.ts`)

`@UseGuards(JwtAuthGuard)` at class level. Extract userId from JWT.

- `POST /chat/send` — body: SendMessageDto -> 201 SendMessageResponseDto
- `GET /chat/history` — query: ChatHistoryQueryDto -> 200 ChatMessageResponseDto[]
- `DELETE /chat/clear` — 204 No Content
- `GET /chat/usage` — 200 ChatUsageResponseDto

### 4. Module update (`chat.module.ts`)

Import: AiModule, UsersModule

## Implementation Order
1. Create all DTOs
2. Implement ChatService with all methods
3. Implement ChatController with all endpoints
4. Update ChatModule imports

## Convention Compliance
- Thin controller, all logic in service
- class-validator on all DTOs, Swagger on every endpoint
- HTTP codes: 201, 200, 204, 403
- JwtAuthGuard for auth
- No `any` types
