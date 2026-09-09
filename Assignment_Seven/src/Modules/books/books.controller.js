import express from "express";
import *  as BookServices from "./books.service.js";

export const booksRouter = express.Router();

// create books collection
export const createBooksCollectionController = async (req, res) => {
    try {
        const result = await BookServices.createBooksCollectionService();
        console.log("Books Collection created successfully:", result);
        res.status(201).json({ message: "Books Collection created successfully", result: result.collectionName });
    } catch (error) {
        console.error("Error creating books collection:", error);
        res.status(500).json({ message: "Error creating books collection", error: error.message });
    }
};

// create an index on the "title" field
export const createIndexController = async (req, res) => {
    try {
        const result = await BookServices.createIndexService();
        console.log("Index created successfully:", result);
        res.status(201).json({ message: "Index created successfully", result });
    } catch (error) {
        console.error("Error creating index:", error);
        res.status(500).json({ message: "Error creating index", error: error.message });
    }
};

// Insert a book into the "books" collection
export const insertBookController = async (req, res) => {
    try {
        const book = req.body;
        const result = await BookServices.insertBookService(book);
        console.log("Book inserted successfully:", result);
        res.status(201).json({ message: "Book inserted successfully", result });
    } catch (error) {
        console.error("Error inserting book:", error);
        res.status(500).json({ message: "Error inserting book", error: error.message });
    }
};

// Insert Many books into the "books" collection
export const insertManyBooksController = async (req, res) => {
    try {
        const books = req.body;
        const result = await BookServices.insertManyBooksService(books);
        console.log("Books inserted successfully:", result);
        res.status(201).json({ message: "Books inserted successfully", result });
    } catch (error) {
        console.error("Error inserting books:", error);
        res.status(500).json({ message: "Error inserting books", error: error.message });
    }
};

