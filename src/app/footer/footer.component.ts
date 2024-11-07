import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isChatOpen = false;

  toggleChat() {
    this.isChatOpen = this.isChatOpen;
  }

  onCloseChat() {
    this.isChatOpen = false;
  }

}
