import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ProfileService } from 'src/app/services/Profile/profile.service';
/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'app-curriculum-vitae-ui',
  templateUrl: './curriculum-vitae-ui.component.html',
  styleUrls: ['./curriculum-vitae-ui.component.css'],
})
export class CurriculumVitaeUIComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    { code: '+20', country: 'Egypt' },
    { code: '+27', country: 'South Africa' },
    // More country codes...
  ];
  constructor(private formBuilder: FormBuilder,private userService:ProfileService) {}
 userData:any;
 error: any;
 familyName:string="";
 lname:string="";
 fname:string="";
 profession:string="";

  ngOnInit(): void {
    this.userService.getProfileByUser().subscribe({
      next: (response) => {
        if (response.success) {
          this.userData = response.message[0]; 
          console.log(this.userData)
            this.fname = this.userData.fname;
            this.lname = this.userData.lname;
            this.profession = this.userData.profession;

        } else {
          this.error = 'Failed to load profile data';
        }
      },
      error: (err) => {
        this.error = err.message || 'An error occurred while fetching profile data';
      },
    });
    this.initializeFormGroups();

  }
  private GetUserData(): void {
    this.userService.getProfileByUser().subscribe({
      next: (response) => {
        if (response.success) {
          // Assuming the response has a structure like: { success: true, data: { familyName: 'Doe', firstName: 'John' } }
          const userData = response.fname; 
          this.familyName = userData.familyName || 'N/A'; // Default to 'N/A' if undefined
          this.lname = userData.fname || 'N/A'; // Default to 'N/A' if undefined
          // console.log('Family Name:', this.familyName);
          // console.log('First Name:', this.fname);
        } else {
          this.error = 'Failed to load profile data';
          console.error(this.error);
        }
      },
      error: (err) => {
        this.error = err.message || 'An error occurred while fetching profile data';
        console.error('API Error:', this.error);
      }
    });
  }
  

  private initializeFormGroups(): void {
    this.firstFormGroup = this.formBuilder.group({
      photo_pic: [null, Validators.required],
      contact_no: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
      ],
      contact_visibility: [1],
      email_visibility: [1],
      summary: [''],
      date_birth: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      home_country: ['', Validators.required],
      current_location: ['', Validators.required],
      home_city_state: ['', Validators.required],
      current_city_state: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      lines: this.formBuilder.group({
        capability: this.formBuilder.array([this.createCapability()]),
        education: this.formBuilder.array([this.createEducation()]),
        training: this.formBuilder.array([this.createTraining()]),
        seminar: this.formBuilder.array([this.createSeminar()]),
        employment: this.formBuilder.array([this.createEmployment()]),
        certificate:this.formBuilder.array([this.createCertificate()]),
      }),
    });
  }

  // Create a new capability FormGroup
  createCapability(): FormGroup {
    return this.formBuilder.group({
      language: ['', Validators.required],
      skills: ['', Validators.required],
    });
  }

  // Add capability to the FormArray
  addCapability(): void {
    this.capabilityArray.push(this.createCapability());
  }

  addItemToArray(arrayName: 'capability'): void {
    const formArray = this.thirdFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;

    if (!formArray) {
      console.error(`FormArray "lines.${arrayName}" not found.`);
      return;
    }

    // Add a new capability item to the form array
    formArray.push(
      this.formBuilder.group({
        language: ['', Validators.required], // Adjust validators as necessary
        skills: ['', Validators.required], // Adjust validators as necessary
      })
    );
  }

  // Create a new education FormGroup
  createEducation(): FormGroup {
    return this.formBuilder.group({
      highest_education: ['', Validators.required],
      school_name: ['', Validators.required],
      year_entry: ['', Validators.required],
      year_end: ['', Validators.required],
      status: ['completed'],
    });
  }

  // Add education to the FormArray
  addeducation(): void {
    this.educationArray.push(this.createEducation());
  }
  addTraining(): void {
    this.trainingArray.push(this.createTraining());
  }
  addSeminar(): void {
    this.seminarArray.push(this.createSeminar());
  }
  addEmployment(): void {
    this.employmentArray.push(this.createEmployment());
  }
  addCertificate(): void {
    this.certificateArray.push(this.createCertificate());
  }

  //trainings
  createTraining(): FormGroup {
    return this.formBuilder.group({
      training_title: ['', Validators.required],
      training_provider: ['', Validators.required],
      trainingdate: ['', Validators.required],
    });
  }
  //seminar
  createSeminar(): FormGroup {
    return this.formBuilder.group({
      seminar_title: ['', Validators.required],
      seminar_provider: ['', Validators.required],
      seminardate: ['', Validators.required],
    });
  }
