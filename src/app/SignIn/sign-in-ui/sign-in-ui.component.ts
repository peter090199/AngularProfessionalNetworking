import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { SigInService } from 'src/app/services/signIn/sig-in.service';

@Component({
  selector: 'app-sign-in-ui',
  templateUrl: './sign-in-ui.component.html',
  styleUrls: ['./sign-in-ui.component.css']
})
export class SignInUIComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  hide = true; // For password visibility toggle
  checked = false; // Remember me checkbox

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sigInService: SigInService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the login form
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Handle form submission
  onSubmit(): void {
    // Check if the form is valid
    if (this.loginForm.invalid) {
      this.notificationService.toastrError('Please fill in the form correctly.');
      return;
    }

    // Extract the form values
    const { email, password } = this.loginForm.value;
    this.isLoading = true; // Start loading indicator

    // Call the sign-in service
    this.sigInService.signin(email, password).subscribe({
      next: (res) => {
        if (res.token) {
          this.notificationService.toastrSuccess('Successfully signed in');
          this.router.navigate(['/home']);
          this.loginForm.reset(); // Reset form after successful login
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.notificationService.toastrError('Unauthorized: Invalid credentials');
        } else {
          this.notificationService.toastrError(err.error?.message || 'An error occurred');
        }
        this.isLoading = false; // Stop loading on error
      },
      complete: () => {
        this.isLoading = false; // Stop loading on completion
      }
    });
  }
}
