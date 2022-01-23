import { Component } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ContentType} from "./shared/types/content-type";
import {ContentTypeService} from "./core/services/content-type.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContentTypeService]
})
export class AppComponent {
  readonly contentTypeSubject$ = this.contentTypeService.contentType$;

  constructor(private contentTypeService: ContentTypeService) {
    this.contentTypeService.checkQuery();
  }
}
