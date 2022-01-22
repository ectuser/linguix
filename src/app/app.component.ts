import { Component } from '@angular/core';
import {MessageService} from "./core/services/message.service";
import {MessageInstance} from "./shared/models/message";
import {MessageEnum} from "./shared/models/messages";
import {DestroyService} from "./core/services/destroy.service";
import {takeUntil} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent {
  readonly contentType$ = new BehaviorSubject<'popup' | 'post-install'>('post-install');

  constructor(private messageService: MessageService, private destroy$: DestroyService) {}

  sendMessage() {
    this.messageService.sendToContent(new MessageInstance(MessageEnum.Log, {hello: 'world'}))
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
