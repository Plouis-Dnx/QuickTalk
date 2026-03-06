import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserApi {
    private http = inject(HttpClient);

    getMe(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/auth/me`);
    }
}