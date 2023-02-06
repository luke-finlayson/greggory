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
    constructor(name, endpoint, databaseName) {
        this.addScores = (scores) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const db = this.client.db(this.databaseName);
                const result = yield db.collection(this.name).insertMany(scores);
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
        this.listCollections = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const db = this.client.db(this.databaseName);
                const result = yield db.collections();
                console.log("\nAll Collections:");
                result.forEach(collection => console.log(` - ${collection.collectionName}`));
            }
            catch (err) {
                console.error(err);
            }
            finally {
                yield this.client.close();
            }
        });
        this.name = name;
        this.databaseName = databaseName;
        this.client = new mongodb_1.MongoClient(endpoint);
    }
}
exports.DataBase = DataBase;
