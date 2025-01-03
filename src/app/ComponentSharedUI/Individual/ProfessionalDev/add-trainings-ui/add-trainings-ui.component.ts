import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-add-trainings-ui',
  templateUrl: './add-trainings-ui.component.html',
  styleUrls: ['./add-trainings-ui.component.css']
})
export class AddTrainingsUiComponent implements OnInit {
  dataList: any[] = []; 
  trainingForm:FormGroup;

  constructor(private fb:FormBuilder,private dataService:ProfessionalService,
    private datePipe:DatePipe,private alert:NotificationsService

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

          this.dataList.push(...this.trainingArray.getRawValue());
          this.alert.toastPopUp("SuccessFully Trainings Added!"),
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
