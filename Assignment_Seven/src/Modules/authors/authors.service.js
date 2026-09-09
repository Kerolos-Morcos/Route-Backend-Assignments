import { db } from "../../DB/db.connection.js";

// create authors collection implicitly
export const createAuthorsCollectionService = async () => {
    const result = await db.collection("authors").insertOne({
        name: "Author1",
        nationality: "British"
    });
    return result;
};