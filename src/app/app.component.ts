import { Component } from '@angular/core';
import {MessageService} from "./core/services/message.service";
import {MessageInstance} from "./shared/models/message";
import {MessageEnum} from "./shared/models/messages";
import {DestroyService} from "./core/services/destroy.service";
import {takeUntil} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {ContentTypeService} from "./core/services/content-type.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent {
  readonly contentType$ = this.contentTypeService.contentType$;

  constructor(
    private messageService: MessageService,
    private destroy$: DestroyService,
    private contentTypeService: ContentTypeService
  ) {}

  sendMessage() {
    this.messageService.sendToContent(new MessageInstance(MessageEnum.Log, {hello: 'world'}))
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
