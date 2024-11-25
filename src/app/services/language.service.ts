import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) { this.initializeLanguage()}

  setLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  getLanguage(): string {
    return localStorage.getItem('language') || 'en'; // Default to 'en'
  }

  initializeLanguage(): void {
    const savedLanguage = this.getLanguage();
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }
}
