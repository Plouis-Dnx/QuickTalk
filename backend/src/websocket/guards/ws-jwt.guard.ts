import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {

  // Inject JwtService to verify tokens
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> { // WebSocket context

    // Extract the client socket from the context
    const client: Socket = context.switchToWs().getClient();

    // Extract token from handshake auth or headers
    const token = client.handshake?.auth?.token || client.handshake?.headers?.authorization?.split(' ')[1];

    if (!token) throw new WsException('Missing token');

    try {

      const payload = await this.jwtService.verifyAsync(token); // Verify token
      client.data.user = payload; // Attach user info to client data
      return true;

    } catch {

      throw new WsException('Invalid token');

    }
  }
}
