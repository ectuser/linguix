import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostInstallService {
  private readonly postInstallOpened$Subject$ = new BehaviorSubject(false);

  get postInstallOpened$(): Observable<boolean> {
     return this.postInstallOpened$Subject$.asObservable();
  }

  setPostInstallOpened(status: boolean): void {
    this.postInstallOpened$Subject$.next(status);
  }
}
