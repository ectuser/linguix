import {Message} from "./models";

export class Receiver {
  constructor(
    private matcher: Record<string, (message: Message) => void>
  ) {}

  receive() {
    chrome.runtime.onMessage.addListener((request: Message) => {
      const func = this.matcher[request.messageType];
      if (func) {
        func(request);
      }
    });
  }
}
