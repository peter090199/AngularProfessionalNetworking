import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditEducationDialogComponent } from '../add-edit-education-dialog/add-edit-education-dialog.component';

@Component({
  selector: 'app-add-edit-seminar',
  templateUrl: './add-edit-seminar.component.html',
  styleUrls: ['./add-edit-seminar.component.css']
})
export class AddEditSeminarComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddEditEducationDialogComponent>,
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
