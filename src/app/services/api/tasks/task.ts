import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Task {
  baseUrl: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  getTasksByProjet(idproject: number): Observable<any> {
    const taskUrl = `${this.baseUrl}getTasksByUser/${idproject}`;

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // assuming Bearer token
      'Content-Type': 'application/json',
    });

    // GET request with headers
    return this.http.get(taskUrl, { headers });
  }

  addTask(titre: string, description: string) {
    const taskUrl = this.baseUrl + 'storeTask';

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const data = {
      titre: titre,
      description: description,
    };

    // Pass data as body, headers as options
    return this.http.post(taskUrl, data, { headers });
  }

  deleteTask(idTask: number) {
    const taskUrl = `${this.baseUrl}deletetask/${idTask}`;

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Set headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Perform DELETE request
    return this.http.delete(taskUrl, { headers });
  }
}
