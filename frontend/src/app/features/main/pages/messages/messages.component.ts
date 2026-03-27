import { Component } from "@angular/core";
import { ContactSidebarComponent } from "./components/contacts-sidebar/contacts-sidebar.component";
import { ConversationDisplayComponent } from "./components/conversation-display/conversation-display.component";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [ContactSidebarComponent, ConversationDisplayComponent, NavbarComponent],
    templateUrl: './messages.component.html'
})
export class MessagesComponent {}