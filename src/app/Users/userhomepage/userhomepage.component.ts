import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { slideUp,slideFade} from 'src/app/animations';

export interface User {
  name: string;
}


@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css'],
  animations: [slideUp,slideFade]
})
export class UserhomepageComponent implements OnInit {
  fadeIn: boolean = false;
  isSidebarOpen = false; // Sidebar state
  isDesktop: true;
  value = '';
  isMobile: boolean = false; // Mobile detection state

  
  myControl = new FormControl();
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
  }
  constructor() {
    this.updateMobileState(); // Set initial state
  }

  ngOnInit(): void {
    this.fadeIn = true; 
  }


  // Update the mobile state based on window width
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateMobileState();
  }

  updateMobileState() {
    this.isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed
  }


}


