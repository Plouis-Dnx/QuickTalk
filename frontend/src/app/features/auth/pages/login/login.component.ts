// Only trigger an action and manage the display

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { WebsocketService } from '../../../../shared/services/websocket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private websocketService = inject(WebsocketService);

  onLoginClick(): void {
    this.authService.loginWithGoogle();
  }
}