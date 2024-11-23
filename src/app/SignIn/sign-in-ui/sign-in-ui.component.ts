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
  passwordVisible: boolean = false;

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
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }

  simulateLogin(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate incorrect password (replace with real validation logic)
        resolve(password === 'correct-password');
      }, 1000);
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  
  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    this.isLoading = true; // Start loading indicator
    this.sigInService.signin(email, password).subscribe({
      next: (res) => {
        if (res.success && res.token) {
          this.isLoading = true;
          this.notificationService.toastPopUp(res.message);
          this.router.navigate(['/home']);
          this.loginForm.reset(); // Reset form after successful login
          this.isLoading = false;
        }
        else
        {
          this.isLoading = false;
          this.notificationService.toastPopUpError(res.message);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.notificationService.toastrError(err.error);
        } else {
          this.notificationService.toastPopUpError(err.message);
        }
        this.isLoading = false; // Stop loading on error
      },
      complete: () => {
        this.isLoading = false; // Stop loading on completion
      }
    });
  }
}
}
