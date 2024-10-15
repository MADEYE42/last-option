const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Event listener for donation requests
    socket.on('donation-request', (donationDetails) => {
        console.log('Donation request received:', donationDetails);
        // Notify admin about the new donation request
        io.emit('notify-admin', { message: 'New donation request received!' });
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
