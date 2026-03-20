# Architect Plan: Task 1.1 — Authentication Backend

## Task Summary
Implement JWT-based authentication with signup, login, and protected route endpoints.

## Current State
- Prisma User model exists with `email`, `passwordHash`, `name`, relations to `UserProfile`
- Empty `AuthModule`, `AuthController`, `AuthService`
- Empty `UsersModule`, `UsersService`
- Dependencies installed: `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`, `class-validator`
- JWT config registered in ConfigModule (`jwt.secret`, `jwt.expiresIn`)
- Swagger already configured with `addBearerAuth()`
- Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, `transform`

## Implementation Plan

### 1. Create DTOs (`apps/api/src/modules/auth/dto/`)

**signup.dto.ts:**
- `email: string` — `@IsEmail()`
- `password: string` — `@IsString()`, `@MinLength(8)`
- `name?: string` — `@IsString()`, `@IsOptional()`
- Swagger decorators: `@ApiProperty()`

**login.dto.ts:**
- `email: string` — `@IsEmail()`
- `password: string` — `@IsString()`
- Swagger decorators

**auth-response.dto.ts:**
- `accessToken: string`
- `user: UserResponseDto`

**user-response.dto.ts (in users module):**
- `id`, `email`, `name`, `isPremium`, `createdAt`
- No sensitive fields (passwordHash)

### 2. Create JWT Strategy (`apps/api/src/modules/auth/strategies/jwt.strategy.ts`)
- Extends `PassportStrategy(Strategy)`
- Extracts JWT from Bearer token in Authorization header
- Validates payload, returns `{ id, email }` as `req.user`
- Injects `ConfigService` for JWT secret

### 3. Create JwtAuthGuard (`apps/api/src/common/guards/jwt-auth.guard.ts`)
- Extends `AuthGuard('jwt')` from `@nestjs/passport`

### 4. Implement UsersService (`apps/api/src/modules/users/users.service.ts`)
- `findByEmail(email: string)` — find user by email
- `findById(id: string)` — find user by id
- `create(data: { email, passwordHash, name? })` — create user + empty profile is not needed at signup
- Injects `PrismaService`

### 5. Update UsersModule
- Import/export `UsersService` (already done, but ensure PrismaService is available via global module)

### 6. Implement AuthService (`apps/api/src/modules/auth/auth.service.ts`)
- `signup(dto: SignupDto)` — check email uniqueness, hash password, create user, return JWT
- `login(dto: LoginDto)` — validate credentials, return JWT
- `getMe(userId: string)` — return current user data
- Injects: `UsersService`, `JwtService`, `ConfigService`
- Password hashing: `bcrypt.hash(password, 10)`, `bcrypt.compare()`
- JWT payload: `{ sub: user.id, email: user.email }`

### 7. Update AuthModule (`apps/api/src/modules/auth/auth.module.ts`)
- Import `JwtModule.registerAsync()` with config from `ConfigService`
- Import `PassportModule`
- Import `UsersModule`
- Register `JwtStrategy` as provider

### 8. Implement AuthController (`apps/api/src/modules/auth/auth.controller.ts`)
- `POST /auth/signup` — `@Body() dto: SignupDto` → `authService.signup(dto)`
- `POST /auth/login` — `@Body() dto: LoginDto` → `authService.login(dto)`
- `GET /auth/me` — `@UseGuards(JwtAuthGuard)`, `@Request() req` → `authService.getMe(req.user.id)`
- Swagger: `@ApiTags('Auth')`, `@ApiOperation()`, `@ApiResponse()`, `@ApiBearerAuth()`
- Proper HTTP status codes: 201 for signup, 200 for login/me, 401 for unauthorized

### 9. Error Handling
- `ConflictException` — email already exists (409)
- `UnauthorizedException` — wrong credentials (401)
- Standard NestJS exception filters handle the rest

## File Changes
| Action | File | Description |
|--------|------|-------------|
| Create | `apps/api/src/modules/auth/dto/signup.dto.ts` | Signup DTO |
| Create | `apps/api/src/modules/auth/dto/login.dto.ts` | Login DTO |
| Create | `apps/api/src/modules/auth/dto/auth-response.dto.ts` | Auth response DTO |
| Create | `apps/api/src/modules/auth/strategies/jwt.strategy.ts` | JWT passport strategy |
| Create | `apps/api/src/common/guards/jwt-auth.guard.ts` | JWT auth guard |
| Create | `apps/api/src/modules/users/dto/user-response.dto.ts` | User response DTO (no sensitive data) |
| Modify | `apps/api/src/modules/users/users.service.ts` | Add findByEmail, findById, create |
| Modify | `apps/api/src/modules/auth/auth.service.ts` | Implement signup, login, getMe |
| Modify | `apps/api/src/modules/auth/auth.module.ts` | Register JWT, Passport, imports |
| Modify | `apps/api/src/modules/auth/auth.controller.ts` | Add endpoints with Swagger |
| Modify | `apps/api/src/modules/users/users.module.ts` | Ensure exports are correct |

## Key Decisions
- JWT payload contains `{ sub: user.id, email: user.email }` — minimal, standard
- Token expiry from config (default 7d)
- No refresh token for MVP — single access token
- No logout endpoint for MVP (stateless JWT)
- UserProfile is NOT created at signup — created during onboarding (Task 1.3)
- Password validation: minimum 8 characters (as per task spec)
