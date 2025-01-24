// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-edit-certificate',
//   templateUrl: './add-edit-certificate.component.html',
//   styleUrls: ['./add-edit-certificate.component.css']
// })
// export class AddEditCertificateComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditEducationDialogComponent } from '../add-edit-education-dialog/add-edit-education-dialog.component';

@Component({
  selector: 'app-add-edit-certificate',
  templateUrl: './add-edit-certificate.component.html',
  styleUrls: ['./add-edit-certificate.component.css']
})
export class AddEditCertificateComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddEditCertificateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  seminarDate:string=""
  ngOnInit(): void {

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data); 
  }
}
