import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Conversation, ConversationDocument } from '../conversation/conversation.schema';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>
    ) {}

    // Save message to database
    async createMessage(message: CreateMessageDto): Promise<Message> {
        const {conversationId, senderId, content} = message;

        // Check if the conversation exists
        const conversation = await this.conversationModel.findById(conversationId);
        if (!conversation) throw new NotFoundException('Conversation not found');

        // Create and save message
        const createdMessage = new this.messageModel({
            _conversation: conversationId,
            sender: senderId,
            content
        });
        
        // Update conversation's lastMessage
        conversation.last_message = createdMessage._id;
        await conversation.save();
        
        return createdMessage.save();
    }

    // Retrieve messages from database
    async getMessages(conversationId: string): Promise<Message[]> {
        // Check if the conversation exists
        const conversation = await this.conversationModel.findById(conversationId);
        if (!conversation) throw new NotFoundException('Conversation not found');

        return this.messageModel 
            .find({_conversation: conversationId})
            .sort({createdAt: 1}) // Sort messages by creation time
            .populate('sender', 'name email') // Populate sender's name and email
    }
}
