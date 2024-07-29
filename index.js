const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send notification every 3 seconds
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message: "Notification" }));
    }
  }, 3000);

  ws.on("message", (message) => {
    console.log("Received message:", message);
    // You can add additional logic here to handle the received message
  });

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Handle root request
app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

module.exports = server;
