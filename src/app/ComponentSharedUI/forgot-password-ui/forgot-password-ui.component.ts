import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/SignUp/sign-up.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password-ui',
  templateUrl: './forgot-password-ui.component.html',
  styleUrls: ['./forgot-password-ui.component.css']
})
export class ForgotPasswordUIComponent implements OnInit {

  isLoading: boolean= false;
  loginForm!: FormGroup; // Define the form group properly
  
  constructor(private fb: FormBuilder, 
              private signUpService: SignUpService,
              private notificationsService: NotificationsService,
              private dialog: MatDialog,
              private route:Router
            ) { }
         

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {

    this.notificationsService.popupWarning("try","ongoing");

    this.isLoading = true; // Show loading indicator
    this.route.navigate(['/*']);
    }
  //   const email = this.loginForm.get('email')?.value; // Get the email from the form control

  //   // Call the service to handle password reset
  //   this.signUpService.forgotPassword(email).subscribe(
  //     (response) => {
  //       this.isLoading = false;
  //       this.notificationsService.showSuccess('Password reset link sent to your email.');
  //     },
  //     (error) => {
  //       this.isLoading = false;
  //       this.notificationsService.showError('Error: ' + error.message);
  //     }
  //   );
   }
}
