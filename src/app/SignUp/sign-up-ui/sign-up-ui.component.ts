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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      contact: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      cpassword: ['', Validators.required]
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
