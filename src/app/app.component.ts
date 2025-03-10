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

