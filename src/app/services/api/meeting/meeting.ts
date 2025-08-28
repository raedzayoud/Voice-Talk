import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  createMeeting(prompt: string): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No token found in localStorage'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const data = { prompt };

    return this.http.post(`${this.baseUrl}create-meeting`, data, { headers });
  }

  getAllByUserMeeting(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No token found in localStorage'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}get-meeting-user`, { headers });
  }
}
