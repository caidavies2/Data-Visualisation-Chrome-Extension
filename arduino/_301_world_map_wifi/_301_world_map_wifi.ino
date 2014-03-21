#include <Servo.h> 
#include <SoftwareSerial.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <WiFly.h>


char server[] = "box.bento.is";
int port = 80;
char subscribedChannel[] = "chris-servo";
char deviceName[] = "chrisServo";

Servo myservo; 

String payloadString;
void convertPayload(byte array[], byte len){
  payloadString = "";
  for (byte i = 0; i < len;){
    char c = array[i++];
    if (c < 0x20 || c > 0x7e){
      Serial.print('.');
      payloadString += '.';
    }
    else {
      payloadString += char(c);
    }
  }
}
//triggered when a message is recieved on a subscribed channel
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.println("Message Recieved");
  // handle message
  //check the topic - use this is you want to sunbscribe to more than one channel
  if (String(topic) == String(subscribedChannel)){
    Serial.println(topic);
    //convert the payload to a string, then print it out
    convertPayload(payload, length);
    Serial.println(payloadString);
    if(payloadString == "servoOn"){
      myservo.write(180);
      delay(5000);
    } 
  }
}

WiFlyClient wifiClient;
PubSubClient client(server, port, callback, wifiClient);

void connectToBroker(){
  //connect to the broker
  if (client.connect(deviceName)) {
    Serial.println("Connecting");
    //send a test message
    client.publish(subscribedChannel,"Chris Servo Ready");
    //subscribe to a channel
    client.subscribe(subscribedChannel);
    Serial.println("Connected");
  } 
  else{
    Serial.println("Connection Error");
  }
}
//end broker set up

void setup() { 
  Serial.begin(9600);
  Serial.println("Starting...");
  myservo.attach(2);  // 2 for Uno | 22 for Mega
  WiFly.begin();
  if (!WiFly.join("cai", "cai123456")) {
      Serial.println("Association failed.");
      while (1) {
        // Hang on failure.
       }
   } else {
      Serial.println("Joining");
      Serial.println(WiFly.ip());
   }
}



void loop() {                               
  myservo.write(0);
  checkBroker();
  delay(1000);
} 


void checkBroker() {
  if(!client.connected()){
    Serial.println("Disconnected");
    connectToBroker();
  } 
  else{
    client.loop();  
  } 
  delay(50);
}


