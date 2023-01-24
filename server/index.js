const express = require("express");
const { Database } = require("./database");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const db = new Database();

io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on('add_score', (score) => {
        console.log("Score added: " + score);
    });
});

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});