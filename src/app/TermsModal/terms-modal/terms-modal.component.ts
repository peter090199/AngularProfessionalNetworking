import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.css']
})
export class TermsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TermsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, content: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
