/*jshint esversion: 6 */
/*  Handle the Facebook Messenger Inbox Mess when you plug a Chat Bot into it. */

var pageName;

function run() {
  pageName = $(sel.page_name).val();
  accessInbox();
  startManaging();
}

/* Go to the inbox if you're not */
function accessInbox() {
  msgStart();

  //if ($(sel.inbox).text() !== 'Caixa de Entrada') {
  $(sel.inbox_combo).click();
  $(sel.inbox_combo_item).click();
  //}
}

var chatItems;
var index;

/* Capture the chat items as array object and define the current index
This function starts the process */
function startManaging() {
  chatItems = $(sel.chat_items);
  index = chatItems.length;
  handleChats();
}

function handleChats() {
  index--;

  if (index >= 0) {

    if (tryMarkAsDoneChatItem()) {
      later(sel.delay).then(() => {
        handleChats();
      });
    } else {
      chatItems[index].click();
      checkOpenChat(500);
    }

  } else {
    if (chatItems.length > 0) {
      startManaging();
    } else {
      //No more messages is showing
      msgFinished();

      var wait = 30000;
      msgTryAgain(wait);

      //Wait some time to search for new messages
      later(wait).then(() => {

        //Now, if we find any messages, we continue, if not, the process is stopped.
        if ($(sel.chat_items).length > 0) {
          msgProceedProcess();
          startManaging();
        } else {
          msgNoMoreMessages();
        }
      });
    }
  }
}


/* If we can determine that the page was the last one who spoke,
we can mark as done on the chat item instead of opening it to check */
function tryMarkAsDoneChatItem() {
  var current = $(chatItems[index]);
  var preview = current.find(sel.preview_last_msg);

  //First look out for the paper clips
  var done = preview.find(sel.paper_clips).length > 0;

  //If we didn't find the paper clips...
  if (!done) {
    //Remove the preview message from html element.
    current.find(sel.preview_last_msg + '>span>span').empty();
    //And check if it contains something like You: ... or Page Name: ...
    done = preview.text().length > 0 && preview.text().contains(':');
  }

  if (done) {
    //Fine! Your page sent the last message, we can mark this conversation as done.
    markAsDoneOnChatList();
    return true;
  }

  return false;
}


//Mark as done the current message
function markAsDoneOnChatList() {
  msgDone(pageName);
  $(chatItems[index]).find(sel.done_item).click();
}


/* Check the last person who spoke on the current opened conversation and apply
the criteria to mark as done or as spam */
function checkOpenChat(delay) {
  //We can't wait to much time to analyze and process one single conversation. Time is money
  //Wait 10 sec max
  if (delay > 10000) {
    markAsDoneOnChatList();
  } else {
    //As we don't have a load callback to track when the conversation is loaded
    //We have to check when it's ready to us time to time.
    later(delay).then(() => {

      //If we can't access the last one who sent a message, means the conversation didn't load yet.
      if ($(sel.last_spoke).length === 0) {
        //Try it again, now add more 500 ms
        checkOpenChat(delay + 500);
      } else {
        var whoSentTheLastMessage = $(sel.last_spoke).last().text().trim();

        //Check if the last message sent was by the person who we are chatting with
        if ($(sel.name).text().contains(whoSentTheLastMessage)) {
          //Ok, later we need to access the spam folder to reply this message
          $(sel.spam).first().click();
          msgSpam(whoSentTheLastMessage);
        } else {
          //Don't worry, this message already was responded
          $(sel.done).click();
          msgDone(whoSentTheLastMessage);
        }

        //Go to the next message
        handleChats();
      }

    }).catch((e) => {
      console.log(e);
    });
  }
}