import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {linkId: "documentsLink", linkName: 'Documents', linkURL: '/documents'},
    {linkId: "messagesLink", linkName: 'Messages', linkURL: '/messages'},
    {linkId: "contactsLink", linkName: 'Contacts', linkURL: '/contacts'}
  ];
  dropdownItems = [
    {linkId: "loginLink", linkName: 'Login', linkURL: '#4'},
    {linkId: "otherLink", linkName: 'Other', linkURL: '#5'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
