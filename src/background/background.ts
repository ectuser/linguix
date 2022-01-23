import {fillStorage} from "./utils";
import {Receiver} from "../common/receiver";
import {Message} from "../common/models";
import {reloadAllTabs} from "./controller";

chrome.runtime.onInstalled.addListener(function (object) {
  if(object.reason === 'install') {
    const query = '?openPostInstall=true'
    chrome.tabs.create({url: chrome.runtime.getURL('index.html') + query});
    fillStorage();
  }
});

const matcher: Record<string, (message: Message) => unknown> = {
  'reloadPages': reloadAllTabs
};

const receiver = new Receiver(matcher);
receiver.receive();


