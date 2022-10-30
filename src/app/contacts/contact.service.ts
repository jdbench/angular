import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    if (!this.contacts) {
      return null;
    }

    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }

    return null;
  }

  getMaxId(): number {
    let maxId = 0
    this.contacts.forEach((contact) => {
      const currentId =+ contact.id;
      if (currentId > maxId) maxId = currentId
      else return
    })
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact) {
      this.maxContactId++
      newContact.id = this.maxContactId.toString()

      this.contacts.push(newContact);

      const contactListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactListClone);
    } else return;
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact && newContact) {
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) return

      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;

      const contactListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactListClone);
    } else return;
  }

  deleteContact(contact: Contact) {
    if (contact) {
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
    } else return;
  }
}
