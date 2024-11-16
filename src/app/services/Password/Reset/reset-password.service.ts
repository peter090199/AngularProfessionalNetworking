import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _url } from 'src/global-variables';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${_url}resetpassword/${token}`);
  }
  resetPassword(payload: { email: string, token: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post<any>(`${_url}resetpassword`, payload);
  }
  // resetPassword(payload:{email:string,token:any,password:any,password_confirmation:any}): Observable<any> {
  //   return this.http.post(`${_url}resetpassword`, { payload });
  // }
}
