import { Component, OnInit } from '@angular/core';
import { MessageService, Messages } from './message.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private messages: Messages;

  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
    let jwt = JSON.parse(localStorage.getItem('client'));
    let message = this.messageService.getMessages(jwt);
    message.subscribe(res=> {
      this.messages = res;
    });
  }
}
