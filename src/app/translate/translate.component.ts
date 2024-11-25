import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    // Initialize Renderer2
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.loadGoogleTranslate();
    // this.hideGoogleTranslateElement();
  }

  // Method to load Google Translate script
  loadGoogleTranslate(): void {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'text/javascript');
    this.renderer.setAttribute(
      script,
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    this.renderer.appendChild(document.body, script);

    // Initialize Google Translate Element and hide popup once loaded
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
      this.hideGoogleTranslatePopup();
      // Hide the popup after initialization
      // setTimeout(() => {
      //   this.hideGoogleTranslatePopup();
      // }, 1000);
    };
  }
  private hideGoogleTranslateElement(): void {
    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
      translateElement.style.display = 'none'; // Hide the element
    }
  }
  
  // Method to hide Google Translate popup menu
  private hideGoogleTranslatePopup(): void {
    const translateElement = document.getElementById('google_translate_element');
    const iframe = translateElement?.querySelector('iframe');
  
    if (iframe) {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      const popup = iframeDocument?.querySelector('.goog-te-menu-frame');
      if (popup) {
        (popup as HTMLElement).style.display = 'none'; // Cast to HTMLElement
      }
    }
  }
  
  // Method to programmatically set the language in the Google Translate dropdown
  setLanguage(language: string): void {
    const selectBox = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectBox) {
      selectBox.value = language;
      selectBox.dispatchEvent(new Event('change')); // Simulate the change event
    }
  }
}
