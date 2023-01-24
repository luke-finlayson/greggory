const { MongoClient } = require("mongodb");
const { v4 } = require("uuid");

/**
 * Provides a connection to a MongoDB database, along with several helper functions
 */
class Database {
    /**
     * Create a connection to the greggory mongodb database
     * @param {string} name
     */
    constructor (name) {
        // Create a new database using the given name
        this.name = name ? name : v4();
        
        // Connect to the database
        MongoClient.connect("mongodb://localhost:27017/", (err, db) => {
            if (err) throw err;

            this.dbo = db.db("greggory");
            this.db = db;
        });
    }

    /**
     * Retrieve a list of collections in the database
     * @returns A promise to return an array of existing collections
     */
    getCollections = () => {
        return this.dbo?.listCollections();
    }

    /**
     * Close the database connection
     */
    close = () => {
        this.db.close();
    }
}

module.exports = {
    Database: Database
};