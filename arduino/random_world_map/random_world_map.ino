#include <Servo.h> 
 
 
Servo myservo; 

void setup() { 
  myservo.attach(2); 
} 

void loop() {
  myservo.write(180);
  delay(random(30000,100000));
  myservo.write(0);
  delay(2000);
}
