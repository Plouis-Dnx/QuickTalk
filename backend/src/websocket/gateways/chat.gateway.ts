import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from '../dto/send-message.dto';
import { WsUser } from '../decorators/ws-user.decorator';
import { ChatService } from '../services/chat.service';

import { 
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  WsException
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({cors: { origin: '*' }, namespace: 'chat', transports: ['websocket']})
@UseGuards(WsJwtGuard) // Only authenticated users can access this gateway

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server; // Socket.io server instance

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService
  ){}

  async handleConnection(client: Socket) {
    try {
      // Extract token from handshake (either from auth or headers)
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
      if(!token) {
        client.disconnect();
        return;
      }

      // Validate token and extract user info
      const payload = await this.jwtService.verifyAsync(token);
      
      // Store user info in socket data for later use
      client.data.user = payload;
      
      console.log(`${payload.email} connected to chat (socket: ${client.id})`);
      await this.chatService.handleConnection(client);
    }
    catch (error) {
      console.error('Connection error:', error.message);
      client.disconnect();
    }
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

  @SubscribeMessage('joinConversation')
  handleJoinConversation(@MessageBody() data: { conversationId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.conversationId);
    console.log(`Client ${client.id} joined conversation ${data.conversationId}`);
  }
}