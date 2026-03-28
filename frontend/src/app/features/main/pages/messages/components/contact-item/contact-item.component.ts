import { Component, inject, Input } from "@angular/core";
import { Conversation } from "../../../../../../shared/models/conversation.model";
import { MessageService } from "../../../../../../shared/services/message.service";
import { NgClass } from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-contact-item',
    templateUrl: './contact-item.component.html',
    imports: [NgClass]
})
export class ContactItemComponent {
    private messageService = inject(MessageService);

    // Input enables to share a conversation from the parent
    // Usage: < app-contact-item [conversation]="conversation" /> 
    @Input() conversation!: Conversation;

    getMessages() {
        this.messageService.selectConversation(this.conversation._id);
        console.log(`[ContactItemComponent] Selected conversation id : ${this.messageService.selectedConversationId.value}`);
    };

    get isSelected(): boolean {
        return this.messageService.selectedConversationId.value === this.conversation._id;
    }
}