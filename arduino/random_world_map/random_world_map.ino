#include <Servo.h> 
 
 
Servo myservo; 

void setup() { 
  myservo.attach(2); 
} 

void loop() {
  myservo.write(0);
  delay(random(30000,100000));
  myservo.write(180);
  delay(2000);
}
