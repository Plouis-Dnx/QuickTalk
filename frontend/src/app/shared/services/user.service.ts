import { inject, Injectable } from "@angular/core";
import { UserApi } from "../../core/api/user.api";
import { Observable, shareReplay } from "rxjs";
import { User } from "../models/user.model";

@Injectable({providedIn:'root'})
export class UserService {
    private userApi = inject(UserApi);
    private currentUser : Observable<User> | null = null;

    getMe(): Observable<User> {
        if(!this.currentUser) {
            this.currentUser = this.userApi.getMe().pipe(
                // Avoid doing a recall to this function. 
                // It retrieves the user directly from cache.
                shareReplay(1) 
            );
        }
        return this.currentUser;
    }

    getAllUsers(): Observable<User[]> {
        return this.userApi.getAllUsers();
    }
}