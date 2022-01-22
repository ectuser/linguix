import {MessageEnum} from "./messages";

export interface Message {
  messageType: MessageEnum;
  data: unknown;
}

export class MessageInstance implements Message {
  constructor(public messageType: MessageEnum, public data: unknown) {}

  toObject() {
    return {...this};
  }
}
