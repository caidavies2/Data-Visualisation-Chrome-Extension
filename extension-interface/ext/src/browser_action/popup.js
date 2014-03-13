// console.log(background);
// background.transfer;

$(document).ready(function(){

    backgroundCai = chrome.extension.getBackgroundPage().caiScoreTally;
    backgroundChris = chrome.extension.getBackgroundPage().chrisScoreTally;
    backgroundAaron = chrome.extension.getBackgroundPage().aaronScoreTally;

    if(typeof backgroundCai == "undefined")
    {
      backgroundCai = "0";
      $('#cai .score').text("--");
    }
    else if (typeof backgroundChris == "undefined")
    {
      backgroundChris = "0";
      $('#chris .score').text("--");
    }
    else if (typeof backgroundAaron == "undefined")
    {
      backgroundAaron = "0";
      $('#aaron .score').text("--");
    }


    backgroundCai = backgroundCai.substr(0,7);
    backgroundChris = backgroundChris.substr(0,7);
    backgroundAaron = backgroundAaron.substr(0,7);

    $('#cai .score').text(backgroundCai);
    $('#chris .score').text(backgroundChris);
    $('#aaron .score').text(backgroundAaron);

});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("score: " + message.greeting);
    console.log("player: " + message.player);
    //
    // switch (message.player)
    // {
    // case "cai":
    //   $('#cai .score').text(message.greeting);
    //   break;
    // }
});
