chrome.runtime.onInstalled.addListener(function () {
    // Any initialization code can go here
  });
  
  chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, { action: 'translate' });
  });
  