#include <Servo.h> 
#include <SoftwareSerial.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <Ethernet.h>

EthernetClient ethClient;

byte mac[] = { 0xC4, 0x2C, 0x03, 0x04, 0x96, 0xDE };

char server[] = "box.bento.is";
int port = 80;
char subscribedChannel[] = "301/chris-servo";
char deviceName[] = "chris301";

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
      myservo.write(0);
      delay(5000);
    } 
  }
}

PubSubClient client(server, port, callback, ethClient);

void connectToBroker(){
  //connect to the broker
  if (client.connect(deviceName)) {
    Serial.println("Connecting");
    //send a test message
    client.publish("301/chris-servo","Chris Servo Ready");
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
  Serial.println("Hello World");
  myservo.attach(2); 
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    for(;;)
      ;
  }
} 


void loop() {                               
  myservo.write(180);
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


