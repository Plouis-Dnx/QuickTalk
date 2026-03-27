import { Routes } from "@angular/router";
import { MessagesComponent } from "./pages/messages/messages.component";

export const MESSAGES_ROUTES: Routes = [
    {
        path: 'messages',
        component: MessagesComponent
    }
]