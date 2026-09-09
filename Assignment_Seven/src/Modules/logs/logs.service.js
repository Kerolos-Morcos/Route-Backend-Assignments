import { db } from "../../DB/db.connection.js";

// create capped collection for logs
export const createCappedCollectionService = async () => {
    const result = await db.createCollection("logs", { capped: true, size: 1024 * 1024 });
    return result;
};

// insert a log entry into the "logs" capped collection
export const insertLogService = async (log) => {
    const result = await db.collection("logs").insertOne(log);
    return result;
};