"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
const mongodb_1 = require("mongodb");
/**
 * Provides a connection to
 */
class DataBase {
    constructor(endpoint, databaseName, room) {
        /**
         * Add a new round of scores to the current room
         * @param scores A list of player objects containing the new scores
         */
        this.addScores = (scores) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const db = this.client.db(this.databaseName);
                const result = yield db.collection(this.currentRoom).insertMany(scores);
                console.log("\nInserted new document:");
                console.log(result);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield this.client.close();
            }
        });
        /**
         * Retrieve a list of current rooms in the database
         */
        this.listRooms = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const db = this.client.db(this.databaseName);
                const result = yield db.collections();
                console.log(result);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield this.client.close();
            }
        });
        /**
         * Delete a room and all its data from the database
         * @param room The name of the room to delete
         * @returns True if the room was deleted successfully
         */
        this.deleteRoom = (room) => __awaiter(this, void 0, void 0, function* () {
            let result = false;
            try {
                yield this.client.connect();
                const db = this.client.db(this.databaseName);
                result = yield db.dropCollection(room);
                console.log(`Deleted room: ${room}`);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                this.client.close();
                return result;
            }
        });
        /**
         * Switch to a different target room
         * @param room The new room to modify
         * @returns
         */
        this.setRoom = (room) => this.currentRoom = room;
        this.currentRoom = room;
        this.databaseName = databaseName;
        this.client = new mongodb_1.MongoClient(endpoint);
    }
}
exports.DataBase = DataBase;
