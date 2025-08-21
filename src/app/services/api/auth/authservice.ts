import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = this.baseUrl + 'login';

    // corps de la requête
    const body = {
      email: email,
      password: password,
    };

    // POST vers l'API
    return this.http.post(loginUrl, body);
  }

  signup(
    name: string,
    phone: string,
    email: string,
    password: string
  ): Observable<any> {
    const signupUrl = this.baseUrl + 'register';

    const body = {
      name,
      phone,
      email,
      password,
      password_confirmation: password,
    };

    return this.http.post(signupUrl, body);
  }
}
