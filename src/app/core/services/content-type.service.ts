import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ContentType} from "../../shared/types/content-type";

@Injectable()
export class ContentTypeService {
  private readonly contentTypeSubject$ = new BehaviorSubject<ContentType>('popup');

  get contentType$(): Observable<ContentType> {
    return this.contentTypeSubject$.asObservable();
  }

  checkQuery(): void {
    if (window?.location?.href?.includes('openPostInstall')) {
      this.contentTypeSubject$.next('post-install');
    }
  }
}
