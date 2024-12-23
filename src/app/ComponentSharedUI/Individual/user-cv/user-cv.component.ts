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
import { DatePipe } from '@angular/common';
/**
 * @title Basic expansion panel
 */

interface FileDetails {
  file: File;
  filename: string;
}


@Component({
  selector: 'app-user-cv',
  templateUrl: './user-cv.component.html',
  styleUrls: ['./user-cv.component.css']
})
export class UserCVComponent implements AfterViewInit  {
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
              private notificationService:NotificationsService,private router:Router,private datePipe:DatePipe
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
     this.userService.getProfileByUser().subscribe({
    next: (response) => {
      if (response.success && response.message.length) {
        const userData = response.message[0]; // Ensure message[0] exists
        if(userData != null){
          this.fname = userData.fname;
          this.lname = userData.lname;
          this.email = "pedroyorpo22@gmail.com";
          this.contact_no = userData.contact_no;
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
      photo_pic: [null],  // Set to null if no file is selected
      contact_no: ['', Validators.required],
      contact_visibility: [0],
      email_visibility: [0],
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

    // onFileSelected(event: Event): void {
    //   const input = event.target as HTMLInputElement;
    //   if (input.files && input.files.length > 0) {
    //     this.input.files[0];
    //     this.firstFormGroup.patchValue({ photo_pic: file });
    //     this.firstFormGroup.get('photo_pic')?.updateValueAndValidity();
    //   }
    // }


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

  submit() {
    // Set loading to true to indicate process start
    this.loading = true;
    const dateOfBirth = this.firstFormGroup.value?.date_birth
      ? this.datePipe.transform(this.firstFormGroup.value.date_birth, 'yyyy-MM-dd')
      : null;
  
    // Merge all form group values
    const mergeData = {
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.summaryFormGroup.getRawValue(),
      ...this.thirdFormGroup.getRawValue(),
    };
  
    // Add formatted date of birth to mergeData if it exists
    if (dateOfBirth) {
      mergeData.date_birth = dateOfBirth;
    }
  
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad single-digit months
      const day = String(date.getDate()).padStart(2, '0'); // Pad single-digit days
      return `${year}-${month}-${day}`; // Returns in 'YYYY-MM-DD' format
    };
  
    const lines = this.thirdFormGroup.get('lines')?.value;
  
    if (lines) {
      // Initialize empty arrays for each section within lines
      const capability: { language: string; skills: string; }[] = [];
      const education: { highest_education: string; school_name: string; year_entry: number; year_end: number; status: string; }[] = [];
      const training: { training_title: string; training_provider: string; trainingdate: string; }[] = [];
      const seminar: { seminar_title: string; seminar_provider: string; seminardate: string; }[] = [];
      const employment: { company_name: string; position: string; job_description: string; date_completed: string; }[] = [];
      const certificate: { certificate_title: string; certificate_provider: string; date_completed: string; }[] = [];
  
      // Format the data for each section within lines
      if (lines.capability) {
        lines.capability.forEach((cap: { language: string, skills: string }) => {
          capability.push({
            language: cap.language,
            skills: cap.skills,
          });
        });
      }
  
      if (lines.education) {
        lines.education.forEach((edu: { highest_education: string, school_name: string, year_entry: number, year_end: number, status: string }) => {
          education.push({
            highest_education: edu.highest_education,
            school_name: edu.school_name,
            year_entry: edu.year_entry,
            year_end: edu.year_end,
            status: edu.status,
          });
        });
      }
  
      if (lines.training) {
        lines.training.forEach((train: { training_title: string, training_provider: string, trainingdate: string }) => {
          training.push({
            training_title: train.training_title,
            training_provider: train.training_provider,
            trainingdate: formatDate(train.trainingdate),
          });
        });
      }
  
      if (lines.seminar) {
        lines.seminar.forEach((sem: { seminar_title: string, seminar_provider: string, seminardate: string }) => {
          seminar.push({
            seminar_title: sem.seminar_title,
            seminar_provider: sem.seminar_provider,
            seminardate: formatDate(sem.seminardate),
          });
        });
      }
  
      if (lines.employment) {
        lines.employment.forEach((emp: { company_name: string, position: string, job_description: string, date_completed: string }) => {
          employment.push({
            company_name: emp.company_name,
            position: emp.position,
            job_description: emp.job_description,
            date_completed: formatDate(emp.date_completed),
          });
        });
      }
  
      if (lines.certificate) {
        lines.certificate.forEach((cert: { certificate_title: string, certificate_provider: string, date_completed: string }) => {
          certificate.push({
            certificate_title: cert.certificate_title,
            certificate_provider: cert.certificate_provider,
            date_completed: formatDate(cert.date_completed),
          });
        });
      }
  
      // Structure the final 'lines' object
      const formattedLines = {
        capability: capability,
        education: education,
        training: training,
        seminar: seminar,
        employment: employment,
        certificate: certificate,
      };
  
      // Merge the formatted lines with the rest of the form data
      const final = { ...mergeData, lines: formattedLines };
      // Submit the combined payload to the server
      this.cvService.postCV2(final).subscribe({
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
          this.notificationService.toastrError(error?.error || 'An unexpected error occurred.');
          this.loading = false;
        },
      });
    } else {
      console.warn('No lines data found in thirdFormGroup.');
    }
  }
  
  submit22() {
    // Set loading to true to indicate process start
    this.loading = true;
    const dateOfBirth = this.firstFormGroup.value?.date_birth
      ? this.datePipe.transform(this.firstFormGroup.value.date_birth, 'yyyy-MM-dd')
      : null;
  
    // Merge all form group values
    const mergeData = {
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.summaryFormGroup.getRawValue(),
      ...this.thirdFormGroup.getRawValue(),
    };
  
    // Log the merged data and formatted date of birth
  
  
    // Add formatted date of birth to mergeData if it exists
    if (dateOfBirth) {
      mergeData.date_birth = dateOfBirth;
    }
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Pad single-digit months
      const day = String(date.getDate()).padStart(2, '0'); // Pad single-digit days
      return `${year}-${month}-${day}`; // Returns in 'YYYY-MM-DD' format
    };
  
    const lines = this.thirdFormGroup.get('lines')?.value;
  
    
    if (lines) {
      // Format the dates for each section within lines
      if (lines.training) {
        lines.training.forEach((training: { trainingdate: string }) => {
          training.trainingdate = formatDate(training.trainingdate);
        });
      }
  
      if (lines.seminar) {
        lines.seminar.forEach((seminar: { seminardate: string }) => {
          seminar.seminardate = formatDate(seminar.seminardate);
        });
      }
  
      if (lines.employment) {
        lines.employment.forEach((employment: { date_completed: string }) => {
          employment.date_completed = formatDate(employment.date_completed);
        });
      }
  
      if (lines.certificate) {
        lines.certificate.forEach((cert: { date_completed: string }) => {
          cert.date_completed = formatDate(cert.date_completed);
        });
      }
  
      // Optionally log formatted lines
      console.log('Formatted Lines:', JSON.stringify(lines, null, 2));
    } else {
      console.warn('No lines data found in thirdFormGroup.');
    }
  
    // console.log('Merged Data:', mergeData);
    // console.log('Formatted Date of Birth:', dateOfBirth);
    const data1 = mergeData;
    const data = lines;
   
    const final = { ...data1, ...data}; // Parse the JSON to merge with final data

    console.log(final);

    // Submit the combined payload to the server
    this.cvService.postCV2(final).subscribe({
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
        this.notificationService.toastrError(error?.error || 'An unexpected error occurred.');
        this.loading = false;
      },
    });
  }
  
  
  submit44() {
    const mergeData = { 
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.summaryFormGroup.getRawValue(),
      ...this.thirdFormGroup.getRawValue(),
    }

    const dateOfBirth = this.firstFormGroup.value?.date_birth;
    const trainingdate = this.thirdFormGroup.value?.trainingdate;
    const seminardate = this.thirdFormGroup.value?.seminardate;
    const date_completed = this.thirdFormGroup.value?.date_completed;

    const formattedDate = dateOfBirth 
      ? this.datePipe.transform(dateOfBirth, 'yyyy-MM-dd') 
      : null;
  
    console.log('Merged Data:', mergeData);
    console.log('Formatted Date of Birth:', formattedDate);
  
    // Add formattedDate to mergeData if necessary
    if (formattedDate) {
      mergeData.date_birth = formattedDate;
    }
  
    this.cvService.postCV2(mergeData).subscribe({
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
  


  submit33(): void {
    this.firstFormGroup.valid &&
    this.secondFormGroup.valid &&
    this.thirdFormGroup.valid
      const formData = new FormData();
    
      if (this.selectedFile) {
        formData.append('photo_pic', this.selectedFile, this.selectedFile.name); // Optional: provide a filename
      } 
      formData.append('contact_no', this.firstFormGroup.value.contact_no);
      formData.append('contact_visibility', this.firstFormGroup.value.contact_visibility.toString());
      formData.append('email_visibility', this.firstFormGroup.value.email_visibility.toString());
      formData.append('date_birth', this.firstFormGroup.value.date_birth);
      formData.append('home_country', this.secondFormGroup.value.home_country);
      formData.append('current_location', this.secondFormGroup.value.current_location);
      formData.append('home_state', this.secondFormGroup.value.home_state);
      formData.append('current_state', this.secondFormGroup.value.current_state);
      formData.append('summary',  this.summaryFormGroup.value.summary);
    
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
        formData.append('lines', JSON.stringify(linesArray));
      } else {
        console.error('The "lines" object is not valid or is undefined.');
      }
    
  
//     const appendFormArrayData = (formArray: FormArray, baseKey: string) => {
//       formArray.controls.forEach((control, index) => {
//           const controlValue = control.value; // Assuming control.value is an object with keys like `language`, `skills`, etc.
//           Object.keys(controlValue).forEach((key) => {
//               formData.append(`${baseKey}[${index}][${key}]`, controlValue[key]);
//           });
//       });
//   };

//   // Capability
// const capabilityArray = this.thirdFormGroup.get(['lines', 'capability']) as FormArray;
// if (capabilityArray) {
//     appendFormArrayData(capabilityArray, 'lines.capability');
// }

// // Education
// const educationArray = this.thirdFormGroup.get(['lines', 'education']) as FormArray;
// if (educationArray) {
//     appendFormArrayData(educationArray, 'lines.education');
// }

// // Training
// const trainingArray = this.thirdFormGroup.get(['lines', 'training']) as FormArray;
// if (trainingArray) {
//     appendFormArrayData(trainingArray, 'lines.training');
// }

// // Seminar
// const seminarArray = this.thirdFormGroup.get(['lines', 'seminar']) as FormArray;
// if (seminarArray) {
//     appendFormArrayData(seminarArray, 'lines.seminar');
// }

// // Employment
// const employmentArray = this.thirdFormGroup.get(['lines', 'employment']) as FormArray;
// if (employmentArray) {
//     appendFormArrayData(employmentArray, 'lines.employment');
// }

// // Certificate
// const certificateArray = this.thirdFormGroup.get(['lines', 'certificate']) as FormArray;
// if (certificateArray) {
//     appendFormArrayData(certificateArray, 'lines.certificate');
// }
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


   }