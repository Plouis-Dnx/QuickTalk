import { Observable } from "rxjs";
import { User } from "./user.model";

export interface Message {
    id: string; // Message id
    conversationId: string; // Link to a conversation (Where to send the message)
    sender: Observable<User>; 
    content: string;
}