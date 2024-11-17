import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/SignUp/sign-up.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsModalComponent } from 'src/app/TermsModal/terms-modal/terms-modal.component';
import { PrivacyComponent } from 'src/app/TermsModal/privacy/privacy.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-ui',
  templateUrl: './sign-up-ui.component.html',
  styleUrls: ['./sign-up-ui.component.css']
})

export class SignUpUIComponent implements OnInit {
  registerForm: FormGroup;
  isloading:boolean = false;
  passwordVisible:boolean = false;
  
  countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+7', country: 'Russia/Kazakhstan' },
    { code: '+20', country: 'Egypt' },
    { code: '+27', country: 'South Africa' },
    { code: '+30', country: 'Greece' },
    { code: '+31', country: 'Netherlands' },
    { code: '+32', country: 'Belgium' },
    { code: '+33', country: 'France' },
    { code: '+34', country: 'Spain' },
    { code: '+36', country: 'Hungary' },
    { code: '+39', country: 'Italy' },
    { code: '+40', country: 'Romania' },
    { code: '+41', country: 'Switzerland' },
    { code: '+43', country: 'Austria' },
    { code: '+44', country: 'UK' },
    { code: '+45', country: 'Denmark' },
    { code: '+46', country: 'Sweden' },
    { code: '+47', country: 'Norway' },
    { code: '+48', country: 'Poland' },
    { code: '+49', country: 'Germany' },
    { code: '+52', country: 'Mexico' },
    { code: '+54', country: 'Argentina' },
    { code: '+55', country: 'Brazil' },
    { code: '+56', country: 'Chile' },
    { code: '+57', country: 'Colombia' },
    { code: '+58', country: 'Venezuela' },
    { code: '+60', country: 'Malaysia' },
    { code: '+61', country: 'Australia' },
    { code: '+62', country: 'Indonesia' },
    { code: '+63', country: 'Philippines' },
    { code: '+64', country: 'New Zealand' },
    { code: '+65', country: 'Singapore' },
    { code: '+66', country: 'Thailand' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+84', country: 'Vietnam' },
    { code: '+86', country: 'China' },
    { code: '+90', country: 'Turkey' },
    { code: '+91', country: 'India' },
    { code: '+92', country: 'Pakistan' },
    { code: '+93', country: 'Afghanistan' },
    { code: '+94', country: 'Sri Lanka' },
    { code: '+95', country: 'Myanmar' },
    { code: '+98', country: 'Iran' },
    { code: '+212', country: 'Morocco' },
    { code: '+213', country: 'Algeria' },
    { code: '+216', country: 'Tunisia' },
    { code: '+218', country: 'Libya' },
    { code: '+220', country: 'Gambia' },
    { code: '+221', country: 'Senegal' },
    { code: '+234', country: 'Nigeria' },
    { code: '+251', country: 'Ethiopia' },
    { code: '+254', country: 'Kenya' },
    { code: '+255', country: 'Tanzania' },
    { code: '+256', country: 'Uganda' },
    { code: '+260', country: 'Zambia' },
    { code: '+263', country: 'Zimbabwe' },
    { code: '+298', country: 'Faroe Islands' },
    { code: '+351', country: 'Portugal' },
    { code: '+352', country: 'Luxembourg' },
    { code: '+353', country: 'Ireland' },
    { code: '+354', country: 'Iceland' },
    { code: '+355', country: 'Albania' },
    { code: '+356', country: 'Malta' },
    { code: '+357', country: 'Cyprus' },
    { code: '+358', country: 'Finland' },
    { code: '+370', country: 'Lithuania' },
    { code: '+371', country: 'Latvia' },
    { code: '+372', country: 'Estonia' },
    { code: '+380', country: 'Ukraine' },
    { code: '+385', country: 'Croatia' },
    { code: '+386', country: 'Slovenia' },
    { code: '+387', country: 'Bosnia and Herzegovina' },
    { code: '+389', country: 'North Macedonia' },
    { code: '+420', country: 'Czech Republic' },
    { code: '+421', country: 'Slovakia' },
    { code: '+423', country: 'Liechtenstein' },
    { code: '+971', country: 'UAE' },
    { code: '+972', country: 'Israel' },
    { code: '+973', country: 'Bahrain' },
    { code: '+974', country: 'Qatar' },
    { code: '+975', country: 'Bhutan' },
    { code: '+976', country: 'Mongolia' },
    { code: '+977', country: 'Nepal' },
    { code: '+992', country: 'Tajikistan' },
    { code: '+993', country: 'Turkmenistan' },
    { code: '+994', country: 'Azerbaijan' },
    { code: '+995', country: 'Georgia' },
    { code: '+996', country: 'Kyrgyzstan' },
    { code: '+998', country: 'Uzbekistan' },
    // Add additional codes as needed
];


fadeIn: any;

  constructor(private fb: FormBuilder,
     private signupService:SignUpService,
     private notifyService:NotificationsService,
     private dialog: MatDialog,
     private router:Router
    ) {
      this.countryCodes + this.contactno;
    }
 contactno:any;
 togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      countryCode: new FormControl('', Validators.required),
      contactno: ['', [Validators.required,  Validators.pattern('^[0-9]+$')]],
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
      agreementTerms: new FormControl(false, Validators.requiredTrue),
      agreementPrivacy: new FormControl(false, Validators.requiredTrue)
    }, 
    { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  openModalTerms(title: string, content: string) {
    this.dialog.open(TermsModalComponent, {
      data: { title, content },
      width: '80%',  // You can adjust the modal size
      maxWidth: '600px',
    });
  }
  
  openModalPrivacy(title: string, content: string) {
    this.dialog.open(PrivacyComponent, {
      data: { title, content },
      width: '80%',  // You can adjust the modal size
      maxWidth: '600px',
    });
  }

  get isAgreementChecked(): boolean {
    return this.registerForm.get('agreementTerms')?.value && this.registerForm.get('agreementPrivacy')?.value;
  }
  onSubmit():void {
   if (this.registerForm.valid) {
    const formData = this.registerForm.getRawValue();
    formData.contactno = `${formData.countryCode}${formData.contactno}`;
   // console.log(formData)

        this.signupService.signup(formData).subscribe({
          next: (res) => {
            if(res.success === true)
            {
              this.isloading = true;
              this.notifyService.toastrSuccess(res.message);
              this.registerForm.reset();
              this.router.navigateByUrl("/signUpUI");
              this.isloading = false;
            }
            else{
              this.isloading = false;
              this.notifyService.toastrError(res.message);
            }
          },
          error: (err) => {
            this.notifyService.toastrError(err.message);
          },
        });
       }
  }
}
