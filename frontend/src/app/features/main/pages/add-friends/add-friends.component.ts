import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { UserItemComponent } from "./components/user-item/user-item.component";
import { UserService } from "../../../../shared/services/user.service";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { User } from "../../../../shared/models/user.model";

@Component({
    selector: 'app-add-friends',
    standalone: true,
    templateUrl: './add-friends.component.html',
    imports: [NavbarComponent, UserItemComponent, LoadingComponent]
})
export class AddFriendsComponent implements OnInit {
    private userService = inject(UserService);
    private cdr = inject(ChangeDetectorRef);

    users: User[] = [];
    isLoading = true;

    ngOnInit(): void {
        this.userService.getAllUsers().subscribe({
            next: users => {
                this.users = users;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: err => {
                console.error("AddFriends] Failed to load users: ", err);
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    };
}