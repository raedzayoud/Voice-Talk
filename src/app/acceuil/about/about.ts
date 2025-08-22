import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  constructor(private router: Router) {}
  goToEssayer() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
      return;
    }
    this.router.navigate(['essayer']);
  }
}
