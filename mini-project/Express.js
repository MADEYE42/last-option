const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update this to match your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Event listener for donation requests
    socket.on('donation-request', (donationDetails) => {
        console.log('Donation request received:', donationDetails);
        // Notify admin about the new donation request
        io.emit('notify-admin', { type: 'donation', message: 'New donation request received!' });
        console.log('Emitted donation notification to all clients');
    });

    // Event listener for video call notifications
    socket.on('notify-admin', (roomID) => {
        console.log('Received notify-admin event with room ID:', roomID);
        io.emit('notify-admin', { type: 'call', message: 'Incoming video call', roomID: roomID });
        console.log('Emitted video call notification to all clients');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});