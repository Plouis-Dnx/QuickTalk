import { Component, inject, Input, OnInit } from "@angular/core";
import { User } from "../../../../../../shared/models/user.model";
import { UserService } from "../../../../../../shared/services/user.service";

@Component({
    selector: 'app-user-item',
    standalone: true,
    templateUrl: './user-item.component.html'
})
export class UserItemComponent implements OnInit {
    @Input() user!: User;

    private userService = inject(UserService);

    me!: User;

    ngOnInit(): void {
        this.userService.getMe().subscribe({
            next: me => {
                this.me = me;
            },
            error: err => {
                console.error("[AddFriends] Failed to load data: ", err);
            }
        })
    }

    showId() {
        console.log(`Selected ID : ${this.user._id}`);
        console.log(`Me ID : ${this.me._id}`);
        console.log(this.user);
    }
}