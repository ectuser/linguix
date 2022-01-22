import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {
  private readonly contentTypeSubject$ = new BehaviorSubject<'popup' | 'post-install'>('popup');

  get contentType$(): Observable<'popup' | 'post-install'> {
    return this.contentTypeSubject$.asObservable();
  }
}
