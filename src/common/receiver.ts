import {Message} from "./models";

export class Receiver {
  constructor(
    private matcher: Record<string, (message: Message) => void>
  ) {}

  receive() {
    console.log('receive')
    chrome.runtime.onMessage.addListener((request: Message) => {
      console.log('mess', request);
      const func = this.matcher[request.messageType];
      if (func) {
        func(request);
      }
    });
  }
}
