import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAuthTest } from './google-auth-test/google-auth-test';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoogleAuthTest],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
