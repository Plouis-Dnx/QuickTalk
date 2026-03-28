export interface Message {
    _id?: string; // Message id
    conversationId: string; // Link to a conversation (Where to send the message)
    senderId: string; // user ID 
    content: string;
}