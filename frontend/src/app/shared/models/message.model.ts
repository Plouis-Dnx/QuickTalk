import { User } from "./user.model";

export interface Message {
    _id?: string; // Message id
    conversationId: string; // Link to a conversation (Where to send the message)
    sender: User;
    content: string;
}