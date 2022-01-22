import { Injectable } from '@angular/core';
import {TabsService} from "./tabs.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MessageInstance} from "../../shared/models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private tabsService: TabsService) { }

  sendToContent(message: MessageInstance): Observable<void> {
    return this.tabsService.getActive().pipe(
      map((activeTab) => {
        if (activeTab?.id) {
          chrome.tabs.sendMessage(activeTab.id, message.toObject());
        }
      })
    )
  }
}
