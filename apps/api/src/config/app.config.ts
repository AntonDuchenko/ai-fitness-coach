import { registerAs } from "@nestjs/config";

export const appConfig = registerAs("app", () => ({
  port: Number.parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
}));

export const jwtConfig = registerAs("jwt", () => ({
  secret: process.env.JWT_SECRET || "default-secret-change-me",
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
}));

export const databaseConfig = registerAs("database", () => ({
  url: process.env.DATABASE_URL,
}));

export const redisConfig = registerAs("redis", () => ({
  url: process.env.REDIS_URL || "redis://localhost:6379",
}));
