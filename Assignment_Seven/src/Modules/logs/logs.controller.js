import express from "express";
import { ObjectId } from "mongodb";
import { createCappedCollectionService, insertLogService } from "./logs.service.js";

export const logsRouter = express.Router();

export const createCappedCollectionController = async (req, res) => {
    try {
        const result = await createCappedCollectionService();
        console.log("Capped Logs Collection created successfully");
        res.status(201).json({ message: "Capped Logs Collection created successfully" });
    } catch (error) {
        console.error("Error creating capped logs collection:", error);
        res.status(500).json({ message: "Error creating capped logs collection", error: error.message });
    }
};

// Route to insert a log entry into the "logs" capped collection
export const insertLogController = async (req, res) => {
    try {
        const log = req.body;
        const result = await insertLogService({ ...log, book_id: new ObjectId(req.body.book_id) });
        console.log("Log entry inserted successfully:", result);
        res.status(201).json({ message: "Log entry inserted successfully", result });
    } catch (error) {
        console.error("Error inserting log entry:", error);
        res.status(500).json({ message: "Error inserting log entry", error: error.message });
    }
};

// Route to create the logs collection
logsRouter.post("/collection/logs/capped", createCappedCollectionController);

// Route to insert a log entry into the "logs" capped collection
logsRouter.post("/logs", insertLogController);