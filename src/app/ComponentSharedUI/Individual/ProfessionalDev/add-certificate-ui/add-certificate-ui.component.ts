import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certificate } from 'crypto';

@Component({
  selector: 'app-add-certificate-ui',
  templateUrl: './add-certificate-ui.component.html',
  styleUrls: ['./add-certificate-ui.component.css']
})
export class AddCertificateUiComponent implements OnInit {
  certificateForm:FormGroup;
  certList: any[] = []; 

  constructor(private fb:FormBuilder) { }

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
  submitForm(): void {
    if (this.certificateForm.valid) {
      this.certList.push(...this.certificateArray.value); // Add to the array
      console.log('List:', this.certList); // Optional: View the data in console
      this.resetForm(); // Reset the form
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
