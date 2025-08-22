import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('voice');

  @HostListener('window:beforeunload', ['$event'])
  clearLocalStorage(event: Event) {
    localStorage.clear();
  }
}
