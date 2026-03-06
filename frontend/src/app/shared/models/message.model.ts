export interface Message {
    _id: string; // Message id
    _conversation: string; // Link to a conversation (Where to send the message)
    sender: string; // User id
    conctent: string;
}