import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-ui',
  templateUrl: './home-ui.component.html',
  styleUrls: ['./home-ui.component.css']
})
export class HomeUIComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isMobileMenuOpen = false;

  // Method to toggle the mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