//employment
createEmployment(): FormGroup {
  return this.formBuilder.group({
    company_name: ['', Validators.required],
    position: ['', Validators.required],
    job_description: ['', Validators.required],
    date_completed: ['', Validators.required],
  });
}
//employment
createCertificate(): FormGroup {
  return this.formBuilder.group({
    certificate_title: ['', Validators.required],
    certificate_provider: ['', Validators.required],
    date_completed: ['', Validators.required],
  });
}

  // Remove capability from the FormArray
  removeItemFromArray(arrayName: 'capability', index: number) {
    const formArray = this.thirdFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }

  // Remove education from the FormArray
  removeItemFromArray2(arrayName: 'education', index: number) {
    const formArray = this.thirdFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }
  //trainings
  removeItemFromArray3(arrayName: 'training', index: number) {
    const formArray = this.thirdFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }
//seminar
  removeItemFromArray4(arrayName: 'seminar', index: number) {
    const formArray = this.thirdFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }
//employment
removeItemFromArray5(arrayName: 'employment', index: number) {
  const formArray = this.thirdFormGroup.get(
    `lines.${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}
//certificate
removeItemFromArray6(arrayName: 'certificate', index: number) {
  const formArray = this.thirdFormGroup.get(
    `lines.${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}

  // Getters for the FormArrays
  get capabilityArray(): FormArray {
    return this.thirdFormGroup.get('lines.capability') as FormArray;
  }

  get educationArray(): FormArray {
    return this.thirdFormGroup.get('lines.education') as FormArray;
  }
  get trainingArray(): FormArray {
    return this.thirdFormGroup.get('lines.training') as FormArray;
  }

  get seminarArray(): FormArray {
    return this.thirdFormGroup.get('lines.seminar') as FormArray;
  }
  get employmentArray(): FormArray {
    return this.thirdFormGroup.get('lines.employment') as FormArray;
  }
  get certificateArray(): FormArray {
    return this.thirdFormGroup.get('lines.certificate') as FormArray;
  }

  // Handle file selection for photo_pic
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.firstFormGroup.patchValue({ photo_pic: file });
      this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();
    }
  }

  submit(): void {
    const mergedData = {
      ...this.firstFormGroup.value, // Merge values from the first form group
      ...this.secondFormGroup.value, // Merge values from the second form group
      ...this.thirdFormGroup.value, // Merge values from the third form group
    };
  
    // Ensure TypeScript understands the structure of the data
    const sortedData = Object.keys(mergedData)
      .sort()
      .reduce((acc: { [key: string]: any }, key: string) => {
        acc[key] = mergedData[key];
        return acc;
      }, {}); // Start with an empty object
  
    console.log("data:" ,sortedData); // Output the sorted object
  }
  
  // submit(): void {
  //   if (
  //     this.firstFormGroup.valid ||
  //     this.secondFormGroup.valid ||
  //     this.thirdFormGroup.valid
  //   ) {
  //     const mergedData = {
  //       ...this.firstFormGroup.value, // Merges the values from the first form group
  //       ...this.secondFormGroup.value, // Merges the values from the second form group
  //       ...this.thirdFormGroup.value, // Merges the values from the third form group
  //     };

  //     // Now you can use mergedData to send to the server or save it wherever needed
  //     console.log(mergedData);
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

}
