import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { LoginResponse } from "../../features/auth/dto/login-response.dto";

@Injectable({providedIn:'root'})
export class AuthApi {
    private http = inject(HttpClient);
    private readonly SERVER_URL = environment.apiUrl;

    login(googleIdToken: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.SERVER_URL}/auth/login`, {token: googleIdToken}); 
    }

    register(googleIdToken: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.SERVER_URL}/auth/register`, {token: googleIdToken}); 
    }
}