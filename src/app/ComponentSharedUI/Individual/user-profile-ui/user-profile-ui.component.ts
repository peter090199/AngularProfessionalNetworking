// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-profile-ui',
//   templateUrl: './user-profile-ui.component.html',
//   styleUrls: ['./user-profile-ui.component.css']
// })
// export class UserProfileUiComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild,AfterViewInit, Inject  } from '@angular/core';
import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
import {FormBuilder,FormGroup,FormArray,Validators,FormControl} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ProfileService } from 'src/app/services/Profile/profile.service';
import { MatHorizontalStepper } from '@angular/material/stepper/stepper';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { AddEditEducationDialogComponent } from '../ProfessionalDev/Edit/add-edit-education-dialog/add-edit-education-dialog.component';
import { AddEditSeminarComponent } from '../ProfessionalDev/Edit/add-edit-seminar/add-edit-seminar.component';
import { AddEditTrainingComponent } from '../ProfessionalDev/Edit/add-edit-training/add-edit-training.component';
import { AddEditCertificateComponent } from '../ProfessionalDev/Edit/add-edit-certificate/add-edit-certificate.component';
import { AddEditWorkExprienceComponent } from '../ProfessionalDev/Edit/add-edit-work-exprience/add-edit-work-exprience.component';
import { AddEditSkillsComponent } from '../ProfessionalDev/Edit/add-edit-skills/add-edit-skills.component';
import { AddEditLanguageComponent } from '../ProfessionalDev/Edit/add-edit-language/add-edit-language.component';
import { ViewLanguageUIComponent } from '../Languange/view-language-ui/view-language-ui.component';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Basic expansion panel
 */

export interface User {
  name: string;
}

export interface User2 {
  name: string;
}

@Component({
  selector: 'app-user-profile-ui',
  templateUrl: './user-profile-ui.component.html',
  styleUrls: ['./user-profile-ui.component.css']
})
export class UserProfileUiComponent implements AfterViewInit  {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  progressValue: number = 0;
  
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  summaryFormGroup:FormGroup;
  thirdFormGroup: FormGroup;
  
  formEducation: any[] = [];
  formSeminar: any[];
  formTraining: any[]= [];
  formCertificate: any[]= [];
  formWorkExperience: any[]= [];
  formSkills: any[]= [];


  formSkillss = [
    { skills: 'Network Configuration' },
    { skills: 'Cloud Networking' },
    { skills: 'Network Security' }
  ];

  allSkills = [
    "Network Configuration",
    "Network Protocols (TCP/IP, UDP, HTTP, DNS, etc.)",
    "Network Security",
    "Firewall Management",
    "VPN Setup and Management",
    "Wi-Fi and LAN/WAN Configuration",
    "Cloud Networking",
    "Network Troubleshooting and Diagnostics",
    "Routing and Switching",
    "Load Balancing and Failover",
    "DNS Management",
    "Network Performance Optimization",
    "Network Automation",
    "Network Monitoring and Analysis",
    "QoS (Quality of Service) Management",
    "SDN (Software-Defined Networking)",
    "VLAN Configuration",
    "Network Virtualization",
    "IP Address Management (IPAM)",
    "Packet Analysis",
    "IT Specialist",
    "Front End Developer",
    "Back End Developer",
    "Full Stack Developer"
  ];

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
              private dialog:MatDialog, private passDataServices:ProfessionalService,private alert:NotificationsService,
              private profileService: ProfessionalService,  @Inject(MAT_DIALOG_DATA) public data: any,
              private route:ActivatedRoute
  ) {
    this.countryControl1.valueChanges.subscribe(value => {
      this.filteredCountries1 = this.filterCountries(value);
    });

    this.countryControl2.valueChanges.subscribe(value => {
      this.filteredCountries2 = this.filterCountries(value);
    });

  }


loadEducationData() {
  this.formEducation = this.profileService.getDataEducation();

}

loadTrainingData() {
  this.formTraining = this.profileService.getDataTraining();

}

loadSeminarData() {
  this.formSeminar = this.profileService.getDataSeminar();
}

loadCertificateData() {
  this.formCertificate = this.profileService.getDataCertificate();

}

