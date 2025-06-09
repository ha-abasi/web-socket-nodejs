import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('Hello, I am the server and I received your message: ' + message);

    // We can broadcast the message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send("somebody said: " + message);
      }
    });

  });

  ws.send('Connection established');
});

console.log('WebSocket server is running on port 8080');
