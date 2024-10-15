// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (role) => {
    console.log(`${role} joined the call`);
  });

  socket.on('call', (role) => {
    socket.broadcast.emit('call'); // Notify the admin when the donor initiates a call
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
