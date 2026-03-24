import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { StripeService } from "./stripe.service";

@Module({
  imports: [UsersModule],
  controllers: [PaymentsController],
  providers: [StripeService, PaymentsService],
  exports: [StripeService, PaymentsService],
})
export class PaymentsModule {}
