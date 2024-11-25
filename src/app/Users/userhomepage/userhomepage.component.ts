import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { slideUp,slideFade} from 'src/app/animations';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';

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
  options: User[] = [{name: 'UX Designer'}, {name: 'Software Engineer'}, {name: 'Data Scientist'}];
  filteredOptions: Observable<User[]>;

  ngOnInit(): void {
    this.fadeIn = true; 
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  searchQuery: string = ''; // The input model for the search query
  filteredData: string[] = []; // The array of filtered results

  // Sample data to be filtered
  data: string[] = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Machine Learning Engineer',
    'DevOps Engineer',
    'UI/UX Designer',
    'Product Manager',
    'Project Manager',
    'System Administrator',
    'Cloud Engineer',
    'Database Administrator',
    'Quality Assurance Engineer',
    'Technical Support Specialist',
    'Business Analyst',
    'Network Engineer',
    'Security Engineer',
    'Web Developer',
    'Mobile Developer',
    'SEO Specialist',
    'Digital Marketing Manager',
    'Content Writer',
    'Graphic Designer',
    'Game Developer'
  ];
  

  // Method to filter data based on the search query
  filterData(): void {
    this.filteredData = this.data.filter(item =>
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Toggle sidebar visibility
  }
  constructor(private router:Router) {
    this.updateMobileState(); // Set initial state
  }
  refreshHomePage() {
    // Navigate to the homepage (root of the app)
    this.router.navigate(['/homepage']).then(() => {
      // Reload the page
      window.location.reload();
    });
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


