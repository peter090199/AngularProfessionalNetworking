import { Component, HostListener, OnInit } from '@angular/core';
import { slideUp,slideFade} from 'src/app/animations';

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
  value = 'Clear me';
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
  }
  constructor() {
    this.updateMobileState(); // Set initial state
  }

  ngOnInit(): void {
    this.fadeIn = true; 
  }


  isMobile: boolean = false; // Mobile detection state

  // Update the mobile state based on window width
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateMobileState();
  }

  updateMobileState() {
    this.isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed
  }


}


