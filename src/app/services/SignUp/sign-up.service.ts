import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, of } from 'rxjs';
import { _url } from 'src/global-variables';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

 
  private _refreshrequired=new Subject<void>();

  get RequiredRefresh(){
    return this._refreshrequired;
  }
  constructor(private http: HttpClient) { }

  signup(registerForm:any): Observable<any>{
    return this.http.post<any>(_url+'register',registerForm).pipe(
      tap(()=>{
        this.RequiredRefresh.next();
      }),
      catchError(this.handleError<any>('register'))
    );
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
