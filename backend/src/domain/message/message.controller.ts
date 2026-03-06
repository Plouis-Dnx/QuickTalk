import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    // Create a route so frontend can fetch messages for a conversation
    @Get(':conversationId')
    async getMessages(@Param('conversationId') conversationId: string): Promise<Message[]> {
        return this.messageService.getMessages(conversationId);
    }

    // Messages are created via WebSocket
}
