import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem(key: string, value: unknown): Observable<void> {
    return new Observable((subscriber) => {
      chrome.storage.sync.set({[key]: value}, () => {
        subscriber.next();
        subscriber.complete();
      });
    });
  }

  setItems(data: Record<string, unknown>): Observable<void> {
    return new Observable((subscriber) => {
      chrome.storage.sync.set(data, () => {
        subscriber.next();
        subscriber.complete();
      });
    });
  }

  getItem(key: string): Observable<unknown> {
    return new Observable((subscriber) => {
      chrome.storage.sync.get([key], (value) => {
        subscriber.next(value[key]);
        subscriber.complete();
      });
    });
  }

  getItems(keys: string[]): Observable<{[p: string]: any} | undefined> {
    return new Observable((subscriber) => {
      chrome.storage.sync.get(keys, (values) => {
        subscriber.next(values);
        subscriber.complete();
      });
    });
  }
}
