import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get(':conversationId')
    async getMessagesByConversationId(@Param('conversationId') conversationId: string) : Promise<Message[]> {
        return this.messageService.getConversationMessages(conversationId);
    }
}
