import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth/auth.module';
import { UserModule } from 'src/domain/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
    imports: [
        AuthModule, // JWT validation and user authentication
        UserModule // User management and retrieval for associating socket connections with user data
    ],
    providers: [
        ChatGateway
    ]
})
export class WebsocketModule {}
