import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private contactsUrl = 'https://jbcms-694f4-default-rtdb.firebaseio.com/contacts.json';
  private maxContactId: number;
  private contact: Contact;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http
      .get<Contact[]>(this.contactsUrl)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      });
    return this.contacts.slice();
  }

  storeContacts() {
    this.http
      .put(this.contactsUrl, JSON.stringify(this.contacts), {
        headers: new HttpHeaders().set('Content-type', 'application/json'),
      })
      .subscribe(() => {
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      })
  }

  getContact(id: string){
    return this.contacts.find((c) => c.id === id);
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact) => {
      const currentId = +contact.id;
      if (currentId > maxId) maxId = currentId;
      else return;
    });
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = `${this.maxContactId}`;
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!newContact || !originalContact) return;
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
