import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-add-edit-education-dialog',
  templateUrl: './add-edit-education-dialog.component.html',
  styleUrls: ['./add-edit-education-dialog.component.css']
})
export class AddEditEducationDialogComponent implements OnInit {
  years: number[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<AddEditEducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alert:NotificationsService
  ){
    const currentYear = new Date().getFullYear();
    const startYear = 1900; // Starting year for the dropdown
    for (let year = currentYear; year >= startYear; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
  }

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  


  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.alert.toastrSuccess('Successfully Updated.');
    this.dialogRef.close(this.data); // Pass the updated data back to the parent component
  }
}
