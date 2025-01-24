import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/SharedServices/professional.service';
import { NotificationsService } from 'src/app/services/Global/notifications.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-certificate-ui',
  templateUrl: './add-certificate-ui.component.html',
  styleUrls: ['./add-certificate-ui.component.css']
})
export class AddCertificateUiComponent implements OnInit {
  certificateForm:FormGroup;
  dataList: any[] = []; 

  constructor(private fb:FormBuilder,private dataService:ProfessionalService,
    private datePipe:DatePipe,private alert:NotificationsService,public dialogRef: MatDialogRef<AddCertificateUiComponent>,

  ) { }

  ngOnInit(): void {
    this.certificateForm = this.fb.group({
      certificate: this.fb.array([
        this.createCertificate() // Initializes the first FormGroup
      ])
    });
  }

  get certificateArray(): FormArray {
    return this.certificateForm.get('certificate') as FormArray;
  }
  addCertificate(): void {
    this.certificateArray.push(this.createCertificate());
  }
  createCertificate(): FormGroup {
    return this.fb.group({
      certificate_title: ['', Validators.required],
      certificate_provider: ['', Validators.required],
      date_completed: ['', Validators.required],
    });
  }

  listData: any[] = [];
  submitForm(): void {
    if (this.certificateForm.valid) {
      this.listData = this.certificateArray.value;
      this.dataService.setformCertificate(this.listData); // Save to the service or database
      this.alert.toastrSuccess('Successfully Added.');
      this.dialogRef.close(this.listData);
    } else {
      console.error('Form is invalid');
    }
  }
  
  resetForm(): void {
    while (this.certificateArray.length !== 0) {
      this.certificateArray.removeAt(0);
    }
    this.certificateArray.push(this.createCertificate()); // Reset with one blank group
    this.certificateForm.reset();
  }
//certificate
removeItemFromArray6(arrayName: 'certificate', index: number) {
  const formArray = this.certificateForm.get(
    `${arrayName}`
  ) as FormArray;
  formArray.removeAt(index);
}



}
