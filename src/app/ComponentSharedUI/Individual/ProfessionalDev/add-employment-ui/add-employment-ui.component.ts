import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employment-ui',
  templateUrl: './add-employment-ui.component.html',
  styleUrls: ['./add-employment-ui.component.css']
})
export class AddEmploymentUiComponent implements OnInit {

  employmentForm:FormGroup;

  constructor(private fb:FormBuilder) { }

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


  submitForm() {
    }
}
