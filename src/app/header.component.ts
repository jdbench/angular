import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {linkId: 1, linkName: 'Documents', linkURL: '/documents'},
    {linkId: 2, linkName: 'Messages', linkURL: '/messages'},
    {linkId: 3, linkName: 'Contacts', linkURL: '/contacts'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
