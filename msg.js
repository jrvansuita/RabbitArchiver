function msgAppLoaded() {
  console.log(chrome.runtime.getManifest().name + ' loaded.');
}


function msgTryAgain(delay) {
  console.log('Waiting ' + delay + 'ms to load more chats...');
}

function msgProceedProcess() {
  console.log('Proceed process...');
}

function msgStart() {
  console.log('Starting process...');
}

function msgFinished() {
  console.log('Everything done!');
}

function msgNoMoreMessages() {
  console.log('No more messages! Shutting down.');
}

function msgSpam(name) {
  confirmation(name, false);
}

function msgDone(name) {
  confirmation(name, true);
}

function confirmation(name, done) {
  console.log((done ? "Done: " : "Spam: ") + name + " sent the last message.");
}