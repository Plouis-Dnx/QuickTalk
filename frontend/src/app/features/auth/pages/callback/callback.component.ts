import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-callback',
    standalone: true,
    template: `
        <div class="flex h-screen items-center justify-center">
            <p class="font-dm-sans text-gray-500">Connexion en cours...</p>
        </div>`
})
export class CallbackComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private authService = inject(AuthService);

    ngOnInit(): void {
        const code = this.route.snapshot.queryParamMap.get('code');
        if(code) this.authService.handleCallback(code).subscribe();
    }
}