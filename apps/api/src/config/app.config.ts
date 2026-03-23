import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
  port: Number.parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
}));

export const jwtConfig = registerAs("jwt", () => ({
  secret: process.env.JWT_SECRET || "default-secret-change-me",
  expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  refreshSecret:
    process.env.JWT_REFRESH_SECRET || "default-refresh-secret-change-me",
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
}));

export const databaseConfig = registerAs("database", () => ({
  url: process.env.DATABASE_URL,
}));

export const redisConfig = registerAs("redis", () => ({
  url: process.env.REDIS_URL || "redis://localhost:6379",
}));

export const openaiConfig = registerAs("openai", () => ({
  apiKey: process.env.OPENAI_API_KEY,
  defaultModel: process.env.OPENAI_MODEL || "gpt-4o",
  maxRetries: 3,
  retryBaseDelayMs: 1000,
}));
