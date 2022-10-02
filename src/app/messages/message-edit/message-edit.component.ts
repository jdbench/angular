import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  constructor() { }

  @ViewChild('subject') subject: ElementRef;
  @ViewChild('message') message: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender:string = 'Justin';

  ngOnInit(): void {
  }

  onSendMessage(event: Event){
    event.preventDefault();
    this.addMessageEvent.emit(
      new Message(1, this.subject.nativeElement.value, this.message.nativeElement.value, this.currentSender)
    );
    this.onClear();
    this.subject.nativeElement.focus();
  }

  onClear(){
    this.subject.nativeElement.value = '';
    this.message.nativeElement.value = '';
  }

}
