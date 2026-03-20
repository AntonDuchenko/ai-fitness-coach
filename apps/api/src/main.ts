import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: configService.get<string>(
      "app.frontendUrl",
      "http://localhost:3000",
    ),
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("AI Fitness Coach API")
    .setDescription("Backend API for AI Fitness Coach")
    .setVersion("0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = configService.get<number>("app.port", 4000);
  await app.listen(port);
}

bootstrap();
