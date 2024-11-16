// expired-link-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expired-link-dialog',
  template: `
    <h2 mat-dialog-title>Link Expired</h2>
    <mat-dialog-content>
      <p>Your reset link has expired. Please request a new one.</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="goToForgotPassword()">Request New Link</button>
    </mat-dialog-actions>
  `,
})

export class ExpiredLinkDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ExpiredLinkDialogComponent>,
    private router: Router
  ) {}

  close(): void {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }

  goToForgotPassword(): void {
    this.dialogRef.close();
    this.router.navigate(['/forgetpassword']);
  }

}
