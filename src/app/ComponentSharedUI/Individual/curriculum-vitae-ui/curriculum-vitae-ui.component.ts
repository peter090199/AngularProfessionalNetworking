import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild,AfterViewInit  } from '@angular/core';
import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ProfileService } from 'src/app/services/Profile/profile.service';
import { MatHorizontalStepper } from '@angular/material/stepper/stepper';
/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'app-curriculum-vitae-ui',
  templateUrl: './curriculum-vitae-ui.component.html',
  styleUrls: ['./curriculum-vitae-ui.component.css'],
})

export class CurriculumVitaeUIComponent implements AfterViewInit  {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  progressValue: number = 0;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  summaryFormGroup:FormGroup;
  thirdFormGroup: FormGroup;

  ngAfterViewInit() {
    this.stepper.selectionChange.subscribe(() => {
      this.updateProgress();
    });

    this.firstFormGroup.valueChanges.subscribe(() => {
      this.updateProgress();
    });
    this.secondFormGroup.valueChanges.subscribe(() => {
      this.updateProgress();
    });
    this.thirdFormGroup.valueChanges.subscribe(() => {
      this.updateProgress();
    });
    this.summaryFormGroup.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }
  updateProgress() {
    const totalSteps = 4; // Total steps in your stepper
    const currentStepIndex = this.stepper.selectedIndex;
    const stepsFilled = this.calculateFilledSteps();
    this.progressValue = (stepsFilled / totalSteps) * 100;
  }

  calculateFilledSteps(): number {
    let filledSteps = 0;

    if (this.firstFormGroup.valid) filledSteps++;
    if (this.secondFormGroup.valid) filledSteps++;
    if (this.thirdFormGroup.valid) filledSteps++;
    if (this.summaryFormGroup.valid) filledSteps++;

    return filledSteps;
  }
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

  constructor(private formBuilder: FormBuilder,private userService:ProfileService,
              private cvService:CurriculumVitaeService,
              private notificationService:NotificationsService
  ) {}
 userData:any;
 error: any;
 familyName:string="";
 lname:string="";
 fname:string="";
 profession:string="";
 progressPercentage = 0;

 ngOnInit(): void {
  this.initializeFormGroups();
  this.GetUserData();
}

 private GetUserData(): void {
     this.userService.getProfileByUser().subscribe({
    next: (response) => {
      if (response.success && response.message.length) {
        const userData = response.message[0]; // Ensure message[0] exists
        if(userData != null){
          this.fname = userData.fname;
          this.lname = userData.lname;
          this.profession = userData.profession;
        }
       
      } else {
        this.error = 'Failed to load profile data';
      }
    },
    error: (err) => {
      this.error = err?.message || 'An error occurred while fetching profile data';
    },
  });
  }
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 20;
  vertical = false;
  tickInterval = 10;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  percentage: number = 0;
  displayPercentage: string = '0%';

  updatePercentage(): void {
    // Total fields and number of filled fields
    const fields = [this.fname, this.lname];
    const filledFields = fields.filter(field => field.trim().length > 0).length;

    // Calculate percentage
    this.percentage = (filledFields / fields.length) * 100;
    this.displayPercentage = `${this.percentage}%`;
 }



  // updateProgress(event: any) {
  //   const stepCount = event.stepper._steps.length;
  //   const currentIndex = event.selectedIndex + 1;
  //   this.progressPercentage = (currentIndex / stepCount) * 100;
  // }
  label:any;
  educationStatusOptions = [
    { value: 'graduate', label: 'Graduate' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'ongoing', label: 'Ongoing' }
  ];

