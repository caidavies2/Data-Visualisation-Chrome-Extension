chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("score: " + message.greeting);
    console.log("player: " + message.player);

    switch (message.player)
    {
    case "cai":
      $('#cai .score').text(message.greeting);
      break;
    }


});
