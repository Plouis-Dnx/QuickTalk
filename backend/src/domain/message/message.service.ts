import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    // Messages are saved to database via WebSocket (ChatService)

    // Retrieve messages from database
    async getConversationMessages(conversationId: string, page: number = 1, limit: number = 50): Promise<MessageDocument[]> {
    return this.messageModel
        .find({ _conversation: conversationId })
        .sort({ createdAt: -1 })  // Sort by newest first
        .skip((page - 1) * limit)  // Pagination
        .limit(limit)
        .populate('sender', 'name email')  // Sender details
        .exec();
    }
}