// Update a book's year in the "books" collection
export const updateBookController = async (req, res) => {
    try {
        const bookName = req.params.name;
        const updatedBook = req.body;
        const result = await BookServices.updateBookService(bookName, updatedBook);
        if (result.matchedCount === 0) {
            console.log("Book not found");
            return res.status(404).json({ message: "Book not found" });
        }
        console.log("Book updated successfully:", result);
        res.status(200).json({ message: "Book updated successfully", result });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
};

// Find a book by title in the "books" collection
export const findBookByTitleController = async (req, res) => {
    try {
        const title = req.query.title;
        const result = await BookServices.findBookByTitleService(title);
        if (!result) {
            console.log("Book not found");
            return res.status(404).json({ message: "Book not found" });
        }
        console.log("Book found successfully:", result);
        res.status(200).json({ message: "Book found successfully", result });
    } catch (error) {
        console.error("Error finding book:", error);
        res.status(500).json({ message: "Error finding book", error: error.message });
    }
};

// Find all books published between two years in the "books" collection
export const findBooksByYearRangeController = async (req, res) => {
    try {
        const startYear = Number(req.query.from);
        const endYear = Number(req.query.to);
        const result = await BookServices.findBooksByYearRangeService(startYear, endYear);
        if (result.length === 0) {
            console.log("No books found in the specified year range");
            return res.status(404).json({ message: "No books found in the specified year range" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
};

// Find books by genre in the "books" collection
export const findBooksByGenreController = async (req, res) => {
    try {
        const genre = req.query.genre;
        const result = await BookServices.findBooksByGenreService(genre);
        if (result.length === 0) {
            console.log("No books found for the specified genre");
            return res.status(404).json({ message: "No books found for the specified genre" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
};

// Find books after skipping a certain number of documents and limiting the results in the "books" collection
export const findBooksWithPaginationController = async (req, res) => {
    try {
        const skip = Number(req.query.skip);
        const limit = Number(req.query.limit);
        const result = await BookServices.findBooksWithPaginationService(skip, limit);
        if (result.length === 0) {
            console.log("No books found");
            return res.status(404).json({ message: "No books found" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
};

// Find books where the year field stored as an integer
export const findBooksByYearController = async (req, res) => {
    try {
        const result = await BookServices.findBooksByYearService();
        if (result.length === 0) {
            console.log("No books found for the specified year");
            return res.status(404).json({ message: "No books found for the specified year" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
}

// Find books where the genres field does not include any of the genres "Horror" or "Science Fiction"
export const findBooksExcludingGenresController = async (req, res) => {
    try {
        const result = await BookServices.findBooksExcludingGenresService();
        if (result.length === 0) {
            console.log("No books found for the specified genres");
            return res.status(404).json({ message: "No books found for the specified genres" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
}

// Delete all books published before specified year in the "books" collection
export const deleteBooksBeforeAYearController = async (req, res) => {
    try {
        const year = Number(req.query.year);
        const result = await BookServices.deleteBooksBeforeAYearService(year);
        console.log("Books deleted successfully:", result);
        res.status(200).json({ message: "Books deleted successfully", result });
    } catch (error) {
        console.error("Error deleting books:", error);
        res.status(500).json({ message: "Error deleting books", error: error.message });
    }
}

// Aggregate books after a specified year in the "books" collection
export const aggregateBooksAfterAYearController = async (req, res) => {
    try {
        const year = Number(req.query.year);
        const result = await BookServices.aggregateBooksAfterAYearService(year);
        if (result.length === 0) {
            console.log("No books found for the specified year");
            return res.status(404).json({ message: "No books found for the specified year" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
}

// Find books after a specified year, showing only the title, author, and year fields
export const findBooksAfterAYearShowSpecificFieldsController = async (req, res) => {
    try {
        const year = Number(req.query.year);
        const result = await BookServices.findBooksAfterAYearShowSpecificFieldsService(year);
        if (result.length === 0) {
            console.log("No books found for the specified year");
            return res.status(404).json({ message: "No books found for the specified year" });
        }
        console.log("Books found successfully:", result);
        res.status(200).json({ message: "Books found successfully", result });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Error finding books", error: error.message });
    }
}

// Break an array of genres into separate documents
export const unwindGenresController = async (req, res) => {
    try {
        const result = await BookServices.unwindGenresService();
        console.log("Genres unwound successfully:", result);
        res.status(200).json({ message: "Genres unwound successfully", result });
    } catch (error) {
        console.error("Error unwinding genres:", error);
        res.status(500).json({ message: "Error unwinding genres", error: error.message });
    }
}

// Join the "books" collection with the "logs" collection
export const joinCollectionsController = async (req, res) => {
    try {
        const result = await BookServices.joinCollectionsService();
        console.log("Collections joined successfully:", result);
        res.status(200).json({ message: "Collections joined successfully", result });
    } catch (error) {
        console.error("Error joining collections:", error);
        res.status(500).json({ message: "Error joining collections", error: error.message });
    }
}


// Route to create the books collection
booksRouter.post("/collection/books", createBooksCollectionController);

// Route to create an index on the "title" field
booksRouter.post("/collection/books/index", createIndexController);

// Route to insert a book into the "books" collection
booksRouter.post("/books", insertBookController);

// Route to insert many books into the "books" collection
booksRouter.post("/books/batch", insertManyBooksController);

// Route to find all books published between two years in the "books" collection
booksRouter.get("/books/year", findBooksByYearRangeController);

// Route to find books by genre in the "books" collection
booksRouter.get("/books/genre", findBooksByGenreController);

// Route to find books after skipping a certain number of documents and limiting the results in the "books" collection
booksRouter.get("/books/skip-limit", findBooksWithPaginationController);

// Route to find books where the year field stored as an integer
booksRouter.get("/books/year-integer", findBooksByYearController);

// Route to find books where the genres field does not include any of the genres "Horror" or "Science Fiction"
booksRouter.get("/books/exclude-genres", findBooksExcludingGenresController);

// Route to aggregate books after a specified year in the "books" collection
booksRouter.get("/books/aggregate1", aggregateBooksAfterAYearController);

// Route to find books after a specified year, showing only the title, author, and year fields
booksRouter.get("/books/aggregate2", findBooksAfterAYearShowSpecificFieldsController);

// Route to break an array of genres into separate documents
booksRouter.get("/books/aggregate3", unwindGenresController);

// Route to Join the "books" collection with the "logs" collection
booksRouter.get("/books/aggregate4", joinCollectionsController);


// Route to update a book's year in the "books" collection
booksRouter.patch("/books/:name", updateBookController);

// Route to find a book by title in the "books" collection
booksRouter.get("/books/:title", findBookByTitleController);

// Delete all books published before A specified year.
booksRouter.delete("/books/before-year", deleteBooksBeforeAYearController);