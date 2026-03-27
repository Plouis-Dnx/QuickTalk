import { IsString, IsUUID, IsNotEmpty, IsBoolean, IsOptional, IsArray } from 'class-validator'

export class CreateConversationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    creatorId?: string; // Required only if it's a group conversation

    @IsString({each: true}) // Vvalidates each element of the array as a string
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