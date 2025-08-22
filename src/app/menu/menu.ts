import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class Menu {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToEssayer() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
      return;
    }
    this.router.navigate(['essayer']);
  }
}
