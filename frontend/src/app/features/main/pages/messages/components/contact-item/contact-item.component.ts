import { ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Conversation } from "../../../../../../shared/models/conversation.model";
import { MessageService } from "../../../../../../shared/services/message.service";
import { NgClass } from "@angular/common";
import { User } from "../../../../../../shared/models/user.model";
import { UserService } from "../../../../../../shared/services/user.service";

@Component({
    standalone: true,
    selector: 'app-contact-item',
    templateUrl: './contact-item.component.html',
    imports: [NgClass]
})
export class ContactItemComponent implements OnChanges {
    private messageService = inject(MessageService);
    private userService = inject(UserService);
    private cdr = inject(ChangeDetectorRef);

    contactName: string = "Unknown";

    // Input enables to share a conversation from the parent
    // Usage: < app-contact-item [conversation]="conversation" /> 
    @Input() conversation!: Conversation;
    @Input() me!: User;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['me'] && this.me) {
            const contactId = this.conversation.members.find(id => id !== this.me._id);

            if (!this.conversation.isGroup && contactId) {
                this.userService.getUserById(contactId).subscribe({
                    next: user => {
                        this.contactName = user.username,
                        this.cdr.detectChanges();
                    },
                    error: () => this.contactName = 'Unknown'
                });
            } else {
                this.contactName = this.conversation.name;
            }
        }
    }

    getMessages() {
        this.messageService.selectConversation(this.conversation._id);
        console.log(`[ContactItemComponent] Selected conversation id : ${this.messageService.selectedConversationId.value}`);
    };

    get isSelected(): boolean {
        return this.messageService.selectedConversationId.value === this.conversation._id;
    }
}