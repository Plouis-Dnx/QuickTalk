export interface Conversation {
    id: string;
    name: string;
    isGroup: boolean;
    members: string[];
    lastMessage?: string;
    conversationPicture?: string;
}