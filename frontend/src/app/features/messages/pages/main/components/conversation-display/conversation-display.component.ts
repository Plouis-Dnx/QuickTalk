import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MessageService } from "../../../../services/message.service";
import { UserService } from "../../../../services/user.service";

@Component({
    standalone: true,
    selector: 'app-conversation-display',
    templateUrl: './conversation-display.component.html',
    imports: [AsyncPipe]
})
export class ConversationDisplayComponent {
    private messageService = inject(MessageService);
    private userService = inject(UserService);

    messages = this.messageService.messages;
    meId = this.userService.getMe();
}