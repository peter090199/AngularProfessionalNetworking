import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-add-employment-ui',
  templateUrl: './add-employment-ui.component.html',
  styleUrls: ['./add-employment-ui.component.css']
})
export class AddEmploymentUiComponent implements OnInit {
  dataList: any[] = []; 
  employmentForm:FormGroup;

  constructor(private fb:FormBuilder,private dataService: ProfessionalService,
    private alert:NotificationsService
  ) { }

  ngOnInit(): void {
    this.employmentForm = this.fb.group({
      employment: this.fb.array([
        this.createEmployment() // Initializes the first FormGroup
      ])
    });
  }
  get employmentArray(): FormArray {
    return this.employmentForm.get('employment') as FormArray;
  }

  addEmployment(): void {
    this.employmentArray.push(this.createEmployment());
  }

  //employment
  createEmployment(): FormGroup {
    return this.fb.group({
      company_name: ['', Validators.required],
      position: ['', Validators.required],
      job_description: ['', Validators.required],
      date_completed: ['', Validators.required],
    });
  }

//employment
removeItemFromArray5(arrayName: 'employment', index: number) {
  const formArray = this.employmentForm.get(
    `${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}


 
submitForm(): void {
  if (this.employmentForm.valid) {
    this.dataList.push(...this.employmentArray.value); 

    this.dataService.setformEmployment(this.dataList); 
    console.log('List:', this.dataList); // Optional: View the data in console
    this.alert.toastPopUp("Successfully Added.");
    this.resetForm(); // Reset the form
  } else {
    console.error('Form is invalid');
  }
}


resetForm(): void {
  while (this.employmentArray.length !== 0) {
    this.employmentArray.removeAt(0);
  }
  this.employmentArray.push(this.createEmployment()); // Reset with one blank group
  this.employmentForm.reset();
}

}