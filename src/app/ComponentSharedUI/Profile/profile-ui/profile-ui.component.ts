import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/Profile/profile.service';
import { UploadProfileComponent } from '../../Individual/upload-profile/upload-profile.component';
import { UserCVComponent } from '../../Individual/user-cv/user-cv.component';
import { UserProfileUiComponent } from '../../Individual/user-profile-ui/user-profile-ui.component';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-profile-ui',
  templateUrl: './profile-ui.component.html',
  styleUrls: ['./profile-ui.component.css']
})
export class ProfileUIComponent implements OnInit {

  error: any;
  profiles: any;
  users: any;
  btnCurriculum: boolean = false;
 
  code:any;
  constructor(private profile:ProfileService,public dialog:MatDialog,private route: ActivatedRoute,

  ) { }
 
  ngOnInit(): void {
    const url = window.location.href;
    const codesplit = url.split('/').pop();
    this.code = codesplit;

    this.loadUserData();
    this.loadProfileCV();
  }
  

  loadProfileCV(){
    this.profile.getProfileByUser(this.code).subscribe({
      next: (response) => {
        if (response.success == true) {
          this.profiles = response.message; 
       
        } else {
          this.error = 'Failed to load profile data';
        }
      },
      error: (err) => {
        this.error = err.message || 'An error occurred while fetching profile data';
      },
    });
  }

  UserCV() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '900px';
  //  dialogConfig.data = element || null; // Pass user data
  
    const dialogRef = this.dialog.open(UserProfileUiComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
  

  loadUserData(){
    this.profile.getProfileByUserOnly().subscribe({
      next: (response) => {
        if (response.success == true) {
          this.users = response.message[0]; // Access the first item in the message array
        } else {
          this.error = 'Failed to load profile data';
        }
      },
      error: (err) => {
        this.error = err.message || 'An error occurred while fetching profile data';
      },
    });
  }

  uploadPic(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '400px';

  const dialogRef = this.dialog.open(UploadProfileComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
     // this.getRoles(); // Refresh the table after dialog closure
    }
  });
}

}
