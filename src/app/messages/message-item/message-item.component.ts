import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender: string | undefined;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.messageSender = this.contactService.getContact(
      this.message.sender
    )?.name;
  }
}
