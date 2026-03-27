import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { ConversationService } from "../../../../../../shared/services/conversation.service";
import { Conversation } from "../../../../../../shared/models/conversation.model";
import { LoadingComponent } from "../../../../../../shared/components/loading/loading.component";
import { ContactItemComponent } from "../contact-item/contact-item.component";

@Component({
    standalone: true,
    selector: 'app-contacts-sidebar',
    imports: [LoadingComponent, ContactItemComponent],
    templateUrl: './contacts-sidebar.component.html'
})
export class ContactSidebarComponent implements OnInit {
    private conversationService = inject(ConversationService);
    private cdr = inject(ChangeDetectorRef);

    conversations: Conversation[] = [];
    isLoading = true;

    ngOnInit(): void {
        this.conversationService.getUserConversations().subscribe({
            next: (conversations) => {
                this.conversations = conversations;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error("[ContactSidebar] Failed to load conversations: ", err);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }
}