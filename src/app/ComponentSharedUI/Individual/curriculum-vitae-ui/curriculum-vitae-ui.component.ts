// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
// import { Router } from '@angular/router';
// import { NotificationsService } from 'src/app/services/Global/notifications.service';
// import * as pdfjsLib from 'pdfjs-dist';

// @Component({
//   selector: 'app-curriculum-vitae-ui',
//   templateUrl: './curriculum-vitae-ui.component.html',
//   styleUrls: ['./curriculum-vitae-ui.component.css'],
//   providers: [
//     {
//       provide: STEPPER_GLOBAL_OPTIONS,
//       useValue: { displayDefaultIndicatorType: false },
//     },
//   ],
// })
// export class CurriculumVitaeUIComponent implements OnInit {

//   firstFormGroup: FormGroup;
//   secondFormGroup: FormGroup;
//   locationFormGroup:FormGroup;
//   thirdFormGroup: FormGroup;
//   confirmFormGroup: FormGroup;
  
//   selectedFile: File | null = null;
//   pdfContent: string | null = null;
//   secFormGroup:FormGroup;
  
  
//   countryCodes = [
//     { code: '+1', country: 'USA/Canada' },
//     { code: '+7', country: 'Russia/Kazakhstan' },
//     { code: '+20', country: 'Egypt' },
//     { code: '+27', country: 'South Africa' },
//     { code: '+30', country: 'Greece' },
//     { code: '+31', country: 'Netherlands' },
//     { code: '+32', country: 'Belgium' },
//     { code: '+33', country: 'France' },
//     { code: '+34', country: 'Spain' },
//     { code: '+36', country: 'Hungary' },
//     { code: '+39', country: 'Italy' },
//     { code: '+40', country: 'Romania' },
//     { code: '+41', country: 'Switzerland' },
//     { code: '+43', country: 'Austria' },
//     { code: '+44', country: 'UK' },
//     { code: '+45', country: 'Denmark' },
//     { code: '+46', country: 'Sweden' },
//     { code: '+47', country: 'Norway' },
//     { code: '+48', country: 'Poland' },
//     { code: '+49', country: 'Germany' },
//     { code: '+52', country: 'Mexico' },
//     { code: '+54', country: 'Argentina' },
//     { code: '+55', country: 'Brazil' },
//     { code: '+56', country: 'Chile' },
//     { code: '+57', country: 'Colombia' },
//     { code: '+58', country: 'Venezuela' },
//     { code: '+60', country: 'Malaysia' },
//     { code: '+61', country: 'Australia' },
//     { code: '+62', country: 'Indonesia' },
//     { code: '+63', country: 'Philippines' },
//     { code: '+64', country: 'New Zealand' },
//     { code: '+65', country: 'Singapore' },
//     { code: '+66', country: 'Thailand' },
//     { code: '+81', country: 'Japan' },
//     { code: '+82', country: 'South Korea' },
//     { code: '+84', country: 'Vietnam' },
//     { code: '+86', country: 'China' },
//     { code: '+90', country: 'Turkey' },
//     { code: '+91', country: 'India' },
//     { code: '+92', country: 'Pakistan' },
//     { code: '+93', country: 'Afghanistan' },
//     { code: '+94', country: 'Sri Lanka' },
//     { code: '+95', country: 'Myanmar' },
//     { code: '+98', country: 'Iran' },
//     { code: '+212', country: 'Morocco' },
//     { code: '+213', country: 'Algeria' },
//     { code: '+216', country: 'Tunisia' },
//     { code: '+218', country: 'Libya' },
//     { code: '+220', country: 'Gambia' },
//     { code: '+221', country: 'Senegal' },
//     { code: '+234', country: 'Nigeria' },
//     { code: '+251', country: 'Ethiopia' },
//     { code: '+254', country: 'Kenya' },
//     { code: '+255', country: 'Tanzania' },
//     { code: '+256', country: 'Uganda' },
//     { code: '+260', country: 'Zambia' },
//     { code: '+263', country: 'Zimbabwe' },
//     { code: '+298', country: 'Faroe Islands' },
//     { code: '+351', country: 'Portugal' },
//     { code: '+352', country: 'Luxembourg' },
//     { code: '+353', country: 'Ireland' },
//     { code: '+354', country: 'Iceland' },
//     { code: '+355', country: 'Albania' },
//     { code: '+356', country: 'Malta' },
//     { code: '+357', country: 'Cyprus' },
//     { code: '+358', country: 'Finland' },
//     { code: '+370', country: 'Lithuania' },
//     { code: '+371', country: 'Latvia' },
//     { code: '+372', country: 'Estonia' },
//     { code: '+380', country: 'Ukraine' },
//     { code: '+385', country: 'Croatia' },
//     { code: '+386', country: 'Slovenia' },
//     { code: '+387', country: 'Bosnia and Herzegovina' },
//     { code: '+389', country: 'North Macedonia' },
//     { code: '+420', country: 'Czech Republic' },
//     { code: '+421', country: 'Slovakia' },
//     { code: '+423', country: 'Liechtenstein' },
//     { code: '+971', country: 'UAE' },
//     { code: '+972', country: 'Israel' },
//     { code: '+973', country: 'Bahrain' },
//     { code: '+974', country: 'Qatar' },
//     { code: '+975', country: 'Bhutan' },
//     { code: '+976', country: 'Mongolia' },
//     { code: '+977', country: 'Nepal' },
//     { code: '+992', country: 'Tajikistan' },
//     { code: '+993', country: 'Turkmenistan' },
//     { code: '+994', country: 'Azerbaijan' },
//     { code: '+995', country: 'Georgia' },
//     { code: '+996', country: 'Kyrgyzstan' },
//     { code: '+998', country: 'Uzbekistan' },
//     // Add additional codes as needed
// ];

