import { Component, Input } from "@angular/core";
import { User } from "../../../../../../shared/models/user.model";

@Component({
    selector: 'app-user-item',
    standalone: true,
    templateUrl: './user-item.component.html'
})
export class UserItemComponent {
    @Input() user!: User;

    showPfPLink() {
        console.log(this.user.profile_picture);
    }
}