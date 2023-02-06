import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import * as http from "http";
import { SocketEvents } from "./SocketEvents";
import { DataBase } from "./database";
import { Player } from "./types";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";

dotenv.config();
const port = process.env.PORT || 3001;
const endpoint = process.env.DB_ENDPOINT || "mongodb://localhost:27017";
const databaseName = process.env.DB_NAME || "greggory";

// Setup Node.js express server
const app: Express = express();
app.use(express.json());
app.use(cors());

// Setup socket.io server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Handle socket.io connections
io.on(SocketEvents.connection, (socket: Socket) => {
    console.log("A user has connected!");

    // Setup database connections
    console.log(`Attempting to connect to ${endpoint}...`);
    const database = new DataBase(endpoint, databaseName, uuid());
    console.log("Connected to database!");

    socket.on(SocketEvents.joinRoom, (room: string) => {
        // Leave the previous room
        socket.leave(database.currentRoom);

        console.log(`User wishes to join room: ${room}`);

        socket.join(room);
        database.setRoom(room);
    });

    socket.on(SocketEvents.update, () => {
        database.listRooms();
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
