import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";

export class ChatMessageDto {
  @ApiProperty({ enum: ["system", "user", "assistant"] })
  @IsEnum(["system", "user", "assistant"])
  role!: "system" | "user" | "assistant";

  @ApiProperty({ example: "Hello, how can I help you?" })
  @IsString()
  content!: string;
}

export class ChatCompletionRequestDto {
  @ApiProperty({ type: [ChatMessageDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages!: ChatMessageDto[];

  @ApiPropertyOptional({ example: "gpt-4o" })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 0.7 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({ example: 1024 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(16384)
  maxTokens?: number;
}
