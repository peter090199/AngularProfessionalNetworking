import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  languageNames: { [key: string]: string } = {};
  currentLang: string;
  // private renderer: Renderer2;

  // constructor(private rendererFactory: RendererFactory2) {
  //   // Initialize Renderer2
  //   this.renderer = rendererFactory.createRenderer(null, null);
  // }
  constructor(private translate: TranslateService) {
    // Define available languages and set the default language
    translate.addLangs([
      'en', 'zh-CN', 'zh-TW', 'es', 'fr', 'de', 'ja', 'ko', 'ar', 'hi', 
      'ru', 'pt', 'it', 'nl', 'sv', 'pl', 'tr', 'vi', 'th'
    ]);
    translate.setDefaultLang('en'); // Default language
  }
  ngOnInit(): void {
    const savedLang = localStorage.getItem('selectedLang');
        
        if (savedLang) {
          // Set the stored language
          this.translate.use(savedLang);
          this.currentLang = savedLang;
        } else {
          // Set the default language
          this.translate.use('en');
          this.currentLang = 'en';
        }
     }

     setLanguage(lang: string): void {
      // Change the language and save it to localStorage
      this.translate.use(lang);
      this.currentLang = lang;
      localStorage.setItem('selectedLang', lang);  // Store the language preference
    }
  // Method to load Google Translate script
  // loadGoogleTranslate(): void {
  //   const script = this.renderer.createElement('script');
  //   this.renderer.setAttribute(script, 'type', 'text/javascript');
  //   this.renderer.setAttribute(
  //     script,
  //     'src',
  //     '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  //   );
  //   this.renderer.appendChild(document.body, script);

  //   // Initialize Google Translate Element and hide popup once loaded
  //   (window as any).googleTranslateElementInit = () => {
  //     new (window as any).google.translate.TranslateElement(
  //       { pageLanguage: 'en' },
  //       'google_translate_element'
  //     );
  //     this.hideGoogleTranslatePopup();
  //     // Hide the popup after initialization
  //     // setTimeout(() => {
  //     //   this.hideGoogleTranslatePopup();
  //     // }, 1000);
  //   };
  // }
  // private hideGoogleTranslateElement(): void {
  //   const translateElement = document.getElementById('google_translate_element');
  //   if (translateElement) {
  //     translateElement.style.display = 'none'; // Hide the element
  //   }
  // }
  
  // // Method to hide Google Translate popup menu
  // private hideGoogleTranslatePopup(): void {
  //   const translateElement = document.getElementById('google_translate_element');
  //   const iframe = translateElement?.querySelector('iframe');
  
  //   if (iframe) {
  //     const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
  //     const popup = iframeDocument?.querySelector('.goog-te-menu-frame');
  //     if (popup) {
  //       (popup as HTMLElement).style.display = 'none'; // Cast to HTMLElement
  //     }
  //   }
  // }
  
  // // Method to programmatically set the language in the Google Translate dropdown
  // setLanguage(language: string): void {
  //   const selectBox = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  //   if (selectBox) {
  //     selectBox.value = language;
  //     selectBox.dispatchEvent(new Event('change')); // Simulate the change event
  //   }
  // }
  // setLanguage(lang: string): void {
  //   if (lang === 'auto') {
  //     // Automatically detect language using browser settings
  //     const browserLang = this.translate.getBrowserLang();
  //     this.translate.use(browserLang.match(/en|zh-CN|zh-TW|es|fr|de|ja|ko|ar|hi|ru|pt|it|nl|sv|pl|tr|vi|th/) ? browserLang : 'en');
  //   } else {
  //     this.translate.use(lang);
  //   }
  // }

}
