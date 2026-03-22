import { BullModule } from "@nestjs/bull";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  appConfig,
  databaseConfig,
  jwtConfig,
  openaiConfig,
  redisConfig,
} from "./config/app.config";
import { validate } from "./config/env.validation";
import { AiModule } from "./modules/ai/ai.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { NutritionModule } from "./modules/nutrition/nutrition.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { PlanGenerationModule } from "./modules/plan-generation/plan-generation.module";
import { UsersModule } from "./modules/users/users.module";
import { WorkoutsModule } from "./modules/workouts/workouts.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [appConfig, jwtConfig, databaseConfig, redisConfig, openaiConfig],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>("redis.url");
        const url = new URL(redisUrl || "redis://localhost:6379");
        return {
          redis: {
            host: url.hostname,
            port: Number(url.port) || 6379,
            password: url.password || undefined,
          },
        };
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ChatModule,
    AiModule,
    WorkoutsModule,
    NutritionModule,
    PlanGenerationModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
