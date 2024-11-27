// import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { LanguageService } from './services/language.service';  // Assuming you have a custom language service
// import { Router } from '@angular/router';
// import { TranslationService } from './services/translation.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title: string;
//   subtitle: string;
//   originalText: string = 'Hello, world!';
//   translatedText: string = '';
//   targetLanguage: string = 'es'; // Example: Spanish

//   constructor(private translateService: TranslateService, private languageService: LanguageService,private router:Router,
//     private translationService: TranslationService

//   ) {
//     // // Initialize the default language (e.g., 'en' for English)
//     // this.languageService.initializeLanguage();  // Assuming your custom service handles language initialization
//     // this.translateService.get(['title', 'subtitle']).subscribe((translations) => {
//     //   this.title = translations['title'];
//     //   this.subtitle = translations['subtitle'];
//     // });
//     this.translateService.setDefaultLang('en');
    
//     // Optionally, get the user's preferred language (for example, from localStorage)
//     const savedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en' if none is saved
//     this.translateService.use(savedLanguage);
//   }
//   switchLanguage(language: string) {
//     // Change the language using ngx-translate
//     this.translateService.use(language);

//     // Optionally, store the language choice in localStorage for persistence
//     localStorage.setItem('language', language);
//   }

//   translateText() {
//     this.translationService
//       .translate(this.originalText, 'en', this.targetLanguage)
//       .subscribe(
//         (response) => {
//           this.translatedText = response.translatedText;
//         },
//         (error) => {
//           console.error('Translation failed', error);
//         }
//       );
//   }

//   changeLanguage(language: string) {
//     // Change the language
//     this.translateService.use(language);

//     // Refresh the current route (simulate reload without full page refresh)
//     this.reloadRoute();
//   }
  
//   reloadRoute() {
//     // Navigate to the same route to simulate a reload
//     this.router.navigate(['/homepage']).then(() => {
//           // Reload the page
//           window.location.reload();
//         });
//   }
//   // changeLanguage(language: string, event: Event) {
//   //   event.preventDefault();  // Prevent the form submission or page reload
//   //   this.translateService.use(language);
//   //   this.languageService.setLanguage(language);
    
//   //   this.router.navigate(['/homepage']).then(() => {
//   //     // Reload the page
//   //     window.location.reload();
//   //   });
//   // }
  

//   // title = 'WELCOME';
//   // subtitle = 'HOME';

//   // constructor(private translateService: TranslateService) {
//   //   // Set the default language (for example: English)
    
//   // }

//   // changeLanguage(language: string) {
//   //   // Change language dynamically
//   //   this.translateService.use(language);
//   // }
// }

import { Component,OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService,
    private cookieService: CookieService
  ) {
    translate.addLangs(['en', 'fr']); // Add other languages as needed
    translate.setDefaultLang('en');   // Set the default language
  }
  
  ngOnInit(): void {
    // Set a cookie
    this.cookieService.set('myCookie', 'cookieValue', { expires: 7, path: '/' });

    // Get a cookie
    const myCookieValue = this.cookieService.get('myCookie');
    console.log(myCookieValue);

    // Delete a cookie
    this.cookieService.delete('myCookie');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

