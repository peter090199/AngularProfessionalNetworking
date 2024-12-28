import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trainings-ui',
  templateUrl: './add-trainings-ui.component.html',
  styleUrls: ['./add-trainings-ui.component.css']
})
export class AddTrainingsUiComponent implements OnInit {

  trainingForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.trainingForm = this.fb.group({
      training: this.fb.array([
        this.createTraining() // Initializes the first FormGroup
      ])
    });
    
  }
  get trainingArray(): FormArray {
    return this.trainingForm.get('training') as FormArray;
  }
  addTraining(): void {
    this.trainingArray.push(this.createTraining());
  }

    removeItemFromArray3(arrayName: string, index: number): void {
      if (arrayName === 'training' && this.trainingArray.length > 1) {
        this.trainingArray.removeAt(index);
      }
    }
  
     //trainings
      createTraining(): FormGroup {
        return this.fb.group({
          training_title: ['', Validators.required],
          training_provider: ['', Validators.required],
          trainingdate: ['', Validators.required],
        });
      }

      submitForm() {
        
     }
}
