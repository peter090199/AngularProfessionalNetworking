import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';

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
  fourthGroup: FormGroup;
  fifthFormGroup: FormGroup;  // Added for work experience step
  sixthFormGroup:FormGroup;


  languages: FormArray;
  skills: FormArray;
  educationStatus: string = 'graduate'; 
  educationStatus2: string = 'graduate'; 

  countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    { code: '+20', country: 'Egypt' },
    { code: '+27', country: 'South Africa' },
    // More country codes...
  ];

  skillsText: string = '';  // Input-bound text for skills
  skillsList: string[] = [];  // List of parsed skills

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeFormGroups();
  }

  // Initialize form groups with controls and validators
  private initializeFormGroups(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      photo_pic: [null, Validators.required],
      profession: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      home_country: ['', Validators.required],
      current_country: ['', Validators.required],
      city_state: ['', Validators.required],
      current_city_state: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      languages: this.formBuilder.array([this.createLanguageControl()]),
      skills: this.formBuilder.array([this.createSkillControl()]),
    });
    this.languages = this.thirdFormGroup.get('languages') as FormArray;
    this.skills = this.thirdFormGroup.get('skills') as FormArray;

    this.fourthGroup = this.formBuilder.group(
      {
        hEducation: ['', Validators.required],
        schoolName: ['', Validators.required],
        start: [null, Validators.required],
        end: [null, Validators.required],
        major_course:[''],
        schoolName2:[''],
        educationStatus2:[''],
        start_DateyearEntry: [null],
        end_DateyearEntry: [null],

      },
      {
        validators: [this.dateRangeValidator, this.dateRangeValidator2]
      }
      
    );

    this.fifthFormGroup = this.formBuilder.group({
      training_title:['',Validators.required],
      training_provider:['',Validators.required],
      date_completed: [null, Validators.required],
      training_title2:[''],
      training_provider2:['']
    });
    
    this.sixthFormGroup = this.formBuilder.group({
      seminar_title:['',Validators.required],
      seminar_provider:['',Validators.required],
      seminarDate_completed: [null, Validators.required],
      seminar_title2:[''],
      seminar_provider2:['']
    });
  }

  // Validator to ensure start date is before end date for education and work experience
  private dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    if (start && end && new Date(start) > new Date(end)) {
      return { invalidRange: true };
    }
    return null;
  }
  private dateRangeValidator2(group: FormGroup): { [key: string]: boolean } | null {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    if (start && end && new Date(start) > new Date(end)) {
      return { invalidRange: true };
    }
    return null;
  }


  // Getter for skills FormArray
  get skillsArray(): FormArray {
    return this.thirdFormGroup.get('skills') as FormArray;
  }

  // Getter for languages FormArray
  get languagesArray(): FormArray {
    return this.thirdFormGroup.get('languages') as FormArray;
  }

  // Add a new language field
  addLanguage(): void {
    this.languagesArray.push(this.createLanguageControl());
  }

  // Remove a language field
  removeLanguage(index: number): void {
    this.languagesArray.removeAt(index);
  }

  // Add a new skill field
  addSkill(): void {
    this.skillsArray.push(this.createSkillControl());
  }

  // Remove a skill field
  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  // Create a new FormControl for languages
  private createLanguageControl(): FormControl {
    return this.formBuilder.control('');
  }

  // Create a new FormControl for skills
  private createSkillControl(): FormControl {
    return this.formBuilder.control('');
  }

  // Update skills list based on input text
  updateSkillsList(): void {
    this.skillsList = this.skillsText
      .split('\n')
      .map(skill => skill.trim())
      .filter(skill => skill !== '');
  }

  // Handle file selection for photo_pic field
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.firstFormGroup.patchValue({ photo_pic: file });
    }
  }

  // Save and complete the form
  save(): void {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
     // this.fourthGroup.valid &&
      this.fifthFormGroup.valid
    ) {
      console.log('Form Data:', {
        firstForm: this.firstFormGroup.value,
        secondForm: this.secondFormGroup.value,
        thirdForm: this.thirdFormGroup.value,
        fourthGroup: this.fourthGroup.value,
        fifthForm: this.fifthFormGroup.value,
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
