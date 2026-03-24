import { ApiProperty } from "@nestjs/swagger";

export class StripeHealthResponseDto {
  @ApiProperty({ description: "Whether Stripe is configured", example: true })
  configured!: boolean;

  @ApiProperty({
    description: "Whether Stripe API connection is healthy",
    example: true,
  })
  connected!: boolean;

  constructor(partial: Partial<StripeHealthResponseDto>) {
    Object.assign(this, partial);
  }
}
