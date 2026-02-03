import { UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WsJwtGuard } from '../guards/ws-jwt.guard';
import { Server } from 'http';

@WebSocketGateway({cors: { origin: '*' }, namespace: 'chat', transports: ['websocket']})
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    // Handle new connection
  }

  handleDisconnect(client: any) {
    // Handle disconnection
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, payload: any): void {
    // Handle incoming message
  }
}
