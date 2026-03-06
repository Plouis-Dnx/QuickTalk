import { Component, OnInit } from "@angular/core";
import { ContactSidebarComponent } from "./components/contacts-sidebar/contacts-sidebar.component";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [ContactSidebarComponent],
    template: `<app-contacts-sidebar />`
})
export class MainComponent {}