import {StorageService} from "./common/storage.service";
import {storageKeys} from "./common/consts";

const storageService = StorageService.getInstance();

chrome.runtime.onInstalled.addListener(() => {
  chrome.webNavigation.onCompleted.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
      if (id) {
        chrome.pageAction.show(id);
      }
    });
  }, { url: [{ urlMatches: 'google.com' }] });
});

chrome.runtime.onInstalled.addListener(function (object) {
  chrome.tabs.create({url: chrome.runtime.getURL('index.html')});
  fillStorage();
  // if(object.reason === 'install') { // todo - use reason install only
  //
  // }
  // chrome.tabs.create({url: "http://yoursite.com/"}, function (tab) {
  //   console.log("New tab launched with http://yoursite.com/");
  // });
});

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//   if (tabs[0].id) {
//     chrome.tabs.sendMessage(tabs[0].id, {hello: 'world'}, function(response) {});
//   }
// });

function fillStorage() {
  storageService.getItems([storageKeys.LIKE_CATS, storageKeys.LIKE_DOGS]).then(function(data) {
    if (!data || typeof data[storageKeys.LIKE_CATS] !== 'boolean') {
      storageService.setItems({[storageKeys.LIKE_CATS]: false}).then();
    }
    if (!data || typeof data[storageKeys.LIKE_DOGS] !== 'boolean') {
      storageService.setItems({[storageKeys.LIKE_DOGS]: false}).then();
    }
  });
}
