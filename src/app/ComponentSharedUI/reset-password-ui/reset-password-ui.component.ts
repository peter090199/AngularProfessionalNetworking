import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute} from '@angular/router';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { _url } from 'src/global-variables';
@Component({
  selector: 'app-reset-password-ui',
  templateUrl: './reset-password-ui.component.html',
  styleUrls: ['./reset-password-ui.component.css']
})
export class ResetPasswordUIComponent implements OnInit {

  isLoading: boolean = false;
  resetForm!: FormGroup;
  passwordVisible: boolean = false; // Flag to toggle password visibility
  showPopup: boolean = true;
  newPassword: string = '';
  confirmPassword: string = '';
  resetToken: string = '';  

  constructor(
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    https://yourapp.com/reset-password/{token}
     this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];  // 'token' should be the query parameter
    });

    this.resetForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required])
    }, {
      validator: this.passwordMatchValidator
    });

  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      // Send the request to reset the password
      console.log("Resetting password with token", this.resetToken, "and new password", this.newPassword);
      // Here, you can call your backend service to process the reset
    }
  }

  closePopup() {
    this.showPopup = false;
  }

}
