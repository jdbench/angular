import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  document: Document[] = [
    new Document(1, "CIT 260", "Object Oriented Programming", "https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html"),
    new Document(2, "WDD 430", "Full Web Stack Development", "There's not a syllabus page"),
    new Document(3, "CIT 425", "Data Warehousing", "There's not a syllabus page"),
    new Document(4, "CIT 460", "Enterprise Development", "There's not a syllabus page"),
    new Document(4, "CIT 495", "Senior Practicum", "There's not a syllabus page")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
