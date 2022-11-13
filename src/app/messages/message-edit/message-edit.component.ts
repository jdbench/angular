import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('message') message: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {}

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.message.nativeElement.value;
    const message = new Message('1', subject, msgText, '5');
    this.messageService.addMessage(message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.message.nativeElement.value = '';
  }

}