  private initializeFormGroups(): void {

    this.firstFormGroup = this.formBuilder.group({
      photo_pic: ['', Validators.required],
      contact_no: ['',Validators.required],
      contact_visibility: ['1'],
      email_visibility: ['1'],
      date_birth: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      home_country: ['', Validators.required],
      current_location: ['', Validators.required],
      home_state: ['', Validators.required],
      current_state: ['', Validators.required],
    });
    this.summaryFormGroup = this.formBuilder.group({
      summary: ['', Validators.required],
    
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
      status: [''],
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
  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     this.firstFormGroup.patchValue({ photo_pic: file });
  //     this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();
  //   }
  // }

  imagePreview: string | null = null; // To store preview URL
fileError: string = ''; // To store validation error messages

onFileSelecteds(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.firstFormGroup.patchValue({ photo_pic: file });
    this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();

    this.previewImage(file);
  }
}

previewImage(file: File) {
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}

onFileSelected3(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file: File = input.files[0];
    this.firstFormGroup.patchValue({ photo_pic: file });
    this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();
  }
}

selectedFile: File | null = null;
previewUrl: string | ArrayBuffer | null = null;
onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      // Allowed file types
      const allowedTypes = ['image/png', 'image/jpeg'];
      // Max file size in bytes (e.g., 2MB)
      const maxFileSize = 2 * 1024 * 1024;
  
      // Reset errors before validating
      this.fileError = '';
  
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'The photo pic field must be an image (JPG or PNG).';
        this.firstFormGroup.patchValue({ photo_pic: null });
        return;
      }
  
      // Validate file size
      if (file.size > maxFileSize) {
        this.fileError = 'The photo pic file size must not exceed 2MB.';
        this.firstFormGroup.patchValue({ photo_pic: null });
        return;
      }
  
      // If valid, update the form control
      this.firstFormGroup.patchValue({ photo_pic: file });
      this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();
  
