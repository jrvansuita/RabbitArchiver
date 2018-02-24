// content.js
console.log(chrome.runtime.getManifest().name + ' loaded.');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "rabbit_clicked") {
      run();
    }
  }
);