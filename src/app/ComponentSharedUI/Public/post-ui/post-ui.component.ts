import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-post-ui',
  templateUrl: './post-ui.component.html',
  styleUrls: ['./post-ui.component.css']
})
export class PostUIComponent {
  postContent: string = '';

  constructor(public dialogRef: MatDialogRef<PostUIComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  postData() {
    console.log('Posting:', this.postContent);
    this.dialogRef.close(this.postContent); // Pass data back to parent component
  }

  uploadImage() {
    console.log('Image upload clicked');
  }

  uploadVideo() {
    console.log('Video upload clicked');
  }
}
