import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ContentType} from "../../shared/types/content-type";

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {
  private readonly contentTypeSubject$ = new BehaviorSubject<ContentType>('popup');

  get contentType$(): Observable<ContentType> {
    return this.contentTypeSubject$.asObservable();
  }

  setContentType(value: ContentType) {
    this.contentTypeSubject$.next(value);
  }
}
