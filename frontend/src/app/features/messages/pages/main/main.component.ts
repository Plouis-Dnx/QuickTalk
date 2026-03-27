import { Component, OnInit } from "@angular/core";
import { ContactSidebarComponent } from "./components/contacts-sidebar/contacts-sidebar.component";
import { ConversationDisplayComponent } from "./components/conversation-display/conversation-display.component";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [ContactSidebarComponent, ConversationDisplayComponent],
    templateUrl: './main.component.html'
})
export class MainComponent {}