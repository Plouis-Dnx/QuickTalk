import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { ConversationService } from "../../../../../../shared/services/conversation.service";
import { Conversation } from "../../../../../../shared/models/conversation.model";
import { LoadingComponent } from "../../../../../../shared/components/loading/loading.component";
import { ContactItemComponent } from "../contact-item/contact-item.component";
import { User } from "../../../../../../shared/models/user.model";
import { UserService } from "../../../../../../shared/services/user.service";
import { switchMap } from "rxjs";

@Component({
    standalone: true,
    selector: 'app-contacts-sidebar',
    imports: [LoadingComponent, ContactItemComponent],
    templateUrl: './contacts-sidebar.component.html'
})
export class ContactSidebarComponent implements OnInit {
    private conversationService = inject(ConversationService);
    private userService = inject(UserService);
    private cdr = inject(ChangeDetectorRef);

    conversations: Conversation[] = [];
    isLoading = true;
    me!: User;

    ngOnInit(): void {
        this.userService.getMe().pipe(
            switchMap(me => {
                this.me = me;
                return this.conversationService.getUserConversations();
            })
        ).subscribe({
            next: conversations => {
                this.conversations = conversations;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: err => {
                console.error("[ContactSidebar] Failed to load data: ", err);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }
}