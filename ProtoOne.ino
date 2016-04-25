#include <Servo.h>
Servo leftFrontMotor;
Servo leftBackMotor;
Servo rightFrontMotor;
Servo rightBackMotor;
void setup() {
  leftFrontMotor.attach(5);  // blue
  leftBackMotor.attach(6);   // orange
  rightFrontMotor.attach(9); // yellow
  rightBackMotor.attach(10); // black
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read();
    if (command == 'a') {
      Serial.println("a");
    }
    else if (command == 17) {
      waitUntilAvailable();
      if (Serial.read() == 19) {
        waitUntilAvailable();
        if (Serial.read() == 18) {
          Serial.println("forward");
          setMotors(0, 180);
        }
      }
    }
    else if (command == 21) {
      waitUntilAvailable();
      if (Serial.read() == 20) {
        waitUntilAvailable();
        if (Serial.read() == 6) {
          Serial.println("left point turn");
          setMotors(180, 180);
        }
      }
    }
    else if (command == 7) {
      waitUntilAvailable();
      if (Serial.read() == 26) {
        waitUntilAvailable();
        if (Serial.read() == 7) {
          Serial.println("backward");
          setMotors(180, 0);
        }
      }
    }
    else if (command == 14) {
      waitUntilAvailable();
      if (Serial.read() == 15) {
        waitUntilAvailable();
        if (Serial.read() == 24) {
          Serial.println("right point turn");
          setMotors(0, 0);
        }
      }
    }
    else if (command == 23) {
      waitUntilAvailable();
      if (Serial.read() == 25) {
        waitUntilAvailable();
        if (Serial.read() == 2) {
          Serial.println("left swing turn");
          setMotors(93, 180);
        }
      }
    }
    else if (command == 1) {
      waitUntilAvailable();
      if (Serial.read() == 22) {
        waitUntilAvailable();
        if (Serial.read() == 5) {
          Serial.println("right swing turn");
          setMotors(0, 93);
        }
      }
    }
    else if (command == 30) {
      waitUntilAvailable();
      if (Serial.read() == 28) {
        waitUntilAvailable();
        if (Serial.read() == 29) {
          Serial.println("stop");
          setMotors(93, 93);
        }
      }
    }
  }
}

void setMotors(int left, int right) {
  leftFrontMotor.write(left);
  leftBackMotor.write(left);
  rightFrontMotor.write(right);
  rightBackMotor.write(right);
}

void waitUntilAvailable() {
  while(Serial.available() == 0) {
    delay(1);
  }
}
