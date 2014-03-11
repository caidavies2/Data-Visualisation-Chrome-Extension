//Constantly running in background
var online, youtubeURL;

online = true;

var client = new Messaging.Client("box.bento.is", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {

	//connection attempt timeout in seconds
	timeout: 3,

	//Gets Called if the connection has successfully been established
	onSuccess: function () {
		console.log("Connected");
		// client.subscribe("saligia/arduino-wrath", {qos: 0});
		checkHost(host);
	},

	//Gets Called if the connection could not be established
	onFailure: function (message) {
		console.log("Connection failed: " + message.errorMessage);
		client.connect(options);
	}

};
client.connect(options);


var publish = function (payload, topic, qos) {
	var message = new Messaging.Message(payload);
	message.destinationName = topic;
	message.qos = qos;
	client.send(message);
}

chrome.windows.onCreated.addListener(function(){
	console.log('hello, i am online');
});

chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
	var url = tab.url;
	if (url !== undefined && changeinfo.status == "complete") {
    sendUrl(url);
	}
});
function sendUrl(messageURL)
{
  // chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  //     sendResponse({type:messageURL});
  // });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: messageURL}, function(response) {
    console.log(response.farewell);
  });
});


}
