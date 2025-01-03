import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
@Component({
  selector: 'app-add-education-ui',
  templateUrl: './add-education-ui.component.html',
  styleUrls: ['./add-education-ui.component.css']
})
export class AddEducationUIComponent implements OnInit {
  educationForm: FormGroup;
  educationList: any[] = []; 
  

  currentYear = new Date().getFullYear(); // Get the current year
  years: number[] = []; // Array of years
  


  constructor(private formBuilder: FormBuilder,private dataService:ProfessionalService,
    private alert:NotificationsService
  ) { 
      for (let year = 2000; year <= this.currentYear; year++) {
        this.years.push(year);
      }

  }

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit(): void {
    this.educationForm = this.formBuilder.group({
      education: this.formBuilder.array([
        this.createEducationGroup() // Initializes the first FormGroup
      ])
    });
    
  }

  addEducation(): void {
    const educationGroup = this.createEducationGroup();
    this.educationArray.push(educationGroup);
  }
  

  createEducationGroup(): FormGroup {
    return this.formBuilder.group({
      highest_education: ['', Validators.required],
      school_name: ['', Validators.required],
      start_month:['', Validators.required],
      end_month:['',Validators.required],
      year_entry: [null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      year_end: [null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      status: ['', Validators.required]
    });
  }

  validateDateRange(group: FormGroup): { [key: string]: boolean } | null {
    const yearEntry = group.get('year_entry')?.value;
    const yearEnd = group.get('year_end')?.value;
    const startMonth = group.get('start_month')?.value;
    const endMonth = group.get('end_month')?.value;

    // Check year and month range
    if (
      yearEntry &&
      yearEnd &&
      (yearEnd < yearEntry || (yearEnd === yearEntry && endMonth && startMonth && this.months.indexOf(endMonth) < this.months.indexOf(startMonth)))
    ) {
      return { invalidDateRange: true };
    }

    return null;
  }
  
  get educationArray(): FormArray {
      return this.educationForm.get('education') as FormArray;
    }
    
    label:any;
    educationStatusOptions = [
      { value: 'graduate', label: 'Graduate' },
      { value: 'undergraduate', label: 'Undergraduate' },
      { value: 'ongoing', label: 'Ongoing' }
    ];

    
  // Remove education from the FormArray
  removeItemFromArray2(arrayName: string, index: number): void {
    if (arrayName === 'education' && this.educationArray.length > 1) {
      this.educationArray.removeAt(index);
    }
  }

 submitForm(): void {
    if (this.educationForm.valid) {
      this.educationList.push(...this.educationArray.value); 

      this.dataService.setformEducation(this.educationList); 
      console.log('Education List:', this.educationList); // Optional: View the data in console
      this.alert.toastPopUp("Successfully Added.");
      this.resetForm(); // Reset the form
    } else {
      console.error('Form is invalid');
    }
  }

  

  resetForm(): void {
    while (this.educationArray.length !== 0) {
      this.educationArray.removeAt(0);
    }
    this.educationArray.push(this.createEducationGroup()); // Reset with one blank group
    this.educationForm.reset();
  }
  
}
