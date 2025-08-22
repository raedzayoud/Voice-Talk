import { Component } from '@angular/core';
import { Menu } from '../menu/menu';
import { Footer } from '../component/footer/footer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-propos',
  imports: [Menu, Footer, RouterLink],
  templateUrl: './propos.html',
  styleUrl: './propos.scss',
})
export class Propos {
  constructor(private router: Router) {}
  goToEssayer() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
      return;
    }
    this.router.navigate(['essayer']);
  }
}
