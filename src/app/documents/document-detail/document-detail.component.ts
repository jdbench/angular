import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  nativeWindow: any;
  document: Document | undefined;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nativeWindow = this.windowRefService.getNativeWindow();

    this.route.params.subscribe((params: Params) => {
          this.document = this.documentService.getDocument(params['id']);
        }
      )
  }

  onView() {
    if(this.document?.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document!);
    this.router.navigate(['/documents'], {relativeTo: this.route})
  }

}
