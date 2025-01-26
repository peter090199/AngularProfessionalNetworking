import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { CurriculumVitaeService } from 'src/app/services/CV/curriculum-vitae.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit {
  constructor( private fb: FormBuilder,private uploadServices:CurriculumVitaeService,
               private notificationService:NotificationsService,private router: Router,
               public dialogRef: MatDialogRef<UploadProfileComponent>
  ) { }

  isLoading = false;
  uploadform: FormGroup;
  fileControl = new FormControl(null, Validators.required);  // Add this to your form control

  fileError: string = ''; // To store validation error messages
  fileData: any = null;
  selectedFile: File | null = null;

  onFileSelecteds(event: any): void {
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
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadform.patchValue({ photo_pic: this.selectedFile });
      this.uploadform.get('photo_pic')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.initializeForm()
  }
 private initializeForm(): void {
    this.uploadform = this.fb.group({
      photo_pic: [null],
    
    });
  }

  onSubmit(): void {
    if (!this.uploadform.valid) {
      this.notificationService.toastrError('Form is invalid. Please check your input.');
      return;
    }
  
    // Set loading state to true
    this.isLoading = true;
  
    const formData = new FormData();
  
    if (this.selectedFile) {
      formData.append('photo_pic', this.selectedFile, this.selectedFile.name);
    } else {
      this.notificationService.toastrError('No file selected. Please upload a file.');
      this.isLoading = false;
      return;
    }
  
    this.uploadServices.uploadCV(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.toastrSuccess("Successfully Upload!");
         
          setTimeout(() => {
            window.location.reload(); // Reload the current page
          }, 1000);
        } else {
          this.notificationService.toastrError(res.error || 'Upload failed.');
        }
        this.isLoading = false; // Reset loading state
        this.dialogRef.close();
        
      },
      error: (error: any) => {
        this.notificationService.toastrError(
          error?.error || 'An unexpected error occurred while uploading.'
        );
        this.isLoading = false; // Reset loading state in case of error
      }
    });
  }
  
  
}
