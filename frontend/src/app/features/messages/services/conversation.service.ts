import { inject, Injectable } from "@angular/core";
import { ConversationApi } from "../../../core/api/conversation.api";
import { UserService } from "./user.service";
import { Conversation } from "../../../shared/models/conversation.model";
import { Observable, switchMap, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class ConversationService {
    private conversationApi = inject(ConversationApi);
    private userService = inject(UserService);

    getUserConversations(): Observable<Conversation[]> {
        return this.userService.getMe().pipe(
            /* switchMap enables to chain 2 Observables together
             * When the first one emits a value, it launches the second 
             * one with this value */
            tap(user => console.log('[ConversationService] User retrieved:', user)),
            switchMap(user => this.conversationApi.getUserConversations(user.id)),
            tap(conversations => console.log('[ConversationService] Conversations retrieved:', conversations)),
        );
    }
}