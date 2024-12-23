import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}

  constructor( private fb: FormBuilder) { }
  loginForm!: FormGroup;
  isLoading = false;
  fileControl = new FormControl(null, Validators.required);  // Add this to your form control

  onFileSelected(event: any) {
    const file = event.target.files[0];  // Get the first file selected
    if (file) {
      console.log(file);  // Log the selected file, or do further processing here
      this.fileControl.setValue(file);  // Optionally, add it to the form control
    }
  }
  ngOnInit(): void {
    this.initializeForm()
  }
 private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }
}
