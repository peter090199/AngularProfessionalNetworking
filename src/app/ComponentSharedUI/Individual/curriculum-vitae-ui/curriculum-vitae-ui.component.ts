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


//   thirdFormGroup: FormGroup;
  
//   firstFormGroup!: FormGroup;
//   secondFormGroup!: FormGroup;
//   selectedFile: File | null = null;
//   fb: any;

//   constructor(private _formBuilder: FormBuilder,
//     private router:Router,
//     private notificationService:NotificationsService,


//   ) {}
//   pdfContent: string | null = null;

//   ngOnInit(): void {
//     this.firstFormGroup = this.fb.group({
//       firstName: ['', Validators.required],
//       familyName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       contactNumber: ['', Validators.required],
//       profession: ['', Validators.required],
//       birthMonth: ['', Validators.required],
//       birthDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
//       birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
//       photo: [null]
//     });
//     this.secondFormGroup = this._formBuilder.group({
//       trainings: this.fb.array([this.createTraining()])
//     });

//     // Initialize the third form group for confirmation
//     this.thirdFormGroup = this._formBuilder.group({
//       confirm: ['', Validators.required]
//     });
//   }
//   // Get the trainings array from the form
//   get trainings() {
//     return (this..get('trainings') as FormArray);
//   }

//   // Create a new training form group
//   createTraining(): FormGroup {
//     return this.fb.group({
//       title: ['', Validators.required],
//       provider: ['', Validators.required],
//       dateCompleted: ['', Validators.required]
//     });
//   }

//   // Add a new training entry
//   addTraining(): void {
//     this.trainings.push(this.createTraining());
//   }

//   // Remove a training entry
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
//     if (this.profileForm.valid) {
//       console.log(this.profileForm.value);
//       // Implement saving logic here
//     } else {
//       console.log('Form is invalid');
//     }
//   }
//   editTraining(_t140: number) {
//     throw new Error('Method not implemented.');
//     }
//     removeTraining(_t140: number) {
//     throw new Error('Method not implemented.');
//     }
//     addTraining() {
//     throw new Error('Method not implemented.');
//     }
 
//   /**
//    * Handles file selection event, ensuring only PDF files are allowed.
//    * @param event The file input change event
//    */

//   parsePDF(file: File): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const typedArray = new Uint8Array(reader.result as ArrayBuffer);
//       pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
//         this.extractTextFromPDF(pdf);
//       }).catch((error) => {
//         console.error('Error parsing PDF:', error);
//       });
//     };
//     reader.readAsArrayBuffer(file);
//   }

//   extractTextFromPDF(pdf: any): void {
//     const numPages = pdf.numPages;
//     let extractedText = '';

//     // Loop through each page and extract text
//     const extractPageText = (pageNum: number) => {
//       pdf.getPage(pageNum).then((page: any) => {
//         page.getTextContent().then((textContent: any) => {
//           extractedText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
          
//           // If it's the last page, assign the text to the form field or console
//           if (pageNum === numPages) {
//             this.pdfContent = extractedText;  // You can bind this to a form field or log it
//             console.log('Extracted PDF Text:', extractedText);
          
//           }
//         });
//       });
//     };

//     // Loop through all pages
//     for (let i = 1; i <= numPages; i++) {
//       extractPageText(i);
//     }
//   }

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file && file.type === 'application/pdf') {
//       this.selectedFile = file;
//       this.readPdf(file);
//     } else {
//       console.error("Selected file is not a PDF.");
//       this.selectedFile = null;
//       this.pdfContent = null;
//     }
//   }

//   readPdf(file: File) {
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
//        console.log('File uploaded:', this.selectedFile);
//        this.notificationService.toastPopUp("Successfuly Upload.");
//        this.router.navigate(['/home']);
//       // Replace 'your-backend-url' with your backend API URL
//       // this.http.post('your-backend-url/upload', formData).subscribe(response => {
//       //   console.log('File uploaded successfully', response);
//       // }, error => {
//       //   console.error('Error uploading file', error);
//       // });
//     }
//   }

//   /**
//    * Handles the file upload logic.
//    * Alerts the user if no file is selected.
//    */
//   uploadFile(): void {
//     if (!this.selectedFile) {
//       alert('Please select a PDF file first.');
//       return;
//     }

//     // Example: Mock upload logic (replace with actual implementation)
//     const formData = new FormData();
//     formData.append('file', this.selectedFile);

//     console.log('Uploading file:', this.selectedFile.name);
//     alert(`File "${this.selectedFile.name}" uploaded successfully!`);

//     // Example: Uncomment and replace with actual service call
//     // this.fileUploadService.uploadFile(formData).subscribe(
//     //   (response) => {
//     //     console.log('Upload successful:', response);
//     //   },
//     //   (error) => {
//     //     console.error('Upload failed:', error);
//     //   }
//     // );
//   }

//   login() {
//        this.notificationService.toastPopUp("Sucessfully Sign in");
//        this.router.navigate(['/home']);
//     }
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

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup: FormGroup;
  selectedFile: File | null = null;
  pdfContent: string | null = null;
  secFormGroup:FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      profession: ['', Validators.required],
      birthMonth: ['', Validators.required],
      birthDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
      photo: [null]
    });

    this.secondFormGroup = this._formBuilder.group({
      trainings: this._formBuilder.array([this.createTraining()])
    });

    // Initialize the third form group for confirmation
    this.thirdFormGroup = this._formBuilder.group({
      confirm: ['', Validators.required]
    });
  }

  // Get the trainings array from the form
  get trainings(): FormArray {
    return (this.secondFormGroup.get('trainings') as FormArray);
  }

  // Create a new training form group
  createTraining(): FormGroup {
    return this._formBuilder.group({
      title: ['', Validators.required],
      provider: ['', Validators.required],
      dateCompleted: ['', Validators.required]
    });
  }

  // Add a new training entry
  addTraining(): void {
    this.trainings.push(this.createTraining());
  }

  // Remove a training entry
  removeTraining(index: number): void {
    this.trainings.removeAt(index);
  }

  // Edit a training entry (for now, this simply logs it)
  editTraining(index: number): void {
    console.log('Edit training at index', index);
    // You can implement the logic to edit a specific training entry
  }

  // Save form data
  saveForm(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      console.log('Form data:', this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);
      // Implement saving logic here
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * Handles file selection event, ensuring only PDF files are allowed.
   * @param event The file input change event
   */
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

  readPdf(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const pdfData = new Uint8Array(e.target.result);
      
      // Use pdf.js to load and parse the PDF
      pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
        let textContent = '';
        const numPages = pdf.numPages;
        
        // We will create an array of promises for each page's text extraction
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

        // Wait for all page promises to resolve
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

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pdf', this.selectedFile, this.selectedFile.name);
      console.log('File uploaded:', this.selectedFile);
      this.notificationService.toastPopUp('Successfully Uploaded.');
      this.router.navigate(['/home']);
      // Replace 'your-backend-url' with your backend API URL
      // this.http.post('your-backend-url/upload', formData).subscribe(response => {
      //   console.log('File uploaded successfully', response);
      // }, error => {
      //   console.error('Error uploading file', error);
      // });
    }
  }

  login(): void {
    this.notificationService.toastPopUp('Successfully Signed in');
    this.router.navigate(['/home']);
  }
}
