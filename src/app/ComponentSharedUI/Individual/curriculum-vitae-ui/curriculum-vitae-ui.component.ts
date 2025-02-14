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
import { Router } from '@angular/router';
/**
 * @title Basic expansion panel
 */

interface FileDetails {
  file: File;
  filename: string;
}

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
    // this.stepper.selectionChange.subscribe(() => {
    //   this.updateProgress();
    // });

    this.firstFormGroup.valueChanges.subscribe(() => {
      this.updateProgress();
    });
    // this.firstFormGroup.valueChanges.subscribe(() => {
    //   this.updateProgress();
    // });
    // this.firstFormGroup.valueChanges.subscribe(() => {
    //   this.updateProgress();
    // });
    // this.firstFormGroup.valueChanges.subscribe(() => {
    //   this.updateProgress();
    // });
  }
  updateProgress() {
    const totalSteps = 4; // Total steps in your stepper
    // const currentStepIndex = this.stepper.selectedIndex;
    const stepsFilled = this.calculateFilledSteps();
    this.progressValue = (stepsFilled / totalSteps) * 100;
  }

  calculateFilledSteps(): number {
    let filledSteps = 0;

    if (this.firstFormGroup.valid) filledSteps++;
    // if (this.secondFormGroup.valid) filledSteps++;
    // if (this.thirdFormGroup.valid) filledSteps++;
    // if (this.summaryFormGroup.valid) filledSteps++;

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
              private notificationService:NotificationsService,private router:Router
  ) {}
 userData:any;
 error: any;
 familyName:string="";
 lname:string="";
 fname:string="";
 email:string="";
 contact_no:string="";
 profession:string="";
 progressPercentage = 0;

 ngOnInit(): void {
  this.initializeFormGroups();
  this.GetUserData();
}

 private GetUserData(): void {
  //    this.userService.getProfileByUser().subscribe({
  //   next: (response) => {
  //     if (response.success && response.message.length) {
  //       const userData = response.message[0]; // Ensure message[0] exists
  //       if(userData != null){
  //         this.fname = userData.fname;
  //         this.lname = userData.lname;
  //         this.email = "pedroyorpo22@gmail.com";
  //         this.contact_no = userData.contact_no;
  //         this.profession = userData.profession;
  //       }
       
  //     } else {
  //       this.error = 'Failed to load profile data';
  //     }
  //   },
  //   error: (err) => {
  //     this.error = err?.message || 'An error occurred while fetching profile data';
  //   },
  // });
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
      photo_pic: [null], 
      contact_no: ['', Validators.required,Validators.pattern(/^\+?[0-9]{7,15}$/)],
      contact_visibility: [0],
      email_visibility: [0],
      date_birth: ['', Validators.required],
      home_country: ['', Validators.required],
      current_location: ['', Validators.required],
      home_state: ['', Validators.required],
      current_state: ['', Validators.required],
      summary: ['', Validators.required],
      lines: this.formBuilder.group({
        capability: this.formBuilder.array([this.createCapability()]),
        education: this.formBuilder.array([this.createEducation()]),
        training: this.formBuilder.array([this.createTraining()]),
        seminar: this.formBuilder.array([this.createSeminar()]),
        employment: this.formBuilder.array([this.createEmployment()]),
        certificate: this.formBuilder.array([this.createCertificate()]),
      }), // Corrected the placement of the closing parenthesis
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

  onToggleChange(event: any, controlName: string): void {
    const toggleValue = event.checked ? 1 : 0; // 1 for Hide, 0 for Show
    this.firstFormGroup.patchValue({ [controlName]: toggleValue });
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
    const formArray = this.firstFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }

  // Remove education from the FormArray
  removeItemFromArray2(arrayName: 'education', index: number) {
    const formArray = this.firstFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }
  //trainings
  removeItemFromArray3(arrayName: 'training', index: number) {
    const formArray = this.firstFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }
//seminar
  removeItemFromArray4(arrayName: 'seminar', index: number) {
    const formArray = this.firstFormGroup.get(
      `lines.${arrayName}`
    ) as FormArray;
    formArray.removeAt(index);
  }

//employment
removeItemFromArray5(arrayName: 'employment', index: number) {
  const formArray = this.firstFormGroup.get(
    `lines.${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}
//certificate
removeItemFromArray6(arrayName: 'certificate', index: number) {
  const formArray = this.firstFormGroup.get(
    `lines.${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}

  // Getters for the FormArrays
  get capabilityArray(): FormArray {
    return this.firstFormGroup.get('lines.capability') as FormArray;
  }

  get educationArray(): FormArray {
    return this.firstFormGroup.get('lines.education') as FormArray;
  }
  get trainingArray(): FormArray {
    return this.firstFormGroup.get('lines.training') as FormArray;
  }

  get seminarArray(): FormArray {
    return this.firstFormGroup.get('lines.seminar') as FormArray;
  }
  get employmentArray(): FormArray {
    return this.firstFormGroup.get('lines.employment') as FormArray;
  }
  get certificateArray(): FormArray {
    return this.firstFormGroup.get('lines.certificate') as FormArray;
  }

    fileError: string = ''; // To store validation error messages
    selectedFile: File | null = null;
    previewUrl: string | null = null;
    filename: string = "";

  
    fileData: any = null;
  
    onUploadPhoto(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          this.fileError = 'Please upload a valid image file (JPEG/PNG).';
          return;
        }
        this.fileError = 'Please upload a valid image file.';
        this.fileData = file.toString();
      }
    }
    onFileSelected2e(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        this.firstFormGroup.patchValue({ photo_pic: this.selectedFile });
        this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();
      }
    }

    onFileSelected2(event: Event): void {
      const input = event.target as HTMLInputElement;
    
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          const binaryString = reader.result as string; // Binary data of the image
          console.log('Binary String:', binaryString);
    
          // You can also convert the binary string to a base64 string if needed
          const base64String = btoa(binaryString);
          console.log('Base64 String:', base64String);
    
          // Example: attach it to a form payload
          this.firstFormGroup.patchValue({
            photo_pic: base64String,
          });
        };
    
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
    
        reader.readAsBinaryString(file);
      }
    }
    
    onUploadPhoto2(event: Event): void {
      const input = event.target as HTMLInputElement;
    
      if (input?.files && input.files[0]) {
        const file = input.files[0];
    
        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.fileError = 'Please upload a valid image file.';
          this.clearPreview();
          return;
        }
    
        // Validate file size (e.g., max 2MB)
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSizeInBytes) {
          this.fileError = 'File size exceeds 2MB. Please upload a smaller file.';
          this.clearPreview();
          return;
        }
        this.selectedFile = file;
        this.filename = file.name;
        // Generate a preview URL
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    
    clearPreview(): void {
      this.previewUrl = null;
      this.selectedFile = null;
    }
    

  loading     : boolean = false;
  success : boolean = true;


  isFormArray(value: any): boolean {
    return value instanceof FormArray;
  }


  refreshHomePage() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject('File reading failed');
        }
      };
      reader.onerror = () => {
        reject('File reading encountered an error');
      };
      reader.readAsDataURL(file); // Reads the file and encodes it as a data URL
    });
  }
  
  submitxx() {
    const mergedData = {
      ...this.firstFormGroup.getRawValue(), // Merge values from the first form group
    };
  
    // // Ensure TypeScript understands the structure of the data
    // const sortedData = Object.keys(mergedData)
    //   .sort()
    //   .reduce((acc: { [key: string]: any }, key: string) => {
    //     acc[key] = mergedData[key];
    //     return acc;
    //   }, {}); // Start with an empty object
   
    if (this.selectedFile) {
      mergedData.append('photo_pic', this.selectedFile, this.selectedFile.name); // Optional: provide a filename
    } 
    // if (this.selectedFile) {
    //   mergedData.append('photo_pic', this.selectedFile, this.selectedFile.name);
    // }
    
    console.log("data:",mergedData); // Output the sorted object
  

    this.cvService.postCV(mergedData).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.toastrSuccess(res.message);
          this.refreshHomePage();
        } else {
          this.notificationService.toastrError(res.message);
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Submission error:', error);
        this.notificationService.toastrError(error.error);
        this.loading = false;
      },
    });
}
submit() {
  const formData = this.firstFormGroup.getRawValue();
  const payload = new FormData();

  // Append image file if available
  if (this.selectedFile) {
    payload.append('photo_pic', this.selectedFile, this.selectedFile.name);
  }

  // Append other form data fields
  payload.append('contact_no', this.firstFormGroup.value.contact_no);
  payload.append('contact_visibility', this.firstFormGroup.value.contact_visibility.toString());
  payload.append('email_visibility', this.firstFormGroup.value.email_visibility.toString());
  payload.append('date_birth', this.firstFormGroup.value.date_birth);
  payload.append('home_country', this.firstFormGroup.value.home_country);
  payload.append('current_location', this.firstFormGroup.value.current_location);
  payload.append('home_state', this.firstFormGroup.value.home_state);
  payload.append('current_state', this.firstFormGroup.value.current_state);
  payload.append('summary', this.firstFormGroup.value.summary);

  // Get 'lines' field from the form
  const lines = this.firstFormGroup.get('lines')?.value;
  if (lines && typeof lines === 'object') {
    // Convert lines object into an array of objects
    const linesArray = [
      { capability: lines.capability },
      { education: lines.education },
      { training: lines.training },
      { seminar: lines.seminar },
      { employment: lines.employment },
      { certificate: lines.certificate },
    ];

    // Append the whole lines array as a JSON string
    payload.append('lines', JSON.stringify(linesArray));
  } else {
    console.error('The "lines" object is not valid or is undefined.');
  }

  // Log the payload to verify the content
  console.log(payload);

  // Submit the combined payload to the server
  this.cvService.postCV(payload).subscribe({
    next: (res) => {
      if (res.success) {
        this.notificationService.toastrSuccess(res.message);
     //   this.refreshHomePage();
      } else {
        this.notificationService.toastrError(res.message);
      }
      this.loading = false;
    },
    error: (error: any) => {
      console.error('Submission error:', error);
      this.notificationService.toastrError(error.error);
      this.loading = false;
    },
  });
}

  submitxxx(): void {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo_pic', this.selectedFile, this.selectedFile.name); // Optional: provide a filename
      } 
     console.log(this.selectedFile)  //  formData.append('photo_pic', this.firstFormGroup.value.photo_pic);
      formData.append('contact_no', this.firstFormGroup.value.contact_no);
      formData.append('contact_visibility', this.firstFormGroup.value.contact_visibility.toString());
      formData.append('email_visibility', this.firstFormGroup.value.email_visibility.toString());
      formData.append('date_birth', this.firstFormGroup.value.date_birth);


      formData.append('home_country', this.firstFormGroup.value.home_country);
      formData.append('current_location', this.firstFormGroup.value.current_location);
      formData.append('home_state', this.firstFormGroup.value.home_state);
      formData.append('current_state', this.firstFormGroup.value.current_state);

      formData.append('summary',  this.firstFormGroup.value.summary);
    
      const lines = this.firstFormGroup.get('lines')?.value; 
      // Check if lines is a valid object and contains FormArrays
      if (lines) {
        // You can access each array like this and serialize them
        formData.append('capability', JSON.stringify(lines.capability));
        formData.append('education', JSON.stringify(lines.education));
        formData.append('training', JSON.stringify(lines.training));
        formData.append('seminar', JSON.stringify(lines.seminar));
        formData.append('employment', JSON.stringify(lines.employment));
        formData.append('certificate', JSON.stringify(lines.certificate));
      } else {
        console.error('The "lines" object is not valid.');
      }
  
      console.log(formData);
  
      this.cvService.postCV(formData).subscribe({
        next: (res) => {
          if (res.success === true) {
            this.notificationService.toastrSuccess(res.message);
          } else {
            this.notificationService.toastrError(res.message);
          }
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Submission error:', error);
          this.notificationService.toastrError(error.error);
          this.loading = false;
        },
      });
    
  }



  
  
  appendFormArrayToFormData(formData: FormData, key: string, formArray: FormArray) {
    formArray.controls.forEach((control, index) => {
      Object.keys(control.value).forEach(field => {
        formData.append(`${key}[${index}][${field}]`, control.get(field)?.value);
      });
    });
  }

   }


