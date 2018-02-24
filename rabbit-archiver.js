/*jshint esversion: 6 */
/*  Handle the Facebook Messenger Inbox Mess when you plug a Chat Bot into it. */

function run() {
  accessInbox();
  startManaging();
}

function accessInbox() {
  console.log('Starting process...');
  if ($(sel.inbox).text() !== 'Caixa de Entrada') {
    $(sel.inbox_combo).click();
    $(sel.inbox_combo_item).click();
  }
}

var chatItems;
var index;

function startManaging() {
  chatItems = $(sel.chat_items);
  index = chatItems.length;
  console.log(chatItems.length + ' chats loaded.');

  handleChats();
}

function handleChats() {
  index--;

  if (index >= 0) {
    chatItems[index].click();
    checkLastPersonSpoke(500);
  } else if (chatItems.length > 0) {
    startManaging();
  }
}

function checkLastPersonSpoke(delay) {
  var time = delay + 500;

  later(time).then(() => {

    if ($(sel.last_spoke).length === 0) {
      checkLastPersonSpoke(time);
    } else {

      console.log("Last one to speak was " + $(sel.last_spoke).last().text());
      console.log($(sel.name).text());

      if ($(sel.name).text().contains($(sel.last_spoke).last().text().trim())) {
        $(sel.spam).first().click();
        console.log("Spam clicked");
      } else {
        $(sel.done).click();
        console.log("Done clicked");
      }

      handleChats();
    }

  }).catch((e) => {
    console.log(e);
  });
}