// console.log(background);
// background.transfer;

var background;

setInterval(function(){
console.log(background);
}, 2000);

$(document).ready(function(){
    background = chrome.extension.getBackgroundPage().caiScoreTally;
    console.log(background);
    $('#cai .score').text(background);

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
