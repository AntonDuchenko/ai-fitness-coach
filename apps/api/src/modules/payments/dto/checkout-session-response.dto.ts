import { ApiProperty } from "@nestjs/swagger";

export class CheckoutSessionResponseDto {
  @ApiProperty({
    description: "Stripe checkout session ID",
    example: "cs_test_abc123",
  })
  sessionId!: string;

  @ApiProperty({
    description: "URL to redirect user to Stripe checkout",
    example: "https://checkout.stripe.com/c/pay/cs_test_abc123",
  })
  url!: string;

  constructor(partial: Partial<CheckoutSessionResponseDto>) {
    Object.assign(this, partial);
  }
}
