import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/SignUp/sign-up.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-sign-up-ui',
  templateUrl: './sign-up-ui.component.html',
  styleUrls: ['./sign-up-ui.component.css']
})

export class SignUpUIComponent implements OnInit {
  registerForm: FormGroup;

   countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+61', name: 'Australia' },
    { code: '+91', name: 'India' },
    // Add more countries as needed
  ];
fadeIn: any;

  constructor(private fb: FormBuilder,
     private signupService:SignUpService,
     private notifyService:NotificationsService
    
    ) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      countryCode: ['', Validators.required], 
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      agreement:['',Validators.required]
    });

  }

  ngOnInit(): void {}

  onSubmit():void {
    // if (this.registerForm.valid) {
    console.log(this.registerForm.value)
      this.signupService.signup(this.registerForm.getRawValue()).subscribe({
        next: (res) => {
          this.notifyService.toastrSuccess("Successfully Saved. " + res.message);
          this.registerForm.reset();
        },
        error: (err) => {
          this.notifyService.toastrError(err.message);
        },
      });
   // }
  }
}
