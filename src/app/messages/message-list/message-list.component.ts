import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor() { }

  messages: Message[] = [
      new Message(1, 'Work', 'Did you get that component done?', 'Adam'),
      new Message(2, 'Family', 'Come to my house tomorrow at 7', 'Mom'),
    ];

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
