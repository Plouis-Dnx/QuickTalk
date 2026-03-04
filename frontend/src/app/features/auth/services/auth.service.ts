// All the logic : Redirect to Google, token storage, backend call, ...

// DTO
import { AuthTokenResponse } from "../dto/auth-token-response.dto";

// Environment variables
import { AUTH_TOKEN_KEY, GOOGLE_AUTH_URL, GOOGLE_SCOPES } from "../constants/auth.constants";
import { environment } from "../../../../environments/environment";

// Angular
import { Injectable, inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private saveToken(token: string): void{
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    loginWithGoogle(): void {
        const params = new URLSearchParams({
            client_id: environment.googleClientId,
            redirect_uri: environment.redirectUri,
            response_type: 'code',
            scope: GOOGLE_SCOPES
        });

        // Redirect user to an OAuth page where he can logs in
        window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`;
    }

    handleCallback(code: string): Observable<AuthTokenResponse> {
        return this.http.post<AuthTokenResponse>('/api/auth/google/callback', {code}).pipe(
            tap(response => {
                this.saveToken(response.token);
                this.router.navigate(['/dashboard']);
            })
        );
    }
}