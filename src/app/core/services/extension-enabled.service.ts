import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {StorageService} from "./storage.service";
import {filter, map, skip, switchMap, take, tap} from "rxjs/operators";
import {EXTENSION_ENABLED} from "../../shared/consts/storage-keys";
import {MessageInstance} from "../../shared/models/message";
import {MessageEnum} from "../../shared/models/messages";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class ExtensionEnabledService {
  private readonly extensionEnabledSubject$ = new BehaviorSubject<boolean | undefined>(undefined);

  get extensionEnabled$(): Observable<boolean> {
    return this.extensionEnabledSubject$.asObservable().pipe(
      filter((value) => value !== undefined),
      map((value) => value as boolean)
    );
  }

  constructor(private storageService: StorageService, private messageService: MessageService) {
    this.storageService.getItem(EXTENSION_ENABLED).pipe(take(1)).subscribe((value) => {
      if (typeof value === 'boolean') {
        this.extensionEnabledSubject$.next(value);
      }
    });

    this.extensionEnabled$.pipe(
      skip(1),
      switchMap((value) => {
        return this.storageService.setItem(EXTENSION_ENABLED, value);
      }),
      tap(() => {
        const message = new MessageInstance(MessageEnum.ReloadPages);
        this.messageService.sendToBackground(message);
      })
    ).subscribe()
  }

  setExtensionEnabledSubject(status: boolean): void {
    this.extensionEnabledSubject$.next(status);
  }
}
