# Architect Plan — Task 6.1: Stripe Setup

## Overview
Set up Stripe SDK integration in the NestJS backend. This is a backend-only task — no frontend UI changes.

## Acceptance Criteria (from TASKS.md)
- Stripe client initialized
- Test API calls work
- Products created in Stripe (config for price IDs)

## File Changes

### 1. Install dependency
```bash
cd apps/api && pnpm add stripe
```

### 2. `apps/api/src/config/app.config.ts` (MODIFY)
- Add `stripeConfig` registerAs factory with:
  - `secretKey` from `STRIPE_SECRET_KEY`
  - `webhookSecret` from `STRIPE_WEBHOOK_SECRET`
  - `priceIdMonthly` from `STRIPE_PRICE_ID_MONTHLY`
  - `priceIdAnnual` from `STRIPE_PRICE_ID_ANNUAL`

### 3. `apps/api/src/config/env.validation.ts` (MODIFY)
- Add `STRIPE_PRICE_ID_MONTHLY` and `STRIPE_PRICE_ID_ANNUAL` as optional strings

### 4. `apps/api/src/app.module.ts` (MODIFY)
- Import `stripeConfig` in ConfigModule.forRoot load array

### 5. `apps/api/src/modules/payments/stripe.service.ts` (NEW)
- Injectable service
- Constructor: inject ConfigService, initialize `Stripe` client
- `getClient(): Stripe` — exposes the initialized client
- `testConnection(): Promise<boolean>` — calls stripe.customers.list({limit:1}) to verify key

### 6. `apps/api/src/modules/payments/payments.service.ts` (MODIFY)
- Inject `StripeService` and `PrismaService`
- Add `testConnection()` method
- Add `getProducts()` method to list Stripe products/prices

### 7. `apps/api/src/modules/payments/dto/` (NEW directory)
- `stripe-health-response.dto.ts` — response DTO for health check
- `product-response.dto.ts` — response DTO for products/prices

### 8. `apps/api/src/modules/payments/payments.controller.ts` (MODIFY)
- Add `GET /payments/health` — verify Stripe connection (JwtAuthGuard)
- Add `GET /payments/products` — list products/prices (public)
- Full Swagger decorators

### 9. `apps/api/src/modules/payments/payments.module.ts` (MODIFY)
- Add `StripeService` to providers and exports
- Import `UsersModule` for future use

## Convention Compliance
- Thin controller: validate -> delegate -> return
- Service layer: all business logic
- Swagger: @ApiTags, @ApiOperation, @ApiResponse on every endpoint
- ConfigService for all env access (no raw process.env)
- No `any` types
- Proper HTTP codes and error responses
