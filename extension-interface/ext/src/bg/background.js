
// Set Badge Icon
chrome.browserAction.setBadgeBackgroundColor({color: "#000"});

var i = 1;

setInterval(function(){
    i = i.toString();
    updateBadge(i);
    i++
}, 1000);

function updateBadge(nOnline)
{
  chrome.browserAction.setBadgeText({text: nOnline});
}

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
