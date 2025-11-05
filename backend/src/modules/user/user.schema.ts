import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, unique: true }) googleId: string; // Google user ID

  @Prop({ required: true }) username: string;

  @Prop({ required: true, unique: true }) email: string;

  @Prop() profile_picture?: string;

  @Prop() biography?: string;

  @Prop({ default: true }) visibility: boolean; // public by default

  // createdAt, updatedAt (created automatically with timestamps)
}

export const UserSchema = SchemaFactory.createForClass(User);