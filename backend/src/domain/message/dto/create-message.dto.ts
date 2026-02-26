import {IsString, IsNotEmpty, IsUUID} from 'class-validator';

export class CreateMessageDto {
    @IsUUID()
    @IsNotEmpty()
    conversationId: string;

    @IsUUID()
    @IsNotEmpty()
    senderId: string;

    @IsString()
    content?: string;
}