import { IsString, IsUUID, IsNotEmpty, IsBoolean, IsOptional, IsArray } from 'class-validator'

export class CreateConversationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsOptional()
    creatorId: string; // Required only if it's a group conversation

    @IsUUID()
    @IsArray()
    @IsNotEmpty()
    members: string[];

    @IsNotEmpty()
    @IsBoolean()
    isGroup: boolean;

    @IsOptional()
    @IsString()
    conversationPicture?: string;

    @IsOptional()
    @IsString()
    lastMessageId?: string; // This can only be set after the conversation is created and a message is sent
}