loadWorkExperienceData() {
  this.formWorkExperience = this.profileService.getDataEmployment();

}
loadSkillsData() {
  this.formSkills = this.profileService.getSkills();
}


formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


editSeminar(index: number): void {
  const Edit = this.formSeminar[index];
  console.log(Edit)
  const dialogRef = this.dialog.open(AddEditSeminarComponent, {
    width: '500px',
    data: Edit, // Pass the specific education entry as data
  
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadSeminarData();
    }
  });
}

editEducation(index: number): void {
  const educationToEdit = this.formEducation[index];
  console.log(educationToEdit)
  const dialogRef = this.dialog.open(AddEditEducationDialogComponent, {
    width: '600px',
    data: educationToEdit, // Pass the specific education entry as data
  
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadEducationData();
    }
  });
}

editTraining(index: number): void {
  const Edit = this.formTraining[index];
  console.log(Edit)
  const dialogRef = this.dialog.open(AddEditTrainingComponent, {
    width: '500px',
    data: Edit, // Pass the specific education entry as data
  
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadSeminarData();
    }
  });
}
editCertificate(index: number): void {
  const Edit = this.formCertificate[index];
  const dialogRef = this.dialog.open(AddEditCertificateComponent, {
    width: '500px',
    data: Edit, // Pass the specific education entry as data
  
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadCertificateData();
    }
  });
}


editWorkexperience(index: number): void {
  const Edit = this.formWorkExperience[index];
  console.log(Edit)
  const dialogRef = this.dialog.open(AddEditWorkExprienceComponent, {
    width: '500px',
    data: Edit, // Pass the specific education entry as data
  
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadWorkExperienceData();
    }
  });
}

 // Edit a skill
 editSkills(index: number): void {
  const Edit = this.formSkills[index];
  const dialogRef = this.dialog.open(AddEditSkillsComponent, {
    width: '500px',
    data: Edit
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadSkillsData(); // Update the skill with the edited value
    }
  });
}

removeEducations(index: number) {
  this.alert.toastrSuccess("Successfuly Deleted!")
  this.formEducation.splice(index, 1);

}
removeSeminar(index: number) {
  this.alert.toastrSuccess("Successfuly Deleted!")
  this.formSeminar.splice(index, 1);
  
}
removeTraining(index: number) {
  this.alert.toastrSuccess("Successfuly Deleted!")
  this.formTraining.splice(index, 1);
}

removeCertificate(index: number) {
  this.alert.toastrSuccess("Successfuly Deleted!")
  this.formCertificate.splice(index, 1);
 
}
removeWorkExp(index: number) {
  this.alert.toastrSuccess("Successfuly Deleted!")
  this.formWorkExperience.splice(index, 1);
}
removeSkills(index: number) {
  this.alert.toastrSuccess("Successfuly Deleted!")
  this.formSkills.splice(index, 1);
}

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


