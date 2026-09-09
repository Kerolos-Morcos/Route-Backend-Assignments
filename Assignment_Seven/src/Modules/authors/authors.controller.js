import express from "express";
import { createAuthorsCollectionService } from "./authors.service.js";

export const authorsRouter = express.Router();

// create authors collection
export const createAuthorsCollectionController = async (req, res) => {
    try {
        const result = await createAuthorsCollectionService();
        console.log("Authors Collection created successfully:", result);
        res.status(201).json({ message: "Authors Collection created successfully", result });
    } catch (error) {
        console.error("Error creating collection:", error);
        res.status(500).json({ message: "Error creating authors collection", error: error.message });
    }
};

// Route to create the authors collection
authorsRouter.post("/collection/authors", createAuthorsCollectionController);