interface Message {
  messageType: string;
  data: unknown;
}

class Receiver {
  private static instance?: Receiver;

  private constructor() {}

  receive() {
    console.log('receive')
    chrome.runtime.onMessage.addListener((request: Message) => {
      console.log('mess', request);
      const func = matcher[request.messageType];
      if (func) {
        func(request);
      }
    });
  }

  static getInstance(): Receiver {
    return Receiver.instance ?? new Receiver();
  }
}

class Controller {
  private static instance?: Controller;

  private constructor() {}

  static getInstance(): Controller {
    return Controller.instance ?? new Controller();
  }

  method1(data: Message) {
    console.log(data);
  }
}

const receiver = Receiver.getInstance();
const controller = Controller.getInstance();

const matcher: Record<string, (message: Message) => void> = {
  'log': controller.method1
};

document.addEventListener('DOMContentLoaded', () => {
  receiver.receive();
});
