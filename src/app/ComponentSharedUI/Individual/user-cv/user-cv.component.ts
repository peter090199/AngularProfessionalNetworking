import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild,AfterViewInit, Inject  } from '@angular/core';
import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddLanguageUIComponent } from '../Languange/add-language-ui/add-language-ui.component';
import { AddEducationUIComponent } from '../ProfessionalDev/add-education-ui/add-education-ui.component';
import { AddSkillsUIComponent } from '../ProfessionalDev/add-skills-ui/add-skills-ui.component';
import { AddTrainingsUiComponent } from '../ProfessionalDev/add-trainings-ui/add-trainings-ui.component';
import { AddSeminarUiComponent } from '../ProfessionalDev/add-seminar-ui/add-seminar-ui.component';
import { AddEmploymentUiComponent } from '../ProfessionalDev/add-employment-ui/add-employment-ui.component';
import { AddCertificateUiComponent } from '../ProfessionalDev/add-certificate-ui/add-certificate-ui.component';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
/**
 * @title Basic expansion panel
 */

export interface User {
  name: string;
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
  
  constructor(private formBuilder: FormBuilder,private userService:ProfileService,
              private cvService:CurriculumVitaeService,
              private notificationService:NotificationsService,private router:Router,private datePipe:DatePipe,
              private dialog:MatDialog, private passDataServices:ProfessionalService,private alert:NotificationsService
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

 isEligible: boolean = false;
 searchCtrl = new FormControl('');



formData: any=[];

country: any[] = [];
selectedCountry: string;

myControl = new FormControl();
selectedValue: string = '';  // Initialize as an empty string to avoid errors
allOptions: string[] = [
  'USA', 'Canada', 'Russia', 'Kazakhstan', 'Egypt', 'South Africa', 'Greece', 'Netherlands', 'Belgium', 'France',
  'Spain', 'Hungary', 'Italy', 'Romania', 'Switzerland', 'Austria', 'UK', 'Denmark', 'Sweden', 'Norway', 'Poland', 
  'Germany', 'Mexico', 'Argentina', 'Brazil', 'Chile', 'Colombia', 'Venezuela', 'Malaysia', 'Australia', 'Indonesia', 
  'Philippines', 'New Zealand', 'Singapore', 'Thailand', 'Japan', 'South Korea', 'Vietnam', 'China', 'Turkey', 
  'India', 'Pakistan', 'Afghanistan', 'Sri Lanka', 'Myanmar', 'Iran', 'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Gambia', 
  'Senegal', 'Nigeria', 'Ethiopia', 'Kenya', 'Tanzania', 'Uganda', 'Zambia', 'Zimbabwe', 'Faroe Islands', 'Portugal', 
  'Luxembourg', 'Ireland', 'Iceland', 'Albania', 'Malta', 'Cyprus', 'Finland', 'Lithuania', 'Latvia', 'Estonia', 'Ukraine', 
  'Croatia', 'Slovenia', 'Bosnia and Herzegovina', 'North Macedonia', 'Czech Republic', 'Slovakia', 'Liechtenstein', 'UAE', 
  'Israel', 'Bahrain', 'Qatar', 'Bhutan', 'Mongolia', 'Nepal', 'Tajikistan', 'Turkmenistan', 'Azerbaijan', 'Georgia', 
  'Kyrgyzstan', 'Uzbekistan'
];
filteredOptions: Observable<string[]>;

ngOnInit(): void {
  this.initializeFormGroups();
  this.GetUserData();
  this.filteredOptions = this.secondFormGroup.get('home_country')!.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
}
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.allOptions.filter(option => option.toLowerCase().includes(filterValue));
}

// Function to check if a field is valid
isFieldValid(field: string) {
  const control = this.secondFormGroup.get(field);
  return control?.valid || control?.touched;
}


resetSearch(): void {
  this.selectedValue = '';  // Clear the selected value
  //this.filteredOptions = [...this.allOptions];  // Reset the filtered options to show all
}


