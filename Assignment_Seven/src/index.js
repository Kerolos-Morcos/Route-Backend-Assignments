import express from "express";
import { dbConnection } from "./DB/db.connection.js";
import { booksRouter } from "./Modules/books/books.controller.js";
import { authorsRouter } from "./Modules/authors/authors.controller.js";
import { logsRouter } from "./Modules/logs/logs.controller.js";

const app = express();
const port = 5000;

// Global middleware
app.use(express.json());


// Routes
app.use(booksRouter);
app.use(authorsRouter);
app.use(logsRouter);


// DB connection
await dbConnection();




// Not Found Route
app.use((req, res, next) => {
    console.log("Route not found");
    res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});



// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});