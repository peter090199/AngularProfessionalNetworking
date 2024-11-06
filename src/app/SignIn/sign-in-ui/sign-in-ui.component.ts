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

export class SignInUIComponent implements OnInit{
  isLoading = false;
  checked = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  
  hide = true;
  loginForm: FormGroup;
  hidePassword: any;

  constructor(private fb: FormBuilder, private router: Router,private siginservice: SigInService,
    private notificationService:NotificationsService
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  } 
  user:any;
  onSubmit() {
    const { email, password } = this.loginForm.value;
  
    // Check if the form is valid
    if (this.loginForm.valid) {
      this.isLoading = true; // Start loading
  
      // Call the sign-in service
      this.siginservice.signin(email, password).subscribe({
        next: (res) => {
          // Handle successful login
          if (res.token) {

            console.log(res.role_code);
            this.loginForm.reset();
            this.notificationService.toastrSuccess("Successfuly sign in");
             this.router.navigate(['/topnavigation']);
            // Optionally navigate or perform additional actions here
          }
        },
        error: (err) => {
          // Handle errors
          if (err.status === 401) {
            this.router.navigate(['/signInUI']); // Redirect for unauthorized access
          } else {
            this.notificationService.toastrError(err.error.message); // Show error message
          }
        },
        complete: () => {
          // Stop loading after the response is received
          this.isLoading = false; 
        }
      });
    }
  }
  
}


