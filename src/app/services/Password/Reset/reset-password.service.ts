import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _url } from 'src/global-variables';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) {}


  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${_url}/resetpassword`, { token, password });
  }
}
