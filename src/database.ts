import { BulkWriteOptions, Db, MongoClient } from "mongodb";
import { Player } from "./types";

/**
 * Provides a connection to 
 */
export class DataBase {
    currentRoom: string;
    client: MongoClient;
    databaseName: string;

    constructor (endpoint: string, databaseName: string, room: string) {
        this.currentRoom = room;
        this.databaseName = databaseName;
        this.client = new MongoClient(endpoint);
    }

    /**
     * Add a new round of scores to the current room
     * @param scores A list of player objects containing the new scores
     */
    addScores = async (scores: Player[]) => {
        try {
            await this.client.connect();
            const db = this.client.db(this.databaseName);

            const result = await db.collection(this.currentRoom).insertMany(scores);
            console.log("\nInserted new document:");
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            await this.client.close();
        }
    }

    /**
     * Retrieve a list of current rooms in the database
     */
    listRooms = async () => {
        try {
            await this.client.connect();
            const db = this.client.db(this.databaseName);

            const result = await db.collections();
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            await this.client.close();
        }
    }

    /**
     * Delete a room and all its data from the database
     * @param room The name of the room to delete
     * @returns True if the room was deleted successfully
     */
    deleteRoom = async (room: string): Promise<boolean> => {
        let result = false;

        try {
            await this.client.connect();
            const db = this.client.db(this.databaseName);

            result = await db.dropCollection(room);
            console.log(`Deleted room: ${room}`);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            this.client.close();
            return result;
        }
    }

    /**
     * Switch to a different target room
     * @param room The new room to modify
     * @returns 
     */
    setRoom = (room: string) => this.currentRoom = room;
}
