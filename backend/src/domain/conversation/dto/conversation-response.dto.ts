export class ConversationResponseDto {
    id: string;
    name: string;
    isGroup: boolean;
    lastMessage?: string;
    conversationPicture?: string;
    members: string[];
}