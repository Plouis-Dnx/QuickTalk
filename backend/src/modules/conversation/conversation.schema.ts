import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';
import { Message } from '../message/message.schema';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
    @Prop({required: true}) name: string;

    @Prop({required: true, unique: true, type: Types.ObjectId, ref: Message.name})
    last_message: Types.ObjectId;

    @Prop({required: true, type: [Types.ObjectId], ref: User.name}) 
    members: Types.ObjectId[];

    @Prop({required: true, default: false}) is_group: boolean;

    @Prop({
        required: function(this: any){ return this.is_group }, 
        type:[Types.ObjectId], 
        ref: User.name
    }) 
    admins: Types.ObjectId[];

    @Prop({required: false}) conversation_picture: string;

    // createdAt, updatedAt (created automatically with timestamps)
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);