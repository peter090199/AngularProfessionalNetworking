import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-add-edit-language',
  templateUrl: './add-edit-language.component.html',
  styleUrls: ['./add-edit-language.component.css']
})

export class AddEditLanguageComponent implements OnInit {
  allLangauge: string[] = [
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
  filteredLanguage: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private alert:NotificationsService
  ) {}

  ngOnInit(): void {
    // Initialize the filteredSkills with allSkills
    this.filteredLanguage = this.allLangauge;
  }

  filterSkills(value: string): void {
    const filterValue = value ? value.toLowerCase() : '';
    this.filteredLanguage = this.allLangauge.filter((skill) =>
      skill.toLowerCase().includes(filterValue)
    );
  }
  
  onSkillSelected(event: any): void {
    if (event.option && event.option.value) {
      this.data.language = event.option.value; // Update the selected skill
    }
  }
  

  save(): void {
    this.alert.toastrSuccess("Successfuly Updated.")
    this.dialogRef.close(this.data); // Close the dialog and return the data
  }
}
