import { Injectable } from '@nestjs/common';
import { SendMessageDto } from 'src/websocket/dto/send-message.dto';

@Injectable()
export class MessageService {
    async createMessage(userId: string, conversationId: string, content: string) {
        // This method should create a new message in the database and return the created message object.
        // For simplicity, we'll return a mock message object here, but in a real implementation, you would save this to your database and return the saved message.
        return {
            _id: 'mockMessageId',
            _conversation: conversationId,
            sender: userId,
            content: content,
            createdAt: new Date()
        };
    }
}
