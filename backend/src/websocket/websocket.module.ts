import { Module } from '@nestjs/common';
import { AuthModule } from 'src/domain/auth/auth.module';
import { UserModule } from 'src/domain/user/user.module';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatService } from './services/chat.service';
import { MessageModule } from 'src/domain/message/message.module';
import { ConversationModule } from 'src/domain/conversation/conversation.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          })
        }),

        AuthModule, // JWT validation and user authentication
        UserModule, // User management and retrieval for associating socket connections with user data
        MessageModule, // Message management for storing and retrieving chat messages
        ConversationModule // Conversation management for handling chat rooms and user conversations
    ],
    providers: [ChatService, ChatGateway]
})
export class WebsocketModule {}