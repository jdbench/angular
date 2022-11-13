import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageListChangedEvent = new Subject<Message[]>();
  private messages: Message[] = [];
  private messagesUrl = 'https://jbcms-694f4-default-rtdb.firebaseio.com/messages.json';
  private maxMessageId: number;

  constructor(private http: HttpClient) {}

  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }

  getMessages(): Message[] {
    this.http
      .get<Message[]>(this.messagesUrl)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageListChangedEvent.next(this.messages.slice());
      });
    return this.messages.slice();
  }

  getMessage(id: string) {
    return this.messages.find((m) => m.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = +message.id;
      if (currentId > maxId) maxId = currentId;
    });
    return maxId;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) return;
    this.maxMessageId++;
    newMessage.id = `${this.maxMessageId}`;
    this.messages.push(newMessage);
    this.storeMessages();
  }
}
