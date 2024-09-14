const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for location data from the client
    socket.on('send-location', (data) => {
        console.log('Location received:', data);

        // Optionally broadcast the location to all clients
        socket.broadcast.emit('receive-location', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