selectedValue: string = ''; 
countries: { name: string }[] = [
  { name: 'USA' }, { name: 'Canada' }, { name: 'Russia' }, { name: 'Kazakhstan' }, { name: 'Egypt' },
  { name: 'South Africa' }, { name: 'Greece' }, { name: 'Netherlands' }, { name: 'Belgium' },
  { name: 'France' }, { name: 'Spain' }, { name: 'Hungary' }, { name: 'Italy' }, { name: 'Romania' },
  { name: 'Switzerland' }, { name: 'Austria' }, { name: 'UK' }, { name: 'Denmark' }, { name: 'Sweden' },
  { name: 'Norway' }, { name: 'Poland' }, { name: 'Germany' }, { name: 'Mexico' }, { name: 'Argentina' },
  { name: 'Brazil' }, { name: 'Chile' }, { name: 'Colombia' }, { name: 'Venezuela' }, { name: 'Malaysia' },
  { name: 'Australia' }, { name: 'Indonesia' }, { name: 'Philippines' }, { name: 'New Zealand' },
  { name: 'Singapore' }, { name: 'Thailand' }, { name: 'Japan' }, { name: 'South Korea' },
  { name: 'Vietnam' }, { name: 'China' }, { name: 'Turkey' }, { name: 'India' }, { name: 'Pakistan' },
  { name: 'Afghanistan' }, { name: 'Sri Lanka' }, { name: 'Myanmar' }, { name: 'Iran' }, { name: 'Morocco' },
  { name: 'Algeria' }, { name: 'Tunisia' }, { name: 'Libya' }, { name: 'Gambia' }, { name: 'Senegal' },
  { name: 'Nigeria' }, { name: 'Ethiopia' }, { name: 'Kenya' }, { name: 'Tanzania' }, { name: 'Uganda' },
  { name: 'Zambia' }, { name: 'Zimbabwe' }, { name: 'Faroe Islands' }, { name: 'Portugal' },
  { name: 'Luxembourg' }, { name: 'Ireland' }, { name: 'Iceland' }, { name: 'Albania' }, { name: 'Malta' },
  { name: 'Cyprus' }, { name: 'Finland' }, { name: 'Lithuania' }, { name: 'Latvia' }, { name: 'Estonia' },
  { name: 'Ukraine' }, { name: 'Croatia' }, { name: 'Slovenia' }, { name: 'Bosnia and Herzegovina' },
  { name: 'North Macedonia' }, { name: 'Czech Republic' }, { name: 'Slovakia' }, { name: 'Liechtenstein' },
  { name: 'UAE' }, { name: 'Israel' }, { name: 'Bahrain' }, { name: 'Qatar' }, { name: 'Bhutan' },
  { name: 'Mongolia' }, { name: 'Nepal' }, { name: 'Tajikistan' }, { name: 'Turkmenistan' },
  { name: 'Azerbaijan' }, { name: 'Georgia' }, { name: 'Kyrgyzstan' }, { name: 'Uzbekistan' }
];

  homeFilteredOptions: Observable<{ name: string }[]>;
  currentFilteredOptions: Observable<{ name: string }[]>;

  countryControl1 = new FormControl();
  countryControl2 = new FormControl();
  
  filteredCountries1: { name: string }[] = this.countries;
  filteredCountries2: { name: string }[] = this.countries;
  
btnSave:string="Finish";
code:any;

ngOnInit(): void {
  const url = window.location.href;
  const codesplit = url.split('/').pop();
  this.code = codesplit;

  this.initializeFormGroups();
  this.GetUserData();
  this.GetUpdateDataUser();

}


currentLocationControl = new FormControl();
GetUpdateDataUser() {
  this.userService.getProfileByUser(this.code).subscribe({
    next: (response) => {
      if (response.success) {
        this.firstFormGroup.patchValue(response.message); 
        this.secondFormGroup.patchValue(response.message); 
        this.summaryFormGroup.patchValue(response.message); 
        this.formEducation = response.message.lines.education;
        this.formSkills = response.message.lines.skills;
        this.formSeminar = response.message.lines.seminar;
        this.formTraining = response.message.lines.training;
     
      } else {
        this.error = 'Failed to load profile data';
      }
    },
    error: (err) => {
      this.error = err.message || 'An error occurred while fetching profile data';
    },
  });
}

getProfileData(): void {
  this.userService.getProfileByUser(this.code).subscribe({
    next: (response) => {
      if (response.success) {
        // Populate the form controls with the data
        this.setEducationForm(response.message.education); // Assuming 'education' is part of the response
      } else {
        console.error('Failed to load profile data');
      }
    },
    error: (err) => {
      console.error('Error loading profile data:', err);
    },
  });
}

removeEducation(index: number): void {
  const educationFormArray = <FormArray>this.thirdFormGroup.get('education');
  educationFormArray.removeAt(index);
}
// Populate education data into the form
setEducationForm(educationData: any[]): void {
  const educationFormArray = <FormArray>this.thirdFormGroup.get('education');

  // Clear existing form controls before adding new ones
  educationFormArray.clear();

  educationData.forEach((edu) => {
    educationFormArray.push(
      new FormGroup({
        highest_education: new FormControl(edu.highest_education),
        school_name: new FormControl(edu.school_name),
        start_month: new FormControl(edu.start_month),
        start_year: new FormControl(edu.start_year),
        end_month: new FormControl(edu.end_month),
        end_year: new FormControl(edu.end_year),
        status: new FormControl(edu.status),
      })
    );
  });
}






