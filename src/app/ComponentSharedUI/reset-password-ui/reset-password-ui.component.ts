// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {  ActivatedRoute} from '@angular/router';
// import { NotificationsService } from 'src/app/services/Global/notifications.service';
// import { _url } from 'src/global-variables';
// import { ResetPasswordService } from 'src/app/services/Password/Reset/reset-password.service';
// import { catchError } from 'rxjs/operators';

// @Component({
//   selector: 'app-reset-password-ui',
//   templateUrl: './reset-password-ui.component.html',
//   styleUrls: ['./reset-password-ui.component.css']
// })
// export class ResetPasswordUIComponent implements OnInit {

//   isLoading: boolean = false;
//   resetForm!: FormGroup;
//   passwordVisible: boolean = false; // Flag to toggle password visibility
//   showPopup: boolean = true;
//   newPassword: string = '';
//   confirmPassword: string = '';
//   resetToken: string = '';  


//   token: string;
//   isTokenValid: boolean = false;
//   errorMessage: string = '';
//   constructor(
//     private fb: FormBuilder,
//     private notificationsService: NotificationsService,
//     private route: ActivatedRoute,
//     private reset:ResetPasswordService
//   ) {
//     this.resetForm = this.fb.group({
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', [Validators.required]],
//     });


//    }

//    ngOnInit(): void {
//     // Extract the token from the URL
//     this.token = this.route.snapshot.paramMap.get('token') ?? '';

//     // Validate the token with the backend
//     this.reset.validateToken(this.token).subscribe(
//       (isValid) => (this.isTokenValid = isValid),
//       (error) => (this.errorMessage = error.message)
//     );
//   }

//   passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('password_confirmation')?.value;
//     return password === confirmPassword ? null : { 'mismatch': true };
//   }

//   // Toggle password visibility
//   togglePasswordVisibility(): void {
//     this.passwordVisible = !this.passwordVisible;
//   }
//   onSubmit() {
//     if (this.resetForm.invalid) return;

//     const { password, confirmPassword } = this.resetForm.value;
//     if (password !== confirmPassword) {
//       this.errorMessage = 'Passwords do not match!';
//       return;
//     }

//     this.reset.resetPassword(this.token, password).subscribe(
//       (response) => {
//         alert('Password reset successful!');
//         this.router.navigate(['/login']);
//       },
//       (error) => (this.errorMessage = error.message)
//     );
//   }

//   closePopup() {
//     this.showPopup = false;
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/Password/Reset/reset-password.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password-ui',
  templateUrl: './reset-password-ui.component.html',
  styleUrls: ['./reset-password-ui.component.css']
})
export class ResetPasswordUIComponent implements OnInit {
  resetForm: FormGroup;
  token: string;
  isTokenValid: boolean = false;
  errorMessage: string = '';
  passwordVisible:boolean = false;
  confirmPasswordVisible:boolean = false;
  isLoading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: ResetPasswordService
  ) {
   
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Toggle visibility for confirm password field
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }


  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const { password, confirmPassword } = this.resetForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService.resetPassword(this.token, password).subscribe(
      (response) => {
        this.isLoading = true;
        alert('Password reset successful!');
        this.router.navigate(['/login']);
      },
      (error) => (this.errorMessage = error.message)
    );
  }
}

