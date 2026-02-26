import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConversationModule } from "./conversation/conversation.module";
import { MessageModule } from "./message/message.module";

@Module({
    imports: [
        UserModule,
        AuthModule,
        MessageModule,
        ConversationModule
    ],
    exports: [
        UserModule, 
        AuthModule, 
        MessageModule,
        ConversationModule
    ]
})
export class DomainModule {}