#include <WiFi.h>
#include <ESPAsyncWebServer.h>

// WiFi credentials
const char* ssid = "NONU1995";  // Change to your WiFi SSID
const char* password = "12345678";  // Change to your WiFi password

// HC-SR04 Pins
#define TRIG_PIN 12
#define ECHO_PIN 16

// Create AsyncWebServer instance on port 80
AsyncWebServer server(80);

// Function to measure distance
long getDistance() {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);
    
    long duration = pulseIn(ECHO_PIN, HIGH);
    long distance = duration * 0.034 / 2; // Convert to cm
    
    return distance;
}

// HTML for Web Page
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
    <title>ESP32 Ultrasonic Sensor</title>
    <meta http-equiv="refresh" content="2">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        h1 { color: #333; }
        .distance { font-size: 2em; font-weight: bold; color: #0275d8; }
    </style>
</head>
<body>
    <h1>ESP32 Ultrasonic Distance Sensor</h1>
    <p>Distance: <span class="distance">%DISTANCE% cm</span></p>
</body>
</html>
)rawliteral";

// Function to process placeholders
String processor(const String& var) {
    if (var == "DISTANCE") {
        return String(getDistance());
    }
    return String();
}

void setup() {
    Serial.begin(115200);
    
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    
    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nConnected to WiFi!");
    Serial.println(WiFi.localIP());

    // Serve the web page
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send_P(200, "text/html", index_html, processor);
    });

    server.begin();
}

void loop() {
    // Nothing needed here, AsyncWebServer handles requests automatically
}