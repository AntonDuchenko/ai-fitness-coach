import { Module } from "@nestjs/common";
import { AiModule } from "../ai/ai.module";
import { ContextModule } from "../ai/context.module";
import { UsersModule } from "../users/users.module";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

@Module({
  imports: [AiModule, ContextModule, UsersModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
