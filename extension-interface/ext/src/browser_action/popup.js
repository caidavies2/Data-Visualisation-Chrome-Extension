// console.log(background);
// background.transfer;

var background;

setInterval(function(){
console.log(background);
}, 2000);

$(document).ready(function(){
    backgroundCai = chrome.extension.getBackgroundPage().caiScoreTally;
    backgroundChris = chrome.extension.getBackgroundPage().chrisScoreTally;
    backgroundAaron = chrome.extension.getBackgroundPage().aaronScoreTally;
    console.log(background);
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
