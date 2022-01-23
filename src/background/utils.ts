import {storageKeys} from "../common/consts";
import {StorageService} from "../common/storage.service";
import Tab = chrome.tabs.Tab;

const storageService = StorageService.getInstance();

export function fillStorage() {
  storageService.getItems([
    storageKeys.LIKE_CATS,
    storageKeys.LIKE_DOGS,
    storageKeys.EXTENSION_ENABLED
  ]).then(function(data) {
    if (!data || typeof data[storageKeys.LIKE_CATS] !== 'boolean') {
      storageService.setItems({[storageKeys.LIKE_CATS]: false});
    }
    if (!data || typeof data[storageKeys.LIKE_DOGS] !== 'boolean') {
      storageService.setItems({[storageKeys.LIKE_DOGS]: false});
    }
    if (!data || typeof data[storageKeys.EXTENSION_ENABLED] !== 'boolean') {
      storageService.setItems({[storageKeys.EXTENSION_ENABLED]: true});
    }
  });
}

export function getAllTabs(): Promise<Tab[]> {
  return new Promise<Tab[]>(function(resolve) {
    chrome.tabs.query({}, function(tabs) {
      resolve(tabs);
    });
  });
}
