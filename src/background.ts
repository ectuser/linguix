chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' });

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
  // if(object.reason === 'install') { // todo - use reason install only
  //
  // }
  // chrome.tabs.create({url: "http://yoursite.com/"}, function (tab) {
  //   console.log("New tab launched with http://yoursite.com/");
  // });
});
