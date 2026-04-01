import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SendMessageDto {
  @ApiProperty({
    example: "What exercises should I do today?",
    minLength: 1,
    maxLength: 5000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5000)
  message!: string;

  @ApiPropertyOptional({ example: "clxyz123" })
  @IsOptional()
  @IsString()
  conversationId?: string;
}
