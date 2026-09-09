import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "Books_Store";

const client = new MongoClient(url);
export const db = client.db(dbName);

export const dbConnection = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};