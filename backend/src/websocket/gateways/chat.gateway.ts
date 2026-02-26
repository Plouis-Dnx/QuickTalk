import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from '../dto/send-message.dto';
import { WsUser } from '../decorators/ws-user.decorator';
import { ChatService } from '../services/chat.service';

import { 
  MessageBody,
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  WsException
} from '@nestjs/websockets';

@WebSocketGateway({cors: { origin: '*' }, namespace: 'chat', transports: ['websocket']})
@UseGuards(WsJwtGuard) // Only authenticated users can access this gateway

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server; // Socket.io server instance

  constructor(private chatService: ChatService){}

  async handleConnection(client: Socket) {
    const user = client.data.user; // Retrieve the authenticated user from the socket's data (set by the WsJwtGuard)
    console.log(`${user.email} connected to chat (socket: ${client.id})`);
    
    await this.chatService.handleConnection(client);
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user; 
    console.log(`${user?.email} disconnected from chat (socket: ${client.id})`);

    if (user) await this.chatService.handleDisconnect(client);
  }

  // This method will handle incoming messages from clients
  @SubscribeMessage('sendMessage')
  @UsePipes(new ValidationPipe()) // Validate incoming data against the SendMessageDto
  async handleSendMessage( 
    @MessageBody() data: SendMessageDto, 
    @WsUser() user: any
  ) {
    try {
      await this.chatService.sendMessage(
        this.server,
        user.sub,
        data.conversationId,
        data.content
      );
    }
    catch (error) {
      throw new WsException(error.message || 'Failed to send message');
    }
  }
}