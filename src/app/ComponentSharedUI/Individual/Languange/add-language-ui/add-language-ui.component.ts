// import {COMMA, ENTER} from '@angular/cdk/keycodes';
// import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
// import {FormControl} from '@angular/forms';
// import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
// import {MatChipInputEvent} from '@angular/material/chips';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';

// /**
//  * @title Chips Autocomplete
//  */
// @Component({
//   selector: 'app-add-language-ui',
//   templateUrl: './add-language-ui.component.html',
//   styleUrls: ['./add-language-ui.component.css']
// })
// export class AddLanguageUIComponent {
//   separatorKeysCodes: number[] = [ENTER, COMMA];
//   fruitCtrl = new FormControl();
//   filteredFruits: Observable<string[]>;
//   fruits: string[] = [];
//   allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

//   @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

//   constructor() {
//     this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
//       startWith(null),
//       map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
//     );
//   }
//   clearInput(): void {
//     this.fruitCtrl.setValue('');
//   }
//   ngOnInit(): void {
//   }

//   add(event: MatChipInputEvent): void {
//     const value = (event.value || '').trim();

//     // Add our fruit
//     if (value) {
//       this.fruits.push(value);
//     }

//     // Clear the input value
//     event.chipInput!.clear();

//     this.fruitCtrl.setValue(null);
//   }

//   remove(fruit: string): void {
//     const index = this.fruits.indexOf(fruit);

//     if (index >= 0) {
//       this.fruits.splice(index, 1);
//     }
//   }

//   selected(event: MatAutocompleteSelectedEvent): void {
//     this.fruits.push(event.option.viewValue);
//     this.fruitInput.nativeElement.value = '';
//     this.fruitCtrl.setValue(null);
//   }

//   private _filter(value: string): string[] {
//     const filterValue = value.toLowerCase();

//     return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
//   }
// }

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-language-ui',
  templateUrl: './add-language-ui.component.html',
  styleUrls: ['./add-language-ui.component.css']
})
export class AddLanguageUIComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl('');
  languages: string[] = [];
  allLanguages: string[] = [
    'Afrikaans', 
    'Albanian', 
    'Amharic', 
    'Arabic', 
    'Armenian', 
    'Azerbaijani', 
    'Basque', 
    'Belarusian', 
    'Bengali', 
    'Bosnian', 
    'Bulgarian', 
    'Burmese', 
    'Catalan', 
    'Chinese', 
    'Croatian', 
    'Czech', 
    'Danish', 
    'Dutch', 
    'English', 
    'Esperanto', 
    'Estonian', 
    'Filipino', 
    'Finnish', 
    'French', 
    'Georgian', 
    'German', 
    'Greek', 
    'Gujarati', 
    'Haitian Creole', 
    'Hausa', 
    'Hebrew', 
    'Hindi', 
    'Hungarian', 
    'Icelandic', 
    'Igbo', 
    'Indonesian', 
    'Irish', 
    'Italian', 
    'Japanese', 
    'Javanese', 
    'Kannada', 
    'Kazakh', 
    'Khmer', 
    'Korean', 
    'Kurdish', 
    'Kyrgyz', 
    'Lao', 
    'Latvian', 
    'Lithuanian', 
    'Macedonian', 
    'Malay', 
    'Malayalam', 
    'Maltese', 
    'Maori', 
    'Marathi', 
    'Mongolian', 
    'Nepali', 
    'Norwegian', 
    'Pashto', 
    'Persian', 
    'Polish', 
    'Portuguese', 
    'Punjabi', 
    'Romanian', 
    'Russian', 
    'Serbian', 
    'Sinhalese', 
    'Slovak', 
    'Slovenian', 
    'Somali', 
    'Spanish', 
    'Swahili', 
    'Swedish', 
    'Tagalog', 
    'Tamil', 
    'Telugu', 
    'Thai', 
    'Turkish', 
    'Ukrainian', 
    'Urdu', 
    'Uzbek', 
    'Vietnamese', 
    'Welsh', 
    'Xhosa', 
    'Yiddish', 
    'Yoruba', 
    'Zulu'
  ];
  

  
  @Output() saveData = new EventEmitter<string[]>(); // Output event for Save button

  filteredLanguages = this.languageCtrl.valueChanges.pipe(
    startWith(null),
    map((language: string | null) =>
      language ? this._filter(language) : this.allLanguages.slice()
    )
  );

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the language
    if (value && !this.languages.includes(value)) {
      this.languages.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.languageCtrl.setValue(null);
  }

  remove(language: string): void {
    const index = this.languages.indexOf(language);

    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    if (!this.languages.includes(value)) {
      this.languages.push(value);
    }
    this.languageCtrl.setValue(null);
  }

  save(): void {
    // Emit the list of languages to the parent or other components
   this.saveData.emit(this.languages);
    console.log('Languages saved:', this.languages);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLanguages.filter(language => language.toLowerCase().includes(filterValue));
  }
}
