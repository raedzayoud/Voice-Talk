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

  addProject(name: string, description: string) {
    const projetUrl = this.baseUrl + 'storeprojet';

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const data = {
      name: name,
      description: description,
    };

    // Pass data as body, headers as options
    return this.http.post(projetUrl, data, { headers });
  }

  deleteProject(id: number) {
    const projetUrl = `${this.baseUrl}deleteprojet/${id}`;

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Perform DELETE request
    return this.http.delete(projetUrl, { headers });
  }

  askGemini(prompt: string) {
    const sendUrl = this.baseUrl + 'ask-gemini-2';

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const data = {
      prompt: prompt,
    };

    // Pass data as body, headers as options
    return this.http.post(sendUrl, data, { headers });
  }
}
