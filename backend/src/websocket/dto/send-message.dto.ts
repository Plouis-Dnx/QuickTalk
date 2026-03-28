import { IsString, MinLength } from "class-validator";

// This is a minimal DTO for a first version. It can be extended later with more features.

export class SendMessageDto {
  @IsString()
  conversationId: string;

  @IsString()
  @MinLength(1)
  content: string;
}