import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.css']
})
export class ChatUIComponent {
  messages: { text: string, sender: string }[] = [];
  message = '';

  constructor() {}

  ngOnInit(): void {
    // Subscribe to incoming messages
    // this.chatService.receiveMessage().subscribe((msg) => {
    //   this.messages.push({ text: msg, sender: 'other' });
    // });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      // // Send the message via the service
      // this.chatService.sendMessage(this.message);
      // Add it to the chat window
      this.messages.push({ text: this.message, sender: 'self' });
      this.message = '';
    }
  }

}
