import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact?: Contact;
  originalContact?: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.id = id;
        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) return;

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        
        if (!this.originalContact.group && this.contact?.group) {
          this.groupContacts = this.contact.group
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      this.id, 
      value.name, 
      value.email, 
      value.phone, 
      value.imageUrl, 
      this.groupContacts
      );
    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    if (this.isInvalidContact(selectedContact)) return;
    this.groupContacts?.push(selectedContact);
  }

  
isInvalidContact(newContact: Contact) {
  if (!newContact) return true;
  
  if (this.contact && newContact.id === this.contact.id) return true;
  this.groupContacts.some((c) => newContact.id === c.id);
  return false;
}

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }
}
