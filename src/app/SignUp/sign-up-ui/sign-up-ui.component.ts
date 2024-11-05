// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sign-up-ui',
//   templateUrl: './sign-up-ui.component.html',
//   styleUrls: ['./sign-up-ui.component.css']
// })
// export class SignUpUIComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Add your signup logic here
    }
  }
}
