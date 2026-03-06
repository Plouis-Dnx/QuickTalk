import { Component, Input } from "@angular/core";
import { Conversation } from "../../../../../../shared/models/conversation.model";

@Component({
    standalone: true,
    selector: 'app-contact-item',
    templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {
    // Input enables to share a conversation from the parent
    // Usage: < app-contact-item [conversation]="conversation" /> 
    @Input() conversation!: Conversation
}