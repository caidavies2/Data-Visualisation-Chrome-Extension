// Stick stuff in here for loading after an individual page
var host = window.location.host;
var url = window.location.href;
var hash = window.location.hash;
var url, previousURL;
var tweeted = false;
var client = new Messaging.Client("box.bento.is", 8080, "myclientid_" + parseInt(Math.random() * 100, 10));

var options = {

  //connection attempt timeout in seconds
  timeout: 3,

  //Gets Called if the connection has successfully been established
  onSuccess: function () {
    console.log("Connected");
    client.subscribe("cai", {qos: 0});
      url = host;
      checkHost(host, url);
      previousURL = url;
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

function checkHost(hostCheck, urlCheck)
{

  console.log('checking host');

  if(hostCheck == "www.google.co.uk")
  {
    googleRun();
  }
  else if(urlCheck.indexOf("search?q=") != -1)
  {
    googleRun();
  }

  switch (hostCheck)
  {

  case "www.facebook.com":
    facebookRun();
    console.log('facebook');
    break;

  case "www.youtube.com":
    youtubeRun();
    break;

  case "uk.search.yahoo.com":
    yahooRun();
    break;

  case "en.wikipedia.org":
    wikipediaRun();
    break;

  case "uk.linkedin.com":
  case "www.linkedin.com":
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
      publish('0.54','cai', 0);
      i = 0;
    }
  },1000);
}

function youtubeRun()
{
  publish("9.45",'cai', 0);
}

function googleRun(){
  // window.onhashchange = function(){
    publish("7",'cai', 0);
  // }
}

function yahooRun()
{
  publish("1.27",'cai', 0);
}

function wikipediaRun()
{
  publish("0.024",'cai', 0);
}

function linkedinRun()
{
  var u=0;
  var timer=setInterval(function(){
    u++;
    console.log(u);

    if( u == 60 ){
      publish("0.16",'cai', 0);
      u = 0;
    }
  },1000);
}

function twitterRun()
{

  if(!tweeted)
  {
      $('.primary-btn').click(function(){
        publish("0.02",'cai', 0);
      });
}
}
