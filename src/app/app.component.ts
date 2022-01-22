import { Component } from '@angular/core';
import {MessageService} from "./core/services/message.service";
import {MessageInstance} from "./shared/models/message";
import {MessageEnum} from "./shared/models/messages";
import {DestroyService} from "./core/services/destroy.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent {
  constructor(private messageService: MessageService, private destroy$: DestroyService) {}

  sendMessage() {
    this.messageService.sendToContent(new MessageInstance(MessageEnum.Log, {hello: 'world'}))
      .pipe(takeUntil(this.destroy$))
      .subscribe();
      // chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      //   chrome.tabs.executeScript(
      //     tabs[0].id!,
      //     { code: `document.body.style.backgroundColor = '${ this.color }';` }
      //   );
      // });
      // V3 API, uncomment once supported
      // chrome.scripting.executeScript({
      //   target: {
      //     tabId: tabs[0].id!,
      //   },
      //   function: () => document.body.style.backgroundColor = this.color
      // })
  }
}