//   constructor(
//     private _formBuilder: FormBuilder,
//     private router: Router,
//     private notificationService: NotificationsService
//   ) {}

//   languages: string[] = ['English', 'Mandarin'];
//   skills: string[] = ['Microsoft Office Proficient', 'AutoCAD 6D', 'Project Management'];
//   get completionPercentage(): number {
//     const totalFields = this.languages.length + this.skills.length;
//     const filledFields = this.languages.filter(lang => lang.trim() !== '').length +
//       this.skills.filter(skill => skill.trim() !== '').length;
//     return totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
//   }
//   addLanguage(): void {
//     this.languages.push('');
//   }

//   deleteLanguage(index: number): void {
//     this.languages.splice(index, 1);
//   }

//   addSkill(): void {
//     this.skills.push('');
//   }
//   deleteSkill(index: number): void {
//     this.skills.splice(index, 1);
//   }

//   ngOnInit(): void {
//     this.initializeForms();
//   }

//    // Initialize all form groups
//    initializeForms(): void {
//     // Step 1: Basic Information
//     this.firstFormGroup = this._formBuilder.group({
//       firstName: ['', Validators.required],
//       familyName: ['', Validators.required],
//       profession: ['', Validators.required],
//       contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
//       email: ['', [Validators.required, Validators.email]],
//       dateOfBirth: ['', Validators.required]
//     });

//     // Step 2: Location Details
//     this.secondFormGroup = this._formBuilder.group({
//       homeCountry: ['', Validators.required],
//       cityState: ['', Validators.required],
//       current_location: ['', Validators.required],
//       currentCityState: ['', Validators.required]
//     });
    
//     // Step 3: Trainings
//     this.thirdFormGroup = this._formBuilder.group({
//       trainings: this._formBuilder.array([]) // Start with an empty training array
//     });

//     // Step 4: Confirmation
//     this.confirmFormGroup = this._formBuilder.group({
//       confirm: ['', Validators.required]
//     });
//   }

//   // Get the trainings array from the form
//   get trainings(): FormArray {
//     return this.thirdFormGroup.get('trainings') as FormArray;
//   }

//   // Add a new training group to the FormArray
//   addTraining(): void {
//     const trainingGroup = this._formBuilder.group({
//       title: ['', Validators.required],
//       provider: ['', Validators.required],
//       dateCompleted: ['', Validators.required]
//     });
//     this.trainings.push(trainingGroup);
//   }

