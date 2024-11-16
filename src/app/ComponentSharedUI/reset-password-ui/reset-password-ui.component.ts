import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/Password/Reset/reset-password.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpiredLinkDialogComponent } from '../expired-link-dialog/expired-link-dialog.component';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-reset-password-ui',
  templateUrl: './reset-password-ui.component.html',
  styleUrls: ['./reset-password-ui.component.css'],
})
export class ResetPasswordUIComponent implements OnInit {
  resetForm: FormGroup;
  isTokenValid: boolean = false;
  errorMessage: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  isLoading: boolean = false;
  successMessage: string = '';
  email: string;
  token: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: ResetPasswordService,
    private dialog: MatDialog,
    private notify:NotificationsService
  ) {}

  ngOnInit(): void {
    // Retrieve the token from the URL
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';

    // if (this.token) {
    //   this.openExpiredLinkDialog();
    // }

    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator to check if password and confirm password fields match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Toggle visibility for the password field
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Toggle visibility for the confirm password field
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  // Handle form submission
  onSubmit() {
    if (this.resetForm.valid) {
    const { password, password_confirmation } = this.resetForm.value;
    const payload = {
      email: this.email,
      token: this.token,
      password,
      password_confirmation
    };

    console.log(payload)
    // Call the reset password service
    this.authService.resetPassword(payload).subscribe(
      (res) => {
        console.log(res.value)
        if (res.success)
        {
          this.isLoading = true;
          this.notify.toastrSuccess(res.message);
          this.router.navigate(['/signInUI']);
        }
        else
        {
          this.notify.toastrWarning(res.message);
          this.isLoading = false;
        }
        
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
        this.notify.toastrError(this.errorMessage);
        // Check if the error message indicates an expired link
        // if (this.errorMessage.includes('expired')) {
        //   this.openExpiredLinkDialog();
        // }
      }
    );
   }
  }

  // Method to open the expired link dialog
  openExpiredLinkDialog(): void {
    this.dialog.open(ExpiredLinkDialogComponent);
  }
}
