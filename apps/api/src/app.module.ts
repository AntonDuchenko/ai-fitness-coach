import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { appConfig, databaseConfig, jwtConfig } from "./config/app.config";
import { validate } from "./config/env.validation";
import { AiModule } from "./modules/ai/ai.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { NutritionModule } from "./modules/nutrition/nutrition.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { UsersModule } from "./modules/users/users.module";
import { WorkoutsModule } from "./modules/workouts/workouts.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [appConfig, jwtConfig, databaseConfig],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ChatModule,
    AiModule,
    WorkoutsModule,
    NutritionModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
