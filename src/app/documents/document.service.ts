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
  private documentsUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) {}

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    this.http
      .get<{ message: string; documents: Document[] }>(this.documentsUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents = res.documents;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  getDocument(id: string): Document | undefined {
    return this.documents.find((d) => d.id === id);
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    newDocument.id = '';
    this.http
      .post<{ message: string; document: Document }>(
        this.documentsUrl,
        newDocument,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents.push(res.document);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.documentsUrl}/${document.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }

  updateDocument(
    originalDocument: Document | undefined,
    newDocument: Document | undefined
  ) {
    if (!newDocument || !originalDocument) return;
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;
    this.http
      .put<{ message: string }>(
        `${this.documentsUrl}/${originalDocument.id}`,
        newDocument,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.documents[pos] = newDocument;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }
}
