import './content-styles.css';
import {startSearch} from "./replace-text";

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
  insertGoogleFonts();

  startSearch();
});

function insertGoogleFonts() {
  const head = document.getElementsByTagName('head')[0];

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';

  const secondLink = document.createElement('link');
  secondLink.rel = 'preconnect';
  secondLink.href = 'https://fonts.gstatic.com';
  secondLink.crossOrigin = 'crossOrigin';

  const thirdLink = document.createElement('link');
  thirdLink.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Nunito+Sans:wght@400;700&display=swap';
  thirdLink.rel = 'stylesheet';

  head.append(link);
  head.append(secondLink);
  head.append(thirdLink);
}


