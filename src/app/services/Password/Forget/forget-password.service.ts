import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _url } from 'src/global-variables'; // Make sure this is correctly imported

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  constructor(private http: HttpClient) {}

  // Corrected method
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${_url}forgetpassword`, { email });
  }
}
