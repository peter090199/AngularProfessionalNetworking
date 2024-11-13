import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/SignUp/sign-up.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponent } from 'src/app/TermsModal/terms-modal/terms-modal.component';
import { PrivacyComponent } from 'src/app/TermsModal/privacy/privacy.component';
@Component({
  selector: 'app-forgot-password-ui',
  templateUrl: './forgot-password-ui.component.html',
  styleUrls: ['./forgot-password-ui.component.css']
})
export class ForgotPasswordUIComponent implements OnInit {

  isLoading = false;
  fpassword!: FormGroup;
  loginForm: any;
  fb: any;
    
  constructor() { }
// Initialize the login form
private initializeForm(): void {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
}

  ngOnInit(): void {
  }
  onSubmit() {

    }

}
