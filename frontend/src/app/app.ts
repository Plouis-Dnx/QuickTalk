import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { WebsocketService } from './shared/services/websocket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  private authService = inject(AuthService);
  private websocketService = inject(WebsocketService);  

  ngOnInit(): void {
    // The user stays connected to websockets after reloading
    const token = this.authService.getToken();
    if(token) this.websocketService.connect(token);
  }
}
