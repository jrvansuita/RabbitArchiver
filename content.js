// content.js
msgAppLoaded();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "rabbit_clicked") {
      run();
    }
  }
);