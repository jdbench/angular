import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  private maxDocumentId: number;
  private documentsUrl =
    'https://jbcms-694f4-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {}

  getDocuments(): Document[] {
    this.http
      .get<Document[]>(this.documentsUrl)
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
    return this.documents.slice();
  }

  storeDocuments() {
    this.http
      .put(this.documentsUrl, JSON.stringify(this.documents), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find((d) => d.id === id);
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((document) => {
      const currentId = +document.id;
      if (currentId > maxId) maxId = currentId;
    });
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    this.maxDocumentId++;
    newDocument.id = `${this.maxDocumentId}`;
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(
    originalDocument: Document | undefined,
    newDocument: Document | undefined
  ) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
