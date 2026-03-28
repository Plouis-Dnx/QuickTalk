import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MessageService } from "../../../../../../shared/services/message.service";
import { UserService } from "../../../../../../shared/services/user.service";
import { User } from "../../../../../../shared/models/user.model";

@Component({
    standalone: true,
    selector: 'app-conversation-display',
    templateUrl: './conversation-display.component.html',
    imports: [AsyncPipe]
})
export class ConversationDisplayComponent implements OnInit {
    private messageService = inject(MessageService);
    private userService = inject(UserService);

    messages = this.messageService.messages;
    me!: User;

    ngOnInit(): void {
        this.userService.getMe().subscribe({
            next: me => this.me = me,
            error: err => console.log("Failed to load me: ", err)
        });
    }

    conversationSelected(): boolean {
        return this.messageService.selectedConversationId.value !== null
    }
}