      // Optional: Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Store preview URL
      };
      reader.readAsDataURL(file);
    } else {
      this.fileError = 'The photo pic field must be a file.';
      this.firstFormGroup.patchValue({ photo_pic: null });
    }
  }
  
  
  
  onUploadPhoto(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  loading     : boolean = false;
  success : boolean = true;

  submit2(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.summaryFormGroup.valid && this.thirdFormGroup.valid) {
      const formData = new FormData();
  
      // Append basic form data
      formData.append('photo_pic', this.firstFormGroup.get('photo_pic')?.value);
      formData.append('contact_no', this.firstFormGroup.get('contact_no')?.value);
      formData.append('email_visibility', this.firstFormGroup.get('email_visibility')?.value);
      formData.append('date_birth', this.firstFormGroup.get('date_birth')?.value);
      formData.append('home_country', this.secondFormGroup.get('home_country')?.value);
      formData.append('current_location', this.secondFormGroup.get('current_location')?.value);
      formData.append('summary', this.summaryFormGroup.get('summary')?.value);
      this.thirdFormGroup.value,
      // Append lines (capability, education, training, etc.) from third form group
      // this.appendFormArrayToFormData(formData, 'capabilities', this.capabilityArray);
      // this.appendFormArrayToFormData(formData, 'education', this.educationArray);
      // this.appendFormArrayToFormData(formData, 'training', this.trainingArray);
      // this.appendFormArrayToFormData(formData, 'seminar', this.seminarArray);
      // this.appendFormArrayToFormData(formData, 'employment', this.employmentArray);
      // this.appendFormArrayToFormData(formData, 'certificate', this.certificateArray);
   
      this.loading = true;
      console.log(formData)
      // Now send the form data to your backend
      this.cvService.postCV(formData).subscribe({
        next: (res) => {
          if (res.success) {
            this.notificationService.toastrSuccess(res.message);
            this.loading = false;
          } else {
            this.notificationService.toastrError(res.message);
            this.loading = false;
          }
        },
        error: (error: any) => {
          this.notificationService.toastrError(error.error);
          this.loading = false;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  // Helper method to append FormArray data to FormData
  // appendFormArrayToFormData(formData: FormData, key: string, formArray: FormArray) {
  //   formArray.controls.forEach((control, index) => {
  //     Object.keys(control.value).forEach(field => {
  //       formData.append(`${key}[${index}][${field}]`, control.get(field)?.value);
  //     });
  //   });
  // }
  
  isFormArray(value: any): boolean {
    return value instanceof FormArray;
  }
  
  
  submit(): void {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.summaryFormGroup.valid &&
      this.thirdFormGroup.valid
    ) {

      const formData = new FormData();
  
      // First Form Group
      const first = this.firstFormGroup.value;
      formData.append('photo_pic', first.photo_pic); 
      formData.append('contact_no', first.contact_no);
      formData.append('contact_visibility', first.contact_visibility.toString());
      formData.append('email_visibility', first.email_visibility.toString()); 
      formData.append('date_birth', first.date_birth);

      // const fileInput = this.firstFormGroup.get('photo_pic')?.value;
      // if (fileInput instanceof File) {
      //   formData.append('photo_pic', fileInput, fileInput.name); 
      // }
      // Second Form Group
      const second = this.secondFormGroup.value;
      formData.append('home_country', second.home_country || '');
      formData.append('current_location', second.current_location || '');
      formData.append('home_state', second.home_state || '');
      formData.append('current_state', second.current_state || '');
  
      // Summary Form Group
      const summary = this.summaryFormGroup.value;
      formData.append('summary', summary.summary || '');
  
      // Third Form Group
      const third = this.thirdFormGroup.value;
      formData.append('lines[capability]', JSON.stringify(third.lines.capability || []));
      formData.append('lines[education]', JSON.stringify(third.lines.education || []));
      formData.append('lines[training]', JSON.stringify(third.lines.training || []));
      formData.append('lines[seminar]', JSON.stringify(third.lines.seminar || []));
      formData.append('lines[employment]', JSON.stringify(third.lines.employment || []));
      formData.append('lines[certificate]', JSON.stringify(third.lines.certificate || []));
  
      // Debug FormData
    
//     console.log(first);
//     console.log(second);
//     console.log(summary);
//     console.log(third);
//  // Debug: Log FormData content
//     formData.forEach((value, key) => {
//       console.log(`${key}: ${value}`);
//     });


      const mergedData = {
                ...this.firstFormGroup.value,
                ...this.secondFormGroup.value,
                ...this.summaryFormGroup.value,
                ...this.thirdFormGroup.value,
            };
            console.log(mergedData)
      // Submit to Service
      this.cvService.postCV(mergedData).subscribe({
        next: (res) => {
          if (res.success) {
            this.notificationService.toastrSuccess(res.message);
            this.loading = false;
          } else {
            this.notificationService.toastrError(res.message);
            this.loading = false;
          }
        },
        error: (error: any) => {
          console.error('Submission error:', error);
          this.notificationService.toastrError(error.error);
          this.loading = false;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  

  submit11(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.summaryFormGroup.valid && this.thirdFormGroup.valid) {
      const formData = new FormData();
    
    const first = this.firstFormGroup.value;
    formData.append('photo_pic', first.photo_pic); 
    formData.append('contact_no', first.contact_no);
    formData.append('contact_visibility', first.contact_visibility.toString());
    formData.append('email_visibility', first.email_visibility.toString()); 
    formData.append('date_birth', first.date_birth);

    const fileInput = this.firstFormGroup.get('photo_pic')?.value;
    if (fileInput instanceof File) {
      formData.append('photo_pic', fileInput, fileInput.name); 
    }
 // Second Form Group
    const second = this.secondFormGroup.value;
    formData.append('home_country', second.home_country);
    formData.append('current_location', second.current_location);
    formData.append('home_state', second.home_state);
    formData.append('current_state', second.current_state);

    // Summary Form Group
    const summary = this.summaryFormGroup.value;
    formData.append('summary', summary.summary); // Corrected key to 'summary'

    const third = this.thirdFormGroup.value;
    formData.append('lines[capability]', JSON.stringify(third.lines.capability));
    formData.append('lines[education]', JSON.stringify(third.lines.education));
    formData.append('lines[training]', JSON.stringify(third.lines.training));
    formData.append('lines[seminar]', JSON.stringify(third.lines.seminar));
    formData.append('lines[employment]', JSON.stringify(third.lines.employment));
    formData.append('lines[certificate]', JSON.stringify(third.lines.certificate));
   


    console.log(formData);
    

  this.cvService.postCV(formData).subscribe({
            next: (res) => {
                if (res.success) {
                    this.notificationService.toastrSuccess(res.message);
                    // Optionally reset form or handle after success
                    // this.ResetForm(); // Uncomment to reset the form if needed
                    this.loading = false;
                } else {
                    this.notificationService.toastrError(res.message);
                    this.loading = false;
                }
            },
            error: (error: any) => {
                this.success = false;
                this.notificationService.toastrError(error.error);
                this.loading = false;
                // Set loading to false in case of error
            },
        });
  }
  else {
    console.log('Form is invalid');
  }
}
  appendFormArrayToFormData(formData: FormData, key: string, formArray: FormArray) {
    formArray.controls.forEach((control, index) => {
      Object.keys(control.value).forEach(field => {
        formData.append(`${key}[${index}][${field}]`, control.get(field)?.value);
      });
    });
  }

   }


