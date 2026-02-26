import { Module } from "@nestjs/common";
import { ConversationSchema, Conversation } from "./conversation.schema";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";
import { ConversationService } from "./conversation.service";
import { ConversationController } from "./conversation.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema}])],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [MongooseModule, ConversationService]
})
export class ConversationModule {}
