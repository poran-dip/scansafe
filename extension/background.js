// background.js — MV3 service worker

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "GET_CURRENT_TAB_URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";
      sendResponse({ url });
    });
    return true; // keep channel open for async sendResponse
  }
});
