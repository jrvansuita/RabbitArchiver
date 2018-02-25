function msgAppLoaded() {
  console.log(chrome.runtime.getManifest().name + ' loaded.');
}

function msgStart() {
  console.log('Starting process...');
}

function msgFinished() {
  console.log('Everything done!');
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