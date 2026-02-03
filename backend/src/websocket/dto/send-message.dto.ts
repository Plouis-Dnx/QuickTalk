import { IsUUID, IsString, MinLength } from "class-validator";

export class SendMessageDto {
  @IsUUID()
  conversationId: string;

  @IsString()
  @MinLength(1)
  content: string;
}