// All the logic : Redirect to Google, token storage, backend call, ...

import { LoginResponse } from "../dto/login-response.dto";
import { AUTH_TOKEN_KEY } from "../constants/auth.constants";
import { Injectable, inject } from "@angular/core";
import { catchError, tap } from "rxjs";
import { Router } from "@angular/router";
import { AuthApi } from "../../../core/api/auth.api";
import { environment } from "../../../../environments/environment";
import { GoogleCredentialResponse } from "../dto/google-credential-response";

declare const google: any;

@Injectable({providedIn: 'root'})
export class AuthService {
    private authApi = inject(AuthApi);
    private router = inject(Router);

    private saveToken(token: string): void{
        console.log("[AuthService] Saving token...");
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        console.log("[AuthService] Token saved");
    }

    private handleGoogleResponse(response: GoogleCredentialResponse): void {
        console.log("[AuthService] Google response received", response);
        const idToken = response.credential;
        console.log("[AuthService] ID token extracted", idToken);

        console.log('[AuthService] Trying login...');
        this.authApi.login(idToken).pipe(
            tap({
                next: () => console.log("[AuthService] Login successful"),
                error: (error) => console.log('[AuthService] Login failed: ', error)
            }),
            catchError((error) => {
                console.log("[AuthService] Login failed, trying register...", error);
                return this.authApi.register(idToken);
            }),
            tap((res: LoginResponse) => {
                console.log("[AuthService] Auth successful, response:", res);
                this.saveToken(res.access_token!);
                this.router.navigate(['/messages/main']);
            })
        ).subscribe({error: (err) => console.error("[AuthService] Auth completely failed: ", err) });
    }

    loginWithGoogle(): void {
        console.log('[AuthService] Initializing Google Identity Services...');
        google.accounts.id.initialize({
            client_id: environment.googleClientId,
            callback: (response:any) => this.handleGoogleResponse(response),
            use_fedcm_for_prompt: true
        });

        google.accounts.id.prompt((notification: any) => {
            console.log('[AuthService] Popup notification:', notification);
            console.log('[AuthService] Moment type:', notification.getMomentType());
            console.log('[AuthService] Is displayed:', notification.isDisplayed());
            console.log('[AuthService] Is skipped:', notification.isSkippedMoment());
            console.log('[AuthService] Skip reason:', notification.getSkippedReason());
        });
    }
}