//   // Remove a training by index
//   removeTraining(index: number): void {
//     this.trainings.removeAt(index);
//   }

//   // Edit a training entry (for now, this simply logs it)
//   editTraining(index: number): void {
//     console.log('Edit training at index', index);
//     // You can implement the logic to edit a specific training entry
//   }

//   // Save form data
//   saveForm(): void {
//     if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
//       console.log('Form data:', this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);
//       // Implement saving logic here
//     } else {
//       console.log('Form is invalid');
//     }
//   }

//   /**
//    * Handles file selection event, ensuring only PDF files are allowed.
//    * @param event The file input change event
//    */
//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       this.selectedFile = file;
//       this.readPdf(file);
//     } else {
//       console.error('Selected file is not a PDF.');
//       this.selectedFile = null;
//       this.pdfContent = null;
//     }
//   }

//   readPdf(file: File): void {
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       const pdfData = new Uint8Array(e.target.result);
      
//       // Use pdf.js to load and parse the PDF
//       pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
//         let textContent = '';
//         const numPages = pdf.numPages;
        
//         // We will create an array of promises for each page's text extraction
//         let pagePromises: Promise<void>[] = [];

//         for (let i = 1; i <= numPages; i++) {
//           pagePromises.push(
//             pdf.getPage(i).then((page) => {
//               return page.getTextContent().then((text) => {
//                 text.items.forEach((item: any) => {
//                   textContent += item.str + ' ';
//                 });
//               });
//             })
//           );
//         }

//         // Wait for all page promises to resolve
//         Promise.all(pagePromises).then(() => {
//           this.pdfContent = textContent;
//         }).catch((err) => {
//           console.error('Error extracting PDF content:', err);
//         });
//       }).catch((err) => {
//         console.error('Error loading PDF:', err);
//       });
//     };

//     reader.readAsArrayBuffer(file);
//   }

//   onSubmit(): void {
//     if (this.selectedFile) {
//       const formData = new FormData();
//       formData.append('pdf', this.selectedFile, this.selectedFile.name);
//       console.log('File uploaded:', this.selectedFile);
//       this.notificationService.toastPopUp('Successfully Uploaded.');
//       this.router.navigate(['/home']);
//       // Replace 'your-backend-url' with your backend API URL
//       // this.http.post('your-backend-url/upload', formData).subscribe(response => {
//       //   console.log('File uploaded successfully', response);
//       // }, error => {
//       //   console.error('Error uploading file', error);
//       // });
//     }
//   }

