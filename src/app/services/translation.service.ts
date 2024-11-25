import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiUrl = 'https://libretranslate.com/translate';

  constructor(private http: HttpClient) {}

  translate(text: string, sourceLang: string, targetLang: string): Observable<any> {
    const body = {
      q: text,
      source: sourceLang,  // Source language, e.g., 'en'
      target: targetLang,  // Target language, e.g., 'es'
      format: 'text',      // Format of the text
    };
    return this.http.post(this.apiUrl, body);
  }
}
