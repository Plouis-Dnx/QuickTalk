import { Routes } from "@angular/router";
import { MessagesComponent } from "./pages/messages/messages.component";
import { AddFriendsComponent } from "./pages/add-friends/add-friends.component";

export const MESSAGES_ROUTES: Routes = [
    {
        path: 'messages',
        component: MessagesComponent
    },
    {
        path: 'add-friends',
        component: AddFriendsComponent
    }
]