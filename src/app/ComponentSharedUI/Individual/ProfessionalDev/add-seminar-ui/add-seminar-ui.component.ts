import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
@Component({
  selector: 'app-add-seminar-ui',
  templateUrl: './add-seminar-ui.component.html',
  styleUrls: ['./add-seminar-ui.component.css']
})
export class AddSeminarUiComponent implements OnInit {
  dataList: any[] = []; 
  seminarForm:FormGroup;

  constructor(private fb:FormBuilder,private dataService:ProfessionalService

  ) { }

  ngOnInit(): void {
    this.seminarForm = this.fb.group({
      seminar: this.fb.array([
        this.createSeminar() // Initializes the first FormGroup
      ])
    });
  }

  get seminarArray(): FormArray {
    return this.seminarForm.get('seminar') as FormArray;
  }

  addSeminar(): void {
    this.seminarArray.push(this.createSeminar());
  }
    //seminar
    createSeminar(): FormGroup {
      return this.fb.group({
        seminar_title: ['', Validators.required],
        seminar_provider: ['', Validators.required],
        seminardate: ['', Validators.required],
      });
    }
//seminar
removeItemFromArray4(arrayName: 'seminar', index: number) {
  const formArray = this.seminarForm.get(
    `${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}


submitForm(): void {
  if (this.seminarForm.valid) {
    this.dataList.push(...this.seminarArray.value); 

    this.dataService.setformTraining(this.dataList); 
    console.log('List:', this.dataList); // Optional: View the data in console
    this.resetForm(); // Reset the form
  } else {
    console.error('Form is invalid');
  }
}


resetForm(): void {
  while (this.seminarArray.length !== 0) {
    this.seminarArray.removeAt(0);
  }
  this.seminarArray.push(this.createSeminar()); // Reset with one blank group
  this.seminarForm.reset();
}



}
