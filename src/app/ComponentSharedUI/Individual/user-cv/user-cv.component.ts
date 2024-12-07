// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-cv',
//   templateUrl: './user-cv.component.html',
//   styleUrls: ['./user-cv.component.css']
// })
// export class UserCVComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-user-cv',
  templateUrl: './user-cv.component.html',
  styleUrls: ['./user-cv.component.css']
})
export class UserCVComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthGroup:FormGroup;

  countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    { code: '+20', country: 'Egypt' },
    { code: '+27', country: 'South Africa' },
    { code: '+30', country: 'Greece' },
    { code: '+31', country: 'Netherlands' },
    { code: '+32', country: 'Belgium' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+36', country: 'Hungary' },
    { code: '+39', country: 'Italy' },
    { code: '+40', country: 'Romania' },
    { code: '+41', country: 'Switzerland' },
    { code: '+43', country: 'Austria' },
    { code: '+44', country: 'UK' },
    { code: '+45', country: 'Denmark' },
    { code: '+46', country: 'Sweden' },
    { code: '+47', country: 'Norway' },
    { code: '+48', country: 'Poland' },
    { code: '+49', country: 'Germany' },
    { code: '+52', country: 'Mexico' },
    { code: '+54', country: 'Argentina' },
    { code: '+55', country: 'Brazil' },
    { code: '+56', country: 'Chile' },
    { code: '+57', country: 'Colombia' },
    { code: '+58', country: 'Venezuela' },
    { code: '+60', country: 'Malaysia' },
    { code: '+61', country: 'Australia' },
    { code: '+62', country: 'Indonesia' },
    { code: '+63', country: 'Philippines' },
    { code: '+64', country: 'New Zealand' },
    { code: '+65', country: 'Singapore' },
    { code: '+66', country: 'Thailand' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+84', country: 'Vietnam' },
    { code: '+86', country: 'China' },
    { code: '+90', country: 'Turkey' },
    { code: '+91', country: 'India' },
    { code: '+92', country: 'Pakistan' },
    { code: '+93', country: 'Afghanistan' },
    { code: '+94', country: 'Sri Lanka' },
    { code: '+95', country: 'Myanmar' },
    { code: '+98', country: 'Iran' },
    { code: '+212', country: 'Morocco' },
    { code: '+213', country: 'Algeria' },
    { code: '+216', country: 'Tunisia' },
    { code: '+218', country: 'Libya' },
    { code: '+220', country: 'Gambia' },
    { code: '+221', country: 'Senegal' },
    { code: '+234', country: 'Nigeria' },
    { code: '+251', country: 'Ethiopia' },
    { code: '+254', country: 'Kenya' },
    { code: '+255', country: 'Tanzania' },
    { code: '+256', country: 'Uganda' },
    { code: '+260', country: 'Zambia' },
    { code: '+263', country: 'Zimbabwe' },
    { code: '+298', country: 'Faroe Islands' },
    { code: '+351', country: 'Portugal' },
    { code: '+352', country: 'Luxembourg' },
    { code: '+353', country: 'Ireland' },
    { code: '+354', country: 'Iceland' },
    { code: '+355', country: 'Albania' },
    { code: '+356', country: 'Malta' },
    { code: '+357', country: 'Cyprus' },
    { code: '+358', country: 'Finland' },
    { code: '+370', country: 'Lithuania' },
    { code: '+371', country: 'Latvia' },
    { code: '+372', country: 'Estonia' },
    { code: '+380', country: 'Ukraine' },
    { code: '+385', country: 'Croatia' },
    { code: '+386', country: 'Slovenia' },
    { code: '+387', country: 'Bosnia and Herzegovina' },
    { code: '+389', country: 'North Macedonia' },
    { code: '+420', country: 'Czech Republic' },
    { code: '+421', country: 'Slovakia' },
    { code: '+423', country: 'Liechtenstein' },
    { code: '+971', country: 'UAE' },
    { code: '+972', country: 'Israel' },
    { code: '+973', country: 'Bahrain' },
    { code: '+974', country: 'Qatar' },
    { code: '+975', country: 'Bhutan' },
    { code: '+976', country: 'Mongolia' },
    { code: '+977', country: 'Nepal' },
    { code: '+992', country: 'Tajikistan' },
    { code: '+993', country: 'Turkmenistan' },
    { code: '+994', country: 'Azerbaijan' },
    { code: '+995', country: 'Georgia' },
    { code: '+996', country: 'Kyrgyzstan' },
    { code: '+998', country: 'Uzbekistan' },
    // Add additional codes as needed
];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the first form group with basic information fields
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      photo_pic: ['', Validators.required],
      profession: ['', Validators.required],
      contactNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
    });

    // Initialize the second form group with location details
    this.secondFormGroup = this._formBuilder.group({
      home_country: ['', Validators.required],
      city_state: ['', Validators.required],
      current_country: ['', Validators.required],
      current_city_state: ['', Validators.required],
    });

    // Initialize the third form group with language and skills
    this.thirdFormGroup = this._formBuilder.group({
      languages: this._formBuilder.array([this._formBuilder.control('')]), // FormArray for languages
      skills: this._formBuilder.array([this._formBuilder.control('')]),    // FormArray for skills
    });
    this.fourthGroup = this._formBuilder.group({
      hEducation: ['', Validators.required],
      sNAME: ['', Validators.required],
      current_country: ['', Validators.required],
      current_city_state: ['', Validators.required],
    });
  }

  // Getter for languages FormArray
  get languages() {
    return (this.thirdFormGroup.get('languages') as FormArray);
  }

  // Getter for skills FormArray
  get skills() {
    return (this.thirdFormGroup.get('skills') as FormArray);
  }

  // Add a new language field
  addLanguage() {
    this.languages.push(this._formBuilder.control(''));
  }

  // Remove a language field
  removeLanguage(index: number) {
    this.languages.removeAt(index);
  }

  // Add a new skill field
  addSkill() {
    this.skills.push(this._formBuilder.control(''));
  }

  // Remove a skill field
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Save and complete form
  save() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      console.log('Form Data:', {
        firstForm: this.firstFormGroup.value,
        secondForm: this.secondFormGroup.value,
        thirdForm: this.thirdFormGroup.value
      });
    } else {
      console.log('Form is invalid');
    }
  }
  skillsText: string = ''; // To bind the input text
  skillsList: string[] = []; // List to store individual skills

  // Update skills list based on input text
  updateSkillsList(): void {
    this.skillsList = this.skillsText.split('\n').map(skill => skill.trim()).filter(skill => skill !== '');
  }
  // Handle file selection (for photo_pic field)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.firstFormGroup.patchValue({
      photo_pic: file
    });
  }
}
