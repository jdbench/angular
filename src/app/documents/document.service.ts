import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]> ();
  documents: Document[];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments(): Document[] {
    return this.documents.slice();
   }

   getDocument(id: string): Document | undefined {
    return this.documents.find((d) => d.id === id);
   }

   getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((document) => {
      const currentId =+ document.id;
      if (currentId > maxId) maxId = currentId;
    })
    return maxId;
   }

   addDocument(newDocument: Document) {
    if (newDocument) {
      this.maxDocumentId++;
      newDocument.id = this.maxDocumentId.toString();

      this.documents.push(newDocument);

      const documentListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentListClone);
    }
    else return;
   }

   updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument && newDocument) {
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) return;

      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;

      const documentListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentListClone);
    }
   }

   deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
   }
}
