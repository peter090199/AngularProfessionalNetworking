import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/Profile/profile.service';
@Component({
  selector: 'app-profile-ui',
  templateUrl: './profile-ui.component.html',
  styleUrls: ['./profile-ui.component.css']
})
export class ProfileUIComponent implements OnInit {
  error: any;
  profiles: any;

  constructor(private profile:ProfileService) { }
  ngOnInit(): void {
    this.profile.getProfileByUser().subscribe({
      next: (response) => {
        if (response.success) {
          this.profiles = response.message[0]; // Access the first item in the message array
        } else {
          this.error = 'Failed to load profile data';
        }
      },
      error: (err) => {
        this.error = err.message || 'An error occurred while fetching profile data';
      },
    });
  }


}
