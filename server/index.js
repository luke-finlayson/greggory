const express = require("express");
const { Database } = require("./database");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

// Setup the Node.js server
const app = express();
app.use(cors());
const server = http.createServer(app);

// Create the socket.io handler
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Create the database handler
const db = new Database();

// Handle connections from new clients, setting up various listeners
io.on("connection", (socket) => {
    console.log("A user has connected");

    // WIP: Send a list of available rooms back to the client
    socket.on("get_rooms", (callback) => {
        db.getCollections()
            .toArray((err, res) => {
                if (err) throw err;

                console.log(res);

                callback("Success");
            });
    });

    // Close database connection when client disconnects
    socket.on("disconnect", () => {
        console.log("A user has disconnected");

        db.close();
    });
});

// Start listening for socket connections on the given port
server.listen(3001, () => {
    console.log("Server listening on port 3001");
});