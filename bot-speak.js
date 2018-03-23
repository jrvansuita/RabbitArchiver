function msgAppLoaded() {
  speak(chrome.runtime.getManifest().name + ' loaded.');
}

function msgAborted() {
  speak('Process aborted.');
}

function msgTryAgain(delay) {
  speak('Waiting ' + delay + 'ms to load more chats...');
}

function msgProceedProcess() {
  speak('Proceed process...');
}

function msgStart() {
  speak('Starting process...');
}

function msgFinished() {
  speak('Everything done!');
}

function msgNoMoreMessages() {
  speak('No more messages! Shutting down.');
}

function msgSpam(name) {
  confirmation(name, false);
}

function msgDone(name) {
  confirmation(name, true);
}

function confirmation(name, done) {
  speak((done ? "Done - " : "Spam - ") + name + " sent the last message.");
}


function getTime() {
  return new Date().toLocaleTimeString("pt-BR").slice(0, 5);
}

function speak(msg) {
  console.log('[' + getTime() + '] ' + msg);
}