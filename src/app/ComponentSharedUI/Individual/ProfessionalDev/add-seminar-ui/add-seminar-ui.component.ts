import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-seminar-ui',
  templateUrl: './add-seminar-ui.component.html',
  styleUrls: ['./add-seminar-ui.component.css']
})
export class AddSeminarUiComponent implements OnInit {

  seminarForm:FormGroup;

  constructor(private fb:FormBuilder) { }

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


submitForm() {
    
  }

}
