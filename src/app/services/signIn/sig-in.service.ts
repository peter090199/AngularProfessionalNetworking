import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, of } from 'rxjs';
import { _url } from 'src/global-variables';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigInService {
  private tokenKey = 'token';
  private _refreshrequired=new Subject<void>();

  get RequiredRefresh(){
    return this._refreshrequired;
  }
  constructor(private http: HttpClient) { }
  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Save token to local storage
  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
   // localStorage.setItem(this.role_code, token);
  }

  // Login method
  signin(email: any, password: any): Observable<any> {
    return this.http.post<any>(_url + 'login', { email, password }).pipe(
      tap(res => {
        if (res && res.token) {
          this.saveToken(res.token);
          this._refreshrequired.next();
         // this.startTokenExpirationCheck(); // Restart token expiration check on login
        }
      }),
      catchError(this.handleError())
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

}


