import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
@Component({
  selector: 'app-sign-in-ui',
  templateUrl: './sign-in-ui.component.html',
  styleUrls: ['./sign-in-ui.component.css']
})

export class SignInUIComponent implements OnInit{

  ngOnInit(): void {
    this.initializeForm();
  }
  isLoading = false;
  
  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  
  hide = true;
  loginForm: FormGroup;
  hidePassword: any;

  constructor(private fb: FormBuilder, private router: Router,
    private notificationService:NotificationsService
  ) { 
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });

  } 
  user:any;
  onSubmit() 
  {
    const { Email, Password } = this.loginForm.value;
    if (this.loginForm.valid)
    {
        this.isLoading = true; 
        setTimeout(() => {
          this.isLoading = false; 
        }, 2000);
        
        
    }
  }

}