 validateAge(): void {
    const dateOfBirth = this.firstFormGroup.get('date_birth')?.value;

    if (!dateOfBirth) {
      this.isEligible = false;
      return;
    }

    const today = new Date();
    const dob = new Date(dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    // Adjust age if the current month/day is before the birth month/day
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      this.isEligible = age - 1 >= 18;
    } else {
      this.isEligible = age >= 18;
    }
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
      skills: this.formBuilder.array([]), // Empty FormArray for skills
      education: this.formBuilder.array([]), // Empty FormArray for education
      trainings: this.formBuilder.array([]), // Empty FormArray for trainings
      seminars: this.formBuilder.array([]), // Empty FormArray for seminars
      employment: this.formBuilder.array([]), // Empty FormArray for employment
      certificates: this.formBuilder.array([]), // Empty FormArray for certificates
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

  createSkills(): FormArray {
    const formData = this.passDataServices.getSkills();
    const skillsArray = this.formBuilder.array([]);
  
    if (Array.isArray(formData) && formData.length > 0) {
      formData.forEach((data) => {
        skillsArray.push(
          this.formBuilder.group({
               data
          })
        );
      });
    } else {
      console.warn('No skills data available from passDataServices.getData()');
      skillsArray.push(this.formBuilder.group({ skillItem: [''] }));
    }
    return skillsArray;
  }
  
  
  // Create a new education FormGroup
  createEducation(): FormArray {
    const formData = this.passDataServices.getDataEducation();
    const educationArray = this.formBuilder.array([]);

    if (Array.isArray(formData)) {
      formData.forEach((data) => {
        educationArray.push(this.formBuilder.group({
          educationItem: [data]  // For each item, create a FormControl inside a FormGroup
        }));
      });
    }
    return educationArray;
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



  //basic info 

 onClickNew(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '400px';

  const dialogRef = this.dialog.open(AddLanguageUIComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    //  this.getRoles(); // Refresh the table after dialog closure
    }
  });
}
AddSkills(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(AddSkillsUIComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
     if (result) {
        
    }
  });
}

AddEducation(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '500px';
  const dialogRef = this.dialog.open(AddEducationUIComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((formResult) => {
    if (!formResult) {
      console.log("No changes made, form closed.");
      return; // Allow the form to close without further interaction
    }
    // else{
    // this.alert
    //   .popupWarningDiscard("")
    //   .then((confirmation) => {
    //     if (confirmation === "denied") {
    //       console.log("Form closed and changes discarded.");
    //     } else if (confirmation === "confirmed") {
    //       console.log("Form kept open and changes saved.");
    //     } else {
    //       console.log("Form kept open.");
    //     }
    //   });
    // }
  });
}

AddTrainings(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(AddTrainingsUiComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
     
    }
  });
}


AddSeminar(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(AddSeminarUiComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
     
    }
  });
}



AddEmployment(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(AddEmploymentUiComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
    }
  });
}

AddCertificate(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(AddCertificateUiComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
    }
  });
}

lines:any=[];

submit() {
  this.loading = true;

  const language = this.passDataServices.getLanguange();
  const skills = this.passDataServices.getSkills();
  const education = this.passDataServices.getDataEducation();
  const trainings = this.passDataServices.getDataTraining();
  const seminar = this.passDataServices.getDataSeminar();
  const employment = this.passDataServices.getDataEmployment();
  const certificate = this.passDataServices.getDataCertificate();

  const lines = {
    language,
    skills,
    education,
    trainings,
    seminar,
    employment,
    certificate,
  };


  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
  };

  
  if (lines) {
    // Format the dates for each section within lines
    if (lines.trainings) {
      lines.trainings.forEach((training: { trainingdate: string }) => {
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
  } else {
    console.warn('No lines data found in thirdFormGroup.');
  }

  const mergeData = {
    ...this.firstFormGroup.getRawValue(),
    ...this.secondFormGroup.getRawValue(),
    ...this.summaryFormGroup.getRawValue(),
   lines
  };
  mergeData.date_birth = formatDate(mergeData.date_birth);

  console.log("data:", mergeData)
 
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
      this.notificationService.toastrError(error?.error || 'An unexpected error occurred.');
      this.loading = false;
    },
  });

  
}

}