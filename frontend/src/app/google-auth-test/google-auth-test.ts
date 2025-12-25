import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment.production'

declare const google: any;

@Component({
  selector: 'app-google-auth-test',
  standalone: true,
  templateUrl: './google-auth-test.html',
  styleUrls: ['./google-auth-test.css'],
})
export class GoogleAuthTest implements AfterViewInit {

  ngAfterViewInit() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      { theme: 'outline', size: 'large' }
    );
  }

  async handleCredentialResponse(response: any) {
    const idToken = response.credential;

    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: idToken })
    });

    const data = await res.json();
    console.log('Réponse backend :', data);
  }
}