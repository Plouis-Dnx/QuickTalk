import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { ConversationService } from "../../domain/conversation/conversation.service";
import { MessageService } from "../../domain/message/message.service";

@Injectable()
export class ChatService{
  // This service will handle the business logic related to chat, such as managing chat rooms, storing messages, etc.

  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService 
  ) {}

  async handleConnection(client: Socket) {
    const user = client.data.user;
  
    // Fetch user's conversations 
    const conversations = await this.conversationService.getUserConversations(user.sub);

    // Join each conversation room
    conversations.forEach(conversation => client.join(conversation._id.toString()));
  }

  async handleDisconnect(client: Socket) {} // Socket.io automatically handles leaving rooms on disconnect

  async sendMessage(server: Server, userId: string, conversationId: string, content: string) {
    /* server: The Socket.io server instance to emit the message to the conversation room 
     * userId: The ID of the user sending the message
     * conversationId: The ID of the conversation to which the message belongs
     * content: The content of the message being sent
    */

    try {
      // Save the message in database 
      const message = await this.messageService.createMessage(userId, conversationId, content);
    
      // Emit the message to all clients in the conversation room
      server.to(conversationId).emit('newMessage', {
        messageId: message._id.toString(),
        conversationId: message._conversation.toString(),
        senderId: message.sender.toString(),
        content: message.content,
        createdAt: message.createdAt
      });

      console.log(`Message successfully sent to conversation ${conversationId} by user ${userId}`);
      return message; // Return the message object so the gateway can send back a success response to the sender
    } 
    catch (error) {
      console.error('Error sending message:', error);
      throw error; 
    }
  }
}