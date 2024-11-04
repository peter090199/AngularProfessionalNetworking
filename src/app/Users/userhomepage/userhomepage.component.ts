import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent implements OnInit {
  fadeIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.fadeIn = true; // Add fade-in class after 100ms
    }, 100);
  }

}
