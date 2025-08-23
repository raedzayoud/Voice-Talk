import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/api/auth/authservice';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // pour ngModel
import { NgIf } from '@angular/common'; // <-- import nécessaire
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private router: Router,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) {}
  navigateToRegister() {
    this.router.navigate(['singup']);
  }

  Login() {
    this.loading = true;
    this.authservice.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.loading = false;

        if (response.message === 'email or password is not correct ') {
          this.snackBar.open(response.message, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar'], // custom style
          });
        } else {
          localStorage.setItem('token', response.token);
          //   alert(localStorage.getItem('token'));
          this.snackBar.open('✅ ' + response.message, 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['home']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('❌ Login failed. Try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
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
