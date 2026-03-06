export interface CreateConversationDto {
    name: string;
    creatorId: string;
    isGroup: boolean;
    members: string[]; 
    conversationPicture?: string;
}