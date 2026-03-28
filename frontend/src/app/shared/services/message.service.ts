import { inject, Injectable } from "@angular/core";
import { MessageApi } from "../../core/api/message.api";
import { Message } from "../models/message.model";
import { BehaviorSubject, of, switchMap } from "rxjs";

@Injectable({providedIn: 'root'})
export class MessageService {
    private messageApi = inject(MessageApi);

    selectedConversationId = new BehaviorSubject<string | null>(null);
    private messagesSubject = new BehaviorSubject<Message[]>([]);
    messages$ = this.messagesSubject.asObservable();

    constructor () {
        // Load messages from api when switching conversation
        this.selectedConversationId
        .pipe(
            switchMap(id => id ? this.messageApi.getMessages(id): of([] as Message[]))
        )
        .subscribe(
            messages => this.messagesSubject.next(messages)
        );
    }

    // Method to change the conversation id
    selectConversation(id: string) {
        this.selectedConversationId.next(id);
    };

    // Called when a new message is send via WebSocket
    appendMessage(message: Message) {
        const currentMessage = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessage, message]);
    }
}