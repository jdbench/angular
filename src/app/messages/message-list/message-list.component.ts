import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: any;

  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts();
    this.messages = this.messageService.getMessages();
    this.messageService.messageListChangedEvent
      .subscribe((messages: Message[]) => {this.messages = messages;});
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
