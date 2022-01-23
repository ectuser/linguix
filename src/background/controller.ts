import {getAllTabs} from "./utils";

export function reloadAllTabs(): void {
  getAllTabs().then((tabs) => {
    tabs.forEach((tab) => {
      if (tab?.id !== undefined) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
}
