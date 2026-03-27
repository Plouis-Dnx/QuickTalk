import { Component, inject, Input } from "@angular/core";
import { Conversation } from "../../../../../../shared/models/conversation.model";
import { MessageService } from "../../../../../../shared/services/message.service";

@Component({
    standalone: true,
    selector: 'app-contact-item',
    templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {
    private messageService = inject(MessageService);

    // Input enables to share a conversation from the parent
    // Usage: < app-contact-item [conversation]="conversation" /> 
    @Input() conversation!: Conversation;

    getMessages() {
        this.messageService.selectConversation(this.conversation.id);
        console.log(`[ContactItemComponent] Selected conversation id : ${this.messageService.selectedConversationId}`);
    };
}