import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/api/auth/authservice';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // pour ngModel
import { NgIf } from '@angular/common'; // <-- import nécessaire

@Component({
  selector: 'app-login',
  imports: [RouterLink, HttpClientModule, FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
})
export class Login {
  email: string = '';
  password: string = '';
  notifcation: string = '';
  loading: boolean = false;
  constructor(private router: Router, private authservice: AuthService) {}
  navigateToRegister() {
    this.router.navigate(['singup']);
  }

  Login() {
    this.loading = true;
    this.authservice.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.message === 'email or password is not correct ') {
          this.showNotification(response.message);
        } else {
          // login réussi
          console.log('Login success:', response);
          this.router.navigate(['home']);
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login failed:', error);
      },
    });
  }

  showNotification(message: string) {
    this.notifcation = message;
    // disparaît après 3 secondes
    setTimeout(() => {
      this.notifcation = '';
    }, 3000);
  }
}
