const { MongoClient } = require("mongodb");
const { v4 } = require("uuid");

class Database {
    constructor(name) {
        // Create a new database using the given name
        if (name) {
            this.name = name;
        }
        else {
            this.name = v4();
        }
        
        MongoClient.connect("mongodb://localhost:27017/" + this.name, (err, db) => {
            if (err) throw err;

            console.log("Database created for " + this.name);
            db.close();
        })
    }
}

module.exports = {
    Database: Database
};