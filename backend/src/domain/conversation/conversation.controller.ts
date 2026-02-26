import { Controller, Get, Param, Post, Body, Query } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";

@Controller('conversations')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {}

    @Get()
    getUserConversations(@Query('userId') userId: string) {
        return this.conversationService.getUserConversations(userId);
    }

    @Get(':conversationId')
    getConversationById(@Param('conversationId') conversationId: string) {
        return this.conversationService.getConversationById(conversationId);
    }

    @Post() // Called in frontend when 2 people add each other as friends, or when a user creates a group conversation
    createConversation(@Body() createConversationDto: CreateConversationDto) {
        return this.conversationService.createConversation(createConversationDto);
    }
}