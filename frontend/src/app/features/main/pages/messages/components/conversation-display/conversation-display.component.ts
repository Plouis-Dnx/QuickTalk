import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MessageService } from "../../../../../../shared/services/message.service";
import { UserService } from "../../../../../../shared/services/user.service";
import { User } from "../../../../../../shared/models/user.model";
import { WebsocketService } from "../../../../../../shared/services/websocket.service";
import { Message } from "../../../../../../shared/models/message.model";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-conversation-display',
    templateUrl: './conversation-display.component.html',
    imports: [AsyncPipe, FormsModule]
})
export class ConversationDisplayComponent implements OnInit, OnDestroy {
    private messageService = inject(MessageService);
    private userService = inject(UserService);
    private websocketService = inject(WebsocketService);

    messages = this.messageService.messages$;
    me!: User;
    newMessage = '';

    ngOnInit(): void {
        this.userService.getMe().subscribe({
            next: me => this.me = me,
            error: err => console.log("Failed to load me: ", err)
        });

        this.websocketService.onNewMessage((message: Message) => {
            this.messageService.appendMessage(message);
        });
    }

    ngOnDestroy(): void {
        this.websocketService.offNewMessage();
    }

    sendMessage() {
        const conversationId = this.messageService.selectedConversationId.value;
        if (!conversationId || !this.newMessage.trim() || !this.me._id) return;

        this.websocketService.sendMessage({
            conversationId,
            sender: this.me,
            content: this.newMessage.trim()
        });
        this.newMessage = '';
    }

    conversationSelected(): boolean {
        return this.messageService.selectedConversationId.value !== null
    }
}