import { inject, Injectable } from "@angular/core";
import { MessageApi } from "../../core/api/message.api";
import { Message } from "../models/message.model";
import { BehaviorSubject, of, switchMap } from "rxjs";

@Injectable({providedIn: 'root'})
export class MessageService {
    private messageApi = inject(MessageApi);

    selectedConversationId = new BehaviorSubject<string | null>(null);

    messages = this.selectedConversationId.pipe(
        switchMap(id => id ? this.messageApi.getMessages(id) : of([] as Message[]))
    );

    // Method to change the conversation id
    selectConversation(id: string) {
        this.selectedConversationId.next(id);
    };
}