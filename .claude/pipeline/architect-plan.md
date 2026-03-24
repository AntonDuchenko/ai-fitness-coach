# Architect Plan — Task 6.2: Checkout Flow Backend

## Overview
Add checkout session creation, Stripe webhook handling, customer portal session, and subscription query endpoints to the existing payments module.

## Acceptance Criteria (from TASKS.md)
- Can create checkout session
- Webhooks process correctly
- User upgraded to Premium on payment
- Customer portal works
- Cancellation works

## Architecture Decisions

1. **Raw body for webhooks**: Stripe webhook signature verification needs the raw request body. Enable `rawBody: true` in `NestFactory.create()` options. The webhook endpoint will NOT use `JwtAuthGuard` — it authenticates via Stripe signature.

2. **Idempotent webhook processing**: Store each Stripe event in `StripeEvent` table before processing. Check for duplicates by `eventId` to prevent double-processing.

3. **Service layer separation**: All business logic in `PaymentsService`. Controller is thin — validates input, delegates, returns response.

4. **UsersModule import**: PaymentsModule needs `UsersService.findById()` to look up user email for checkout and stripeCustomerId for portal.

## File Changes

### 1. `apps/api/src/main.ts` (MODIFY)
- Add `rawBody: true` option to `NestFactory.create()` for Stripe webhook signature verification

### 2. `apps/api/src/modules/payments/dto/create-checkout-session.dto.ts` (NEW)
- `CreateCheckoutSessionDto` with `priceId: string` (class-validator `@IsString()`, `@IsNotEmpty()`)
- Swagger decorators

### 3. `apps/api/src/modules/payments/dto/checkout-session-response.dto.ts` (NEW)
- `CheckoutSessionResponseDto` with `sessionId: string`, `url: string`
- Swagger decorators

### 4. `apps/api/src/modules/payments/dto/portal-session-response.dto.ts` (NEW)
- `PortalSessionResponseDto` with `url: string`
- Swagger decorators

### 5. `apps/api/src/modules/payments/dto/subscription-response.dto.ts` (NEW)
- `SubscriptionResponseDto` with `isPremium`, `subscriptionStatus`, `subscriptionId`, `subscriptionEndsAt`, `currentPeriodEnd`
- Swagger decorators

### 6. `apps/api/src/modules/payments/stripe.service.ts` (MODIFY)
- Add `getWebhookSecret(): string | undefined`

### 7. `apps/api/src/modules/payments/payments.service.ts` (MODIFY)
- Add `createCheckoutSession(userId: string, priceId: string)` — looks up user, creates Stripe checkout session
- Add `handleWebhook(rawBody: Buffer, signature: string)` — verifies signature, stores event, dispatches to handlers
- Add `handleCheckoutComplete(session)` — updates user to premium
- Add `handleSubscriptionUpdate(subscription)` — updates subscription status
- Add `handleSubscriptionCancel(subscription)` — marks subscription canceled
- Add `handlePaymentFailed(invoice)` — updates status to past_due
- Add `createPortalSession(userId: string)` — creates billing portal session
- Add `getSubscription(userId: string)` — returns current subscription info

### 8. `apps/api/src/modules/payments/payments.controller.ts` (MODIFY)
- Add `POST /payments/create-checkout-session` — JwtAuthGuard, body: CreateCheckoutSessionDto
- Add `POST /payments/webhook` — no auth guard, raw body, Stripe signature header
- Add `POST /payments/create-portal-session` — JwtAuthGuard
- Add `GET /payments/subscription` — JwtAuthGuard
- Full Swagger decorators on all endpoints

### 9. `apps/api/src/modules/payments/payments.module.ts` (MODIFY)
- Import `UsersModule` to access `UsersService`

## Endpoint Summary

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /payments/create-checkout-session | JWT | Create Stripe checkout session |
| POST | /payments/webhook | Stripe sig | Handle Stripe webhook events |
| POST | /payments/create-portal-session | JWT | Create billing portal session |
| GET | /payments/subscription | JWT | Get current subscription info |

## Convention Compliance
- Thin controller: validate -> delegate -> return
- Service layer: all business logic, Prisma for DB
- DTOs: class-validator decorators, separate request/response DTOs
- Swagger: @ApiTags, @ApiOperation, @ApiResponse on every endpoint
- Proper HTTP codes: 201 for session creation, 200 for queries, 400 for bad webhook signature
- Guards for auth (JwtAuthGuard on protected endpoints)
- No `any` types — use Stripe SDK types
- Idempotent webhook processing via StripeEvent table
