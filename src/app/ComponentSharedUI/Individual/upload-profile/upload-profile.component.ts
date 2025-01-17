import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  ) { }


  uploadform: FormGroup;
  isLoading = false;
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


  onSubmit() {
    if (!this.uploadform.valid) {
    }
    const formData = new FormData(); 
    if (this.selectedFile) {
      formData.append('photo_pic', this.selectedFile, this.selectedFile.name);
    }
    //console.log('FormData contents:',formData);
   
    this.uploadServices.uploadCV(formData).subscribe({
      next: (res) => {
        if (res.success) {
         this.notificationService.toastrSuccess("Successfully Upload.");
         this.router.navigate(['/home']);
        } else {
          this.notificationService.toastrError("Error upload!");
        }
     //   this.loading = false;
      },
      error: (error: any) => {
        this.notificationService.toastrError(error?.error || 'An unexpected error occurred.');
        //this.loading = false;
      },
    });
  }
  
  
}
