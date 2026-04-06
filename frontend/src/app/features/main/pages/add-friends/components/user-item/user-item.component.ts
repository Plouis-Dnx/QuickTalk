import { ChangeDetectorRef, Component, inject, Input, OnInit } from "@angular/core";
import { User } from "../../../../../../shared/models/user.model";
import { ConversationService } from "../../../../../../shared/services/conversation.service";
import { UserService } from "../../../../../../shared/services/user.service";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { Conversation } from "../../../../../../shared/models/conversation.model";
import { WebsocketService } from "../../../../../../shared/services/websocket.service";

@Component({
    selector: 'app-user-item',
    standalone: true,
    templateUrl: './user-item.component.html'
})
export class UserItemComponent implements OnInit {
    @Input() user!: User;

    private conversationService = inject(ConversationService);
    private userService = inject(UserService);
    private websocketService = inject(WebsocketService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    me!: User;
    conversationExists = false;

    ngOnInit(): void {
        forkJoin({
            me: this.userService.getMe(),
            conversations: this.conversationService.getUserConversations()
        })
        .subscribe({
            next: ({me, conversations}) => {
                this.me = me;
                this.conversationExists = conversations.some((conv: Conversation) => 
                    !conv.isGroup &&
                    conv.members.map((m: any) => m.toString()).includes(this.user._id.toString()) &&
                    conv.members.map((m: any) => m.toString()).includes(me._id.toString())
                );
                this.cdr.detectChanges();
            }
        });
    }

    createConversation() {
        console.log('user._id:', this.user._id);
        console.log('me._id:', this.me._id);
        this.conversationService.createConversation({
            name: `${this.user.username}, ${this.me.username}`,
            creatorId: this.me._id,
            isGroup: false,
            members: [this.user._id, this.me._id],
            conversationPicture: "https://cdn-icons-png.flaticon.com/512/6521/6521784.png"
        })
        .subscribe({
            next: conversation => {
                console.log(`Conversation with ${this.user.username} successfully created : `, conversation);
                this.websocketService.joinConversation(conversation._id);
                this.router.navigate(['/main/messages']);
            },
            error: err => console.error("[UserItem] Failed to create conversation: ", err)
        })
    }
}