//   login(): void {
//     this.notificationService.toastPopUp('Successfully Signed in');
//     this.router.navigate(['/home']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-curriculum-vitae-ui',
  templateUrl: './curriculum-vitae-ui.component.html',
  styleUrls: ['./curriculum-vitae-ui.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class CurriculumVitaeUIComponent implements OnInit {
removeTraining(_t196: number) {
throw new Error('Method not implemented.');
}
addTraining() {
throw new Error('Method not implemented.');
}
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  confirmFormGroup: FormGroup;
  
  selectedFile: File | null = null;
  pdfContent: string | null = null;

  // User Data (should be populated dynamically, this is a sample)
  userData = {
    photo_pic: null,
    contact_no: '1234567890',
    contact_visibility: 1,
    email_visibility: 1,
    summary: 'A brief summary about myself.',
    date_birth: '1990-01-01',
    home_country: 'USA',
    current_location: 'New York',
    lines: {
      capability: [
        { language: 'English', skills: 'Communication' },
        { language: 'Spanish', skills: 'Translation' },
      ],
      education: [
        { highest_education: "Bachelor's Degree", school_name: 'University of Example', year_entry: 2008, year_end: 2012, status: 'Completed' },
        { highest_education: "Bachelor's Degree1", school_name: 'University of Example', year_entry: 2008, year_end: 2012, status: 'Completed' },
      ],
      training: [
        { training_title: 'Leadership Training', training_provider: 'Leadership Institute', trainingdate: '2020-06-15' },
        { training_title: 'Leadership Training2', training_provider: 'Leadership Institute', trainingdate: '2020-06-15' },
      ],
      seminar: [
        { seminar_title: 'Advanced Laravel', seminar_provider: 'Laravel Academy', seminardate: '2022-03-20' },
        { seminar_title: 'Advanced Laravel2', seminar_provider: 'Laravel Academy2', seminardate: '2022-03-20' },
      ],
      employment: [
        { company_name: 'Tech Corp', position: 'Software Engineer', job_description: 'Developing web applications', date_completed: '2023-11-01' },
        { company_name: 'Dev Solutions', position: 'Senior Developer', job_description: 'Leading a development team and building scalable solutions', date_completed: '2024-02-01' },
      ],
      certificate: [
        { certificate_title: 'Certificate Title', certificate_provider: 'Certificate Provider', date_completed: '2024-02-01' },
        { certificate_title: 'Certificate Title2', certificate_provider: 'Certificate Provider2', date_completed: '2024-02-01' },
      ]
    }
  };
trainings: any;

  
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
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  // Initialize all form groups
  initializeForms(): void {
    // Step 1: Basic Information
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      profession: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      photo_pic:[null]
    });

    // Step 2: Location Details
    this.secondFormGroup = this._formBuilder.group({
      home_country: ['', Validators.required],
      city_state: ['', Validators.required],
      currentLocation: ['', Validators.required],
      currentCityState: ['', Validators.required],

    });
    
    // Step 3: Trainings
    this.thirdFormGroup = this._formBuilder.group({
      trainings: this._formBuilder.array([]) // Start with an empty training array
    });

    // Step 4: Confirmation
    this.confirmFormGroup = this._formBuilder.group({
      confirm: ['', Validators.required]
    });

    // Populate capabilities, education, training, seminar, employment, certificate fields
    this.populateForms();
  }

  // Populate capabilities, education, training, seminar, employment, certificate into the form
  populateForms(): void {
    // Populate capabilities, education, etc.
    this.populateCapabilities();
    this.populateEducation();
    this.populateTraining();
    this.populateEmployment();
    this.populateCertificates();
  }

  // Populate capabilities into the form
  populateCapabilities(): void {
    const capabilities = this.userData.lines.capability || [];
    capabilities.forEach(cap => {
      // Logic to add capabilities to form, for instance adding form controls for language and skills
    });
  }

  // Populate education into the form
  populateEducation(): void {
    const education = this.userData.lines.education || [];
    education.forEach(edu => {
      // Logic to add education details to the form
    });
  }

  // Populate training into the form
  populateTraining(): void {
    const training = this.userData.lines.training || [];
    training.forEach(train => {
      // Logic to add training details to the form
    });
  }

  // Populate employment into the form
  populateEmployment(): void {
    const employment = this.userData.lines.employment || [];
    employment.forEach(job => {
      // Logic to add employment details to the form
    });
  }

  // Populate certificates into the form
  populateCertificates(): void {
    const certificates = this.userData.lines.certificate || [];
    certificates.forEach(cert => {
      // Logic to add certificate details to the form
    });
  }

  // Handling File selection
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.readPdf(file);
    } else {
      console.error('Selected file is not a PDF.');
      this.selectedFile = null;
      this.pdfContent = null;
    }
  }

  // Read PDF content
  readPdf(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const pdfData = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
        let textContent = '';
        const numPages = pdf.numPages;
        let pagePromises: Promise<void>[] = [];
        for (let i = 1; i <= numPages; i++) {
          pagePromises.push(
            pdf.getPage(i).then((page) => {
              return page.getTextContent().then((text) => {
                text.items.forEach((item: any) => {
                  textContent += item.str + ' ';
                });
              });
            })
          );
        }
        Promise.all(pagePromises).then(() => {
          this.pdfContent = textContent;
        }).catch((err) => {
          console.error('Error extracting PDF content:', err);
        });
      }).catch((err) => {
        console.error('Error loading PDF:', err);
      });
    };
    reader.readAsArrayBuffer(file);
  }

  // Submit form and handle file upload
  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pdf', this.selectedFile, this.selectedFile.name);
      console.log('File uploaded:', this.selectedFile);
      this.notificationService.toastPopUp('Successfully Uploaded.');
      this.router.navigate(['/home']);
    }
  }
}
