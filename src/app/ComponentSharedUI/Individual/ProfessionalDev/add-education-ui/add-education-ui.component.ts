import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
              private alert:NotificationsService, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddEducationUIComponent>
  ) 
  { 
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
  //  this.GetItemFormData();
    // if (this.data) {
    //   this.populateForm(this.data);
    // }
    
  }
  populateForm(data: any): void {
    const educationGroup = this.educationArray.at(0);
    educationGroup.patchValue({
      highest_education: data.highest_education,
      school_name: data.school_name,
      start_month: data.start_month,
      start_year: data.start_year,
      end_month: data.end_month,
      end_year: data.end_year,
      status: data.status
    });
  }

  GetItemFormData(){
    this.educationForm.controls['id'].setValue(this.data.id);
    this.educationForm.controls['highest_education'].setValue(this.data.highest_education);
    this.educationForm.controls['school_name'].setValue(this.data.school_name);
    this.educationForm.controls['start_month'].setValue(this.data.start_month);
    this.educationForm.controls['start_year'].setValue(this.data.start_year);
    this.educationForm.controls['end_month'].setValue(this.data.end_month);
    this.educationForm.controls['end_year'].setValue(this.data.end_year);
    this.educationForm.controls['status'].setValue(this.data.status);
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
      start_year:['',Validators.required],
      end_month: [null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      end_year: [null, [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      status: ['', Validators.required]
    });
  }

  validateDateRange(group: FormGroup): { [key: string]: boolean } | null {
    const yearEntry = group.get('start_year')?.value;
    const yearEnd = group.get('end_year')?.value;
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
    onNoClick(): void {
      this.dialogRef.close();
      
      
    }
    
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
