export interface Message {
    id: string; // Message id
    conversationId: string; // Link to a conversation (Where to send the message)
    sender: string; // user ID 
    content: string;
}