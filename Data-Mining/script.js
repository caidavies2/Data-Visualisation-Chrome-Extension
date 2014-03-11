// Individual page load

// chrome.extension.sendMessage({text:"getStuff"},function(reponse){
//   //This is where the stuff you want from the background page will be
//     // console.log(response);
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.greeting);
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

var host = window.location.host;
var url = window.location.href;
var hash = window.location.hash;

var client = new Messaging.Client("box.bento.is", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {

  //connection attempt timeout in seconds
  timeout: 3,

  //Gets Called if the connection has successfully been established
  onSuccess: function () {
    console.log("Connected");
    client.subscribe("301/cai", {qos: 0});
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

function checkHost(hostCheck)
{

  console.log('checking host');

  switch (hostCheck)
  {

  case "www.facebook.com":
    facebookRun();
    console.log('facebook');
    break;

  case "www.youtube.com":
    youtubeRun();
    break;

  case "www.google.co.uk":
    googleRun();
    break;

  case "uk.search.yahoo.com":
    yahooRun();
    break;

  case "en.wikipedia.org":
    wikipediaRun();
    break;

  case "uk.linkedin.com":
    linkedinRun();
    break;

  case "twitter.com":
    twitterRun();
    break;
  }

}

function facebookRun()
{
  var i=0;
  var timer=setInterval(function(){
    i++;
    console.log(i);

    if( i == 60 ){
      publish('facebook:one minute','301/cai', 0);
      i = 0;
    }
  },1000);
}

function youtubeRun()
{
  console.log('hello youtube');
  var watchcount = $( "span.watch-view-count" ).html();
  publish(watchcount,'301/cai', 0);
}

function googleRun(){
  window.onhashchange = function(){
    publish('google:one search','301/cai', 0);
  }
}

function yahooRun()
{
  publish('yahoo:one search','301/cai', 0);
}

function wikipediaRun()
{
  publish('wikipedia:one page','301/cai', 0);
}

function linkedinRun()
{
  var u=0;
  var timer=setInterval(function(){
    u++;
    console.log(u);

    if( u == 60 ){
      publish('linkedin:one minute','301/cai', 0);
      u = 0;
    }
  },1000);
}

function twitterRun()
{
      $('.primary-btn').click(function(){
        publish('tweeted','301/cai', 0);
      });
}
