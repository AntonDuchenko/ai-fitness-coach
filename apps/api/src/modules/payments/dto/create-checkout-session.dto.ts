import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: "Stripe price ID for the subscription plan",
    example: "price_1abc123",
  })
  @IsString()
  @IsNotEmpty()
  priceId!: string;
}
