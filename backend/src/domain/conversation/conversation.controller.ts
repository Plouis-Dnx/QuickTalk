import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { ConversationResponseDto } from "./dto/conversation-response.dto";
import { ConversationDocument } from "./conversation.schema";

@Controller('conversations')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {}

    private toResponseDto(conversation: ConversationDocument): ConversationResponseDto {
        return {
            id: conversation._id.toString(),
            name: conversation.name,
            isGroup: conversation.is_group,
            lastMessage: conversation.last_message?.toString(),
            conversationPicture: conversation.conversation_picture,
            members: conversation.members.map(member => member.toString())
        };
    }

    @Get('user')
    async getUserConversations(@Query('userId') userId: string): Promise<ConversationResponseDto[]> {
        const conversations = await this.conversationService.getUserConversations(userId);
        return conversations.map(conv => this.toResponseDto(conv));
    }

    @Get()
    async getConversationById(@Query('conversationId') conversationId: string): Promise<ConversationResponseDto> {
        const conversation = await this.conversationService.getConversationById(conversationId);
        return this.toResponseDto(conversation);
    }

    @Post() // Called in frontend when 2 people add each other as friends, or when a user creates a group conversation
    async createConversation(@Body() createConversationDto: CreateConversationDto): Promise<ConversationResponseDto> {
        const conversation = await this.conversationService.createConversation(createConversationDto);
        return this.toResponseDto(conversation);
    }
}