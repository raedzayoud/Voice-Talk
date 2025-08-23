import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjetsService {
  baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getProjectsByUser(): Observable<any> {
    const projetUrl = this.baseUrl + 'getprojetsbyuser';

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // assuming Bearer token
    });

    // GET request with headers
    return this.http.get(projetUrl, { headers });
  }
}
