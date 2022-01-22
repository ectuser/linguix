import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  getActive(): Observable<chrome.tabs.Tab> {
    return new Observable<chrome.tabs.Tab>((subscriber) => {
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        const activeTab = tabs[0];
        subscriber.next(activeTab);
        subscriber.complete();
      });
    });
  }
}
