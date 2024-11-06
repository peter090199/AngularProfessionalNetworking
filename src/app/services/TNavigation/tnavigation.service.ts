import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _url } from 'src/global-variables';

@Injectable({
  providedIn: 'root'
})
export class TNavigationService {

  constructor(private http: HttpClient) { }

  // Method to get the authentication token from localStorage or another method
  private getAuthToken(): string {
    return localStorage.getItem('token') || ''; // Fetch the token from localStorage or other storage
  }

  // Method to create HTTP headers with the Bearer token
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Example of a GET request
  getData(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${_url}${"accessmenu"}`, { headers });
  }

  // Example of a POST request
  postData(endpoint: string, body: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${_url}${endpoint}`, body, { headers });
  }

  // Example of a PUT request
  putData(endpoint: string, body: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${_url}${endpoint}`, body, { headers });
  }

  // Example of a DELETE request
  deleteData(endpoint: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${_url}${endpoint}`, { headers });
  }
}
