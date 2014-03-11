// Stick stuff in here for loading after an individual page

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
            client.subscribe("saligia/arduino-wrath", {qos: 0});

						if(host == "www.facebook.com"){
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

						if(host == "www.youtube.com"){
							var watchcount = $( "span.watch-view-count" ).html();
							publish(watchcount,'saligia/arduino-wrath', 0);
						}

						if(host == "www.google.co.uk"){
							window.onhashchange = function(){
								publish('google:one search','saligia/arduino-wrath', 0);
							}
						}

						if(host == "uk.search.yahoo.com"){
							publish('yahoo:one search','saligia/arduino-wrath', 0);
						}

						if(host == "en.wikipedia.org"){
							publish('wikipedia:one page','saligia/arduino-wrath', 0);
						}

						if(host == "uk.linkedin.com"){
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
         },

         //Gets Called if the connection could not be established
         onFailure: function (message) {
            console.log("Connection failed: " + message.errorMessage);
         }

     };
     client.connect(options);


     var publish = function (payload, topic, qos) {
        var message = new Messaging.Message(payload);
        message.destinationName = topic;
        message.qos = qos;
        client.send(message);
     }






// if(host == "www.facebook.com"){
// 	alert(url);

// 	var i=0;
// 	var timer=setInterval(function(){i++; console.log(i);},1000);
// 	publish('loginsuccess','saligia/arduino-wrath', 0);

// }

// if(host == "www.youtube.com"){
// 	//console.log(document.getElementById('thisDiv').textContent);
// 	var watchcount = $( "span.watch-view-count" ).html();
// 	console.log(watchcount);
// }

// if(host == "www.google.co.uk"){
// 	window.onhashchange = function(){
//     	alert('ahoy');
// 	}
// }

// if(host == "uk.search.yahoo.com"){
// 	alert('yo');
// }

// if(host == "en.wikipedia.org"){
// 	alert('nah');
// }

// if(host == "uk.linkedin.com"){
// 	alert(url);

// 	var u=0;
// 	var timer2=setInterval(function(){u++; console.log(u);},1000);

// }

// if(host == "twitter.com"){

// 	if($("tweet-form").hasClass("tweeting")){
// 		alert("hello world");
// 	}
// }
//tweet-form

