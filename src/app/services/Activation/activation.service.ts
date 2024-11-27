import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _url } from 'src/global-variables';
@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  constructor(private http: HttpClient) {}

  activate(payload: { email: string, code: string}): Observable<any> {
    return this.http.post<any>(`${_url}accountactivation`, payload);
  }

}
