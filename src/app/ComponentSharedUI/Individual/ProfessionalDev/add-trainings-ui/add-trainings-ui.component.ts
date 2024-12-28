import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';

@Component({
  selector: 'app-add-trainings-ui',
  templateUrl: './add-trainings-ui.component.html',
  styleUrls: ['./add-trainings-ui.component.css']
})
export class AddTrainingsUiComponent implements OnInit {
  dataList: any[] = []; 
  trainingForm:FormGroup;

  constructor(private fb:FormBuilder,private dataService:ProfessionalService,
    private datePipe:DatePipe

  ) { }

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

      submitForm(): void {
        if (this.trainingForm.valid) {
          // Ensure that the value of trainingdate is a valid Date object
          const trainingdate = this.trainingForm.value?.trainingdate
            ? this.datePipe.transform(new Date(this.trainingForm.value.trainingdate), 'yyyy-MM-dd')
            : null;
      
          // Add the form array data to the data list
          this.dataList.push(...this.trainingArray.getRawValue());
      
          // If trainingdate exists, assign it to each item in the dataList
          if (trainingdate) {
            this.dataList.forEach(item => {
              item.trainingdate = trainingdate;
            });
          }
      
          // Set the updated data list in the data service
          this.dataService.setformTraining(this.dataList);
      
          console.log('List:', this.trainingForm.value); // Optional: View the data in console
      
          this.resetForm(); // Reset the form after submission
        } else {
          console.error('Form is invalid');
        }
      }
      

  resetForm(): void {
    while (this.trainingArray.length !== 0) {
      this.trainingArray.removeAt(0);
    }
    this.trainingArray.push(this.createTraining()); // Reset with one blank group
    this.trainingForm.reset();
  }
  
}
