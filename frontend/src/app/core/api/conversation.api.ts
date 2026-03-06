import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { CreateConversationDto } from "../dto/create-conversation.dto";
import { Conversation } from "../../shared/models/conversation.model";

@Injectable({providedIn: 'root'})
export class ConversationApi {
    private http = inject(HttpClient);

    getConversation(conversationId: string): Observable<Conversation> {
        return this.http.get<Conversation>(`${environment.apiUrl}/conversations?userId=${conversationId}`);
    }

    getUserConversations(userId: string): Observable<Conversation[]> {
        return this.http.get<Conversation[]>(`${environment.apiUrl}/conversations/user?userId=${userId}`);
    }

    createConversation(dto: CreateConversationDto): Observable<Conversation> {
        return this.http.post<Conversation>(`${environment.apiUrl}/conversations`, dto);
    }
}