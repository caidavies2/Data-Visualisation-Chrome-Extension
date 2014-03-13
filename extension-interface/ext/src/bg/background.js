
// MQTT for leaderboard
var caiScoreTally,aaronScoreTally,chrisScoreTally

var client = new Messaging.Client("box.bento.is", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {

  //connection attempt timeout in seconds
  timeout: 3,

  //Gets Called if the connection has successfully been established
  onSuccess: function () {
    console.log("Connected");
    client.subscribe("cai_final_score");
    client.subscribe("evans_final_score");
    client.subscribe("aaron_final_score");
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
  // chrome.browserAction.setBadgeText({text: nOnline});
}

  //   Functions
  function updateLeaderboard(topic, score)
  {
    switch (topic)
    {
    case "cai_final_score":
      // chrome.runtime.sendMessage({player: 'cai', greeting: score});
      caiScoreTally = score;
      console.log(score);
      break;

    case "evans_final_score":
      chrome.runtime.sendMessage({greeting: score});
      break;

    case "aaron_final_score":
      chrome.runtime.sendMessage({greeting: score});
      break;

    default:
      return false;
    }
  }
