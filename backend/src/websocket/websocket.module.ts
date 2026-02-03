import { Module } from '@nestjs/common';
import { EventsGateway } from './gateways/events.gateway';
import { AuthModule } from 'src/domain/auth/auth.module';
import { UserModule } from 'src/domain/user/user.module';

@Module({
    imports: [
        AuthModule,
        UserModule
    ],
    providers: [
        EventsGateway
    ]
})
export class WebsocketModule {}
