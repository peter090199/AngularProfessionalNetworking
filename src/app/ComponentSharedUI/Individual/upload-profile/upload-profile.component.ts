import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit {


  constructor( private fb: FormBuilder) { }
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
      console.error('Form is invalid');
      return;
    }
  
    const formData = new FormData(); // Use FormData to handle file uploads
  
    // Append form data
    const formValues = this.uploadform.getRawValue();
    Object.keys(formValues).forEach(key => {
      formData.append(key, formValues[key]);
    });
  
    // Append the selected file (if any)
    if (this.selectedFile) {
      formData.append('photo_pic', this.selectedFile, this.selectedFile.name);
    }
  
    // Log the FormData contents for debugging
    console.log('FormData contents:',formData);
   
    // Here, you can send `formData` to your backend API
    // Example:
    // this.http.post('your-api-endpoint', formData).subscribe(
    //   response => console.log('Upload successful!', response),
    //   error => console.error('Upload failed', error)
    // );
  }
  
  
}
