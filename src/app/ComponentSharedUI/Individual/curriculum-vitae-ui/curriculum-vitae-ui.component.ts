import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedFile: File | null = null;

  constructor(private _formBuilder: FormBuilder,
    private router:Router,
    private notificationService:NotificationsService
  ) {}
  pdfContent: string = '';

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      fileUpload: [null, Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  /**
   * Handles file selection event, ensuring only PDF files are allowed.
   * @param event The file input change event
   */

  parsePDF(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
        this.extractTextFromPDF(pdf);
      }).catch((error) => {
        console.error('Error parsing PDF:', error);
      });
    };
    reader.readAsArrayBuffer(file);
  }

  extractTextFromPDF(pdf: any): void {
    const numPages = pdf.numPages;
    let extractedText = '';

    // Loop through each page and extract text
    const extractPageText = (pageNum: number) => {
      pdf.getPage(pageNum).then((page: any) => {
        page.getTextContent().then((textContent: any) => {
          extractedText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
          
          // If it's the last page, assign the text to the form field or console
          if (pageNum === numPages) {
            this.pdfContent = extractedText;  // You can bind this to a form field or log it
            console.log('Extracted PDF Text:', extractedText);
          }
        });
      });
    };

    // Loop through all pages
    for (let i = 1; i <= numPages; i++) {
      extractPageText(i);
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed!');
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      console.log('Selected file:', this.selectedFile.name);
    }
  }
  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('pdf', this.selectedFile, this.selectedFile.name);

      // Replace 'your-backend-url' with your backend API URL
      // this.http.post('your-backend-url/upload', formData).subscribe(response => {
      //   console.log('File uploaded successfully', response);
      // }, error => {
      //   console.error('Error uploading file', error);
      // });
    }
  }

  /**
   * Handles the file upload logic.
   * Alerts the user if no file is selected.
   */
  uploadFile(): void {
    if (!this.selectedFile) {
      alert('Please select a PDF file first.');
      return;
    }

    // Example: Mock upload logic (replace with actual implementation)
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    console.log('Uploading file:', this.selectedFile.name);
    alert(`File "${this.selectedFile.name}" uploaded successfully!`);

    // Example: Uncomment and replace with actual service call
    // this.fileUploadService.uploadFile(formData).subscribe(
    //   (response) => {
    //     console.log('Upload successful:', response);
    //   },
    //   (error) => {
    //     console.error('Upload failed:', error);
    //   }
    // );
  }

  login() {
       this.notificationService.toastPopUp("Sucessfully Sign in");
       this.router.navigate(['/home']);
    }
}
