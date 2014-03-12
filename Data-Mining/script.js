// Stick stuff in here for loading after an individual page



var host = window.location.host;
var url = window.location.href;
var hash = window.location.hash;
var tweeted = false;

var client = new Messaging.Client("box.bento.is", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {

  //connection attempt timeout in seconds
  timeout: 3,

  //Gets Called if the connection has successfully been established
  onSuccess: function () {
    console.log("Connected");
    client.subscribe("saligia/arduino-wrath", {qos: 0});
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
      publish('facebook:one minute','saligia/arduino-wrath', 0);
      i = 0;
    }
  },1000);
}

function youtubeRun()
{
  var watchcount = $( "span.watch-view-count" ).html();
  publish(watchcount,'saligia/arduino-wrath', 0);
}

function googleRun(){
  window.onhashchange = function(){
    publish('google:one search','saligia/arduino-wrath', 0);
  }
}

function yahooRun()
{
  publish('yahoo:one search','saligia/arduino-wrath', 0);
}

function wikipediaRun()
{
  publish('wikipedia:one page','saligia/arduino-wrath', 0);
}

function linkedinRun()
{
  var u=0;
  var timer=setInterval(function(){
    u++;
    console.log(u);

    if( u == 60 ){
      publish('linkedin:one minute','saligia/arduino-wrath', 0);
      u = 0;
    }
  },1000);
}

function twitterRun()
{

  if(!tweeted)
  {
      // if($(".tweet-form").hasClass("tweeting")){
      //   console.log("Tweeting");
      //   tweeted = !tweeted;
      //   console.log(tweeted);
      //   // break;
      // }

      $('.primary-btn').click(function(){
        publish('tweeted','saligia/arduino-wrath', 0);
      });
}
}
