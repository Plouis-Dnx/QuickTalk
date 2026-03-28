import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop({ required: true, type: Types.ObjectId, ref: "Conversation" }) 
    _conversation: Types.ObjectId;

    @Prop({required: true, type: Types.ObjectId, ref: User.name })
    sender: Types.ObjectId;

    @Prop() 
    content: string;

    // createdAt, updatedAt (created automatically with timestamps)
}

export const MessageSchema = SchemaFactory.createForClass(Message);