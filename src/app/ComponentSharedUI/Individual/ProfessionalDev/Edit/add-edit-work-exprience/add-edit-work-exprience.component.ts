import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/Global/notifications.service';

@Component({
  selector: 'app-add-edit-work-exprience',
  templateUrl: './add-edit-work-exprience.component.html',
  styleUrls: ['./add-edit-work-exprience.component.css']
})
export class AddEditWorkExprienceComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddEditWorkExprienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private alert:NotificationsService) { }

  ngOnInit(): void {
    console.log(this.data)
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
    this.alert.toastrSuccess('Successfully Updated.');
    this.dialogRef.close(this.data); 
  }
  
}
