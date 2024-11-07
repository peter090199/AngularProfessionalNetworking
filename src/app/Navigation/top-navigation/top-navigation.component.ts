import { Component, HostListener, OnInit } from '@angular/core';
import { TNavigationService } from 'src/app/services/TNavigation/tnavigation.service';
import { slideUp, slideFade } from 'src/app/animations';
import { AuthGuard } from 'src/app/AuthGuard/auth.guard';
import { MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css'],
  animations: [slideUp, slideFade]
})
export class TopNavigationComponent implements OnInit {
  fadeIn: boolean = false;
  isSidebarOpen = false; // Sidebar state
  isDesktop: true;
  isMobile: boolean = false; // Mobile detection state
  nav_module: any=[]; // Store user data fetched from API
  submenuMenu: MatMenuPanel<any>;

  constructor(
    private authService: AuthGuard,
    private navigationService: TNavigationService // Inject the TNavigationService
  ) {
    this.updateMobileState(); // Set initial state
  }

  ngOnInit(): void {
    this.fadeIn = true;
    this.getUserData(); // Fetch user data when component loads
  }
  isChatOpen = false;
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  onCloseChat() {
    this.isChatOpen = false;
  }
  // Update the mobile state based on window width
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateMobileState();
  }

  updateMobileState() {
    this.isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
  }

  onLogout(): void {
    this.authService.logout();
  }

  // Fetch user data from the API
  getUserData() {
    this.navigationService.getData() // Use a relevant endpoint
      .subscribe(
        (data: any) => {
          this.nav_module = data;
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
        }
      );
  }

  // Example of sending data to the API (POST request)
  sendData() {
    const requestBody = { name: 'John Doe', email: 'john@example.com' };
    this.navigationService.postData('submit-form', requestBody)
      .subscribe(
        (response: any) => {
          console.log('Form submitted successfully', response);
        },
        (error: any) => {
          console.error('Error submitting form:', error);
        }
      );
  }
}
