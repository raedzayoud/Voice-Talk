import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/api/auth/authservice';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-singup',
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './singup.html',
  styleUrl: './singup.scss',
})
export class Singup {
  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  notifcation: string = '';
  loading: boolean = false;

  constructor(private router: Router, private authservice: AuthService) {}

  signUp() {
    this.loading = true;

    // Vérifier password/confirmPassword
    if (this.password !== this.confirmPassword) {
      this.showNotification(
        'Please check the password is equal to confirmPassword'
      );
      this.loading = false;
      return;
    }

    this.authservice
      .signup(this.name, this.phone, this.email, this.password)
      .subscribe({
        next: (response) => {
          this.loading = false;

          //  Affiche le message
          this.showNotification(response.status);
          console.log('Signup response:', response);
          this.name = '';
          this.phone = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
          setTimeout(() => {
            this.notifcation = '';
            this.router.navigate(['login']);
          }, 5000);
        },
        error: (error) => {
          this.loading = false;

          if (error.status === 422 && error.error?.errors) {
            const firstError = Object.values(error.error.errors)[0] as string[];
            this.showNotification(firstError[0]);
          } else {
            this.showNotification(error.error?.message || 'An error occurred');
          }

          console.error('Signup failed:', error);
        },
      });
  }

  showNotification(message: string) {
    this.notifcation = message;
    setTimeout(() => {
      this.notifcation = '';
    }, 5000);
  }
}