displayFn(user: User): string {
  return user && user.name ? user.name : '';
}

displayFn2(user: User): string {
  return user && user.name ? user.name : '';
}

private filterCountries(value: string): { name: string }[] {
  const filterValue = value.toLowerCase();
  return this.countries.filter(country => country.name.toLowerCase().includes(filterValue));
}

// private _filterCountries(value: any, countries: { name: string }[]): { name: string }[] {
//   console.log('Filtering value:', value); // Debugging line
//   if (typeof value === 'string') {
//     const filterValue = value.toLowerCase();
//     return countries.filter(option =>
//       option.name.toLowerCase().includes(filterValue)
//     );
//   }
//   return [];
// }


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
     this.userService.getProfileByUserOnly().subscribe({
    next: (response) => {
      if (response.success && response.message.length) {
        const userData = response.message[0]; // Ensure message[0] exists
        if(userData != null){
          this.fname = userData.fname;
          this.lname = userData.lname;
          this.email =  userData.email;
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


 private DisplayEmail(): void {
    this.userService.getProfileByEmail().subscribe(
      (profile) => {
        // Assuming the profile contains an email property
        this.email = profile.email;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  private initializeFormGroups(): void {
    this.firstFormGroup = this.formBuilder.group({
      photo_pic: [null],  // Set to null if no file is selected
      contact_no: ['', Validators.required],
      contact_visibility: [0],
      email_visibility: [0],
      date_birth: ['', Validators.required],
      
    });
    this.secondFormGroup = this.formBuilder.group({
     // home_country: ['', Validators.required],
     // current_location: ['', Validators.required],
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
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(AddLanguageUIComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    //  this.getRoles(); // Refresh the table after dialog closure
    }
  });
}

viewlanguage(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  const dialogRef = this.dialog.open(ViewLanguageUIComponent, dialogConfig);
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
      this.loadSkillsData();
    }
  });
}
educationList: any[] = [];
AddEducationxxx(): void {
  const dialogRef = this.dialog.open(AddEducationUIComponent, {
    width: '600px',
    data: { educationList: this.educationList }, // Pass current education list if needed
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      // Update the education list with the data returned from the dialog
      this.educationList = result;
    }
  });
}

AddEducation(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '500px';
  const dialogRef = this.dialog.open(AddEducationUIComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((formResult) => {
    if (formResult) {
      this.LoadEducationData();
    }
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
     this.loadTrainingData();
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
     this.loadSeminarData();
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
      this.loadWorkExperienceData();
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
      this.loadCertificateData();
    }
  });
}

lines:any=[];

submit() {
  this.loading = true;
  const language = this.passDataServices.getLanguange();
  const skills = this.passDataServices.getSkills();
  const education = this.passDataServices.getDataEducation();
  const training = this.passDataServices.getDataTraining();
  const seminar = this.passDataServices.getDataSeminar();
  const employment = this.passDataServices.getDataEmployment();
  const certificate = this.passDataServices.getDataCertificate();

  const lines = {
    language,
    skills,
    education,
    training,
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
  } else {
    console.warn('No lines data found in thirdFormGroup.');
  }

  const mergeData = {
    ...this.firstFormGroup.getRawValue(),
    ...this.secondFormGroup.getRawValue(),
    ...this.summaryFormGroup.getRawValue(),
   lines
  };
  mergeData.home_country = this.countryControl1.value;
  mergeData.current_location = this.countryControl2.value;
  mergeData.date_birth = formatDate(mergeData.date_birth);

  console.log("data:", mergeData)
 if(mergeData == null)
 {
    this.notificationService.toastrError("Error Data!");
    return;
 }
 else{
    this.cvService.postCV2(mergeData).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.toastPopUp(res.message);
          console.log(res.message)
          this.router.navigate(['/home']);
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

View(){
  this.loadSeminarData();
}

  ViewEducationData() {

  }

  LoadEducationData(): void {
    this.loadEducationData();
  }
  
}