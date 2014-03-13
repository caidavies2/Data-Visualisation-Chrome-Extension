
// MQTT for leaderboard

var client = new Messaging.Client("box.bento.is", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {

  //connection attempt timeout in seconds
  timeout: 3,

  //Gets Called if the connection has successfully been established
  onSuccess: function () {
    console.log("Connected");
    client.subscribe("cai-score");
    client.subscribe("chris-score");
    client.subscribe("aaron-score");
  },


  //Gets Called if the connection could not be established
  onFailure: function (message) {
    console.log("Connection failed: " + message.errorMessage);
    client.connect(options);
  }

};
client.connect(options);


  client.onMessageArrived = function (message) {
    updateLeaderboard(message.destinationName, message.payloadString);
  }


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

//   Functions
function updateLeaderboard(topic, score)
{
   switch (topic)
   {

     case "cai-score":
     $('#cai .score').text(score);
     console.log(score);
     break;

     case "chris-score":
     $('#chris .score').text(score);
     console.log('score logged');
     break;

     case "aaron-score":
     $('#aaron .score').text(score);
     console.log('score logged');
     break;

     default:
       return false;
   }
}
