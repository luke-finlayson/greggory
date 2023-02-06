"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http = __importStar(require("http"));
const SocketEvents_1 = require("./SocketEvents");
const database_1 = require("./database");
const uuid_1 = require("uuid");
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const endpoint = process.env.DB_ENDPOINT || "mongodb://localhost:27017";
const databaseName = process.env.DB_NAME || "greggory";
// Setup Node.js express server
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Setup socket.io server
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
// Handle socket.io connections
io.on(SocketEvents_1.SocketEvents.connection, (socket) => {
    console.log("A user has connected!");
    // Setup database connections
    console.log(`Attempting to connect to ${endpoint}...`);
    const database = new database_1.DataBase(endpoint, databaseName, (0, uuid_1.v4)());
    console.log("Connected to database!");
    socket.on(SocketEvents_1.SocketEvents.joinRoom, (room, callback) => {
        // Leave the previous room
        socket.leave(database.currentRoom);
        console.log(`User wishes to join room: ${room}`);
        socket.join(room);
        database.setRoom(room);
    });
    socket.on(SocketEvents_1.SocketEvents.update, () => {
        database.listRooms();
    });
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
