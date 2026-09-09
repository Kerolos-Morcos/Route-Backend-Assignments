import { db } from "../../DB/db.connection.js";

// create books collection with validation
export const createBooksCollectionService = async () => {
    const result = await db.createCollection("books", {
        validator: {
            title: {
                $exists: true,
                $type: "string",
                $ne: ""
            }
        }
    });
    return result;
};


// create an index on the "title" field of the "books" collection
export const createIndexService = async () => {
    const result = await db.collection("books").createIndex({ title: 1 });
    return result;
}

// insert a book into the "books" collection
export const insertBookService = async (book) => {
    const result = await db.collection("books").insertOne(book);
    return result;
}

// insert many books into the "books" collection
export const insertManyBooksService = async (books) => {
    const result = await db.collection("books").insertMany(books);
    return result;
}

// update a book's year in the "books" collection
export const updateBookService = async (bookName, updatedBook) => {
    const result = await db.collection("books").updateOne({ title: bookName }, { $set: updatedBook });
    return result;
}

// find a book by title in the "books" collection
export const findBookByTitleService = async (title) => {
    const result = await db.collection("books").findOne({ title: { $eq: title } });
    return result;
}

// find all books published between two years in the "books" collection
export const findBooksByYearRangeService = async (startYear, endYear) => {
    const result = await db.collection("books").find({ year: { $gte: startYear, $lte: endYear } }).toArray();
    return result;
}

// find books by genre in the "books" collection where the genre matches the provided genre (case-insensitive)
export const findBooksByGenreService = async (genre) => {
    const result = await db.collection("books").find({ genres: genre }).toArray();
    return result;
}

// find books after skipping a certain no. of docs and limiting the results in the "books" collection
export const findBooksWithPaginationService = async (skip, limit) => {
    const result = await db.collection("books").find().sort({ year: -1 }).skip(skip).limit(limit).toArray();
    return result;
};

// Find books where the year field stored as an integer.
export const findBooksByYearService = async () => {
    const result = await db.collection("books").find({ year: { $type: "int" } }).toArray();
    return result;
}

// Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction"
export const findBooksExcludingGenresService = async () => {
    const result = await db.collection("books").find({ genres: { $nin: ["Horror", "Science Fiction"] } }).toArray();
    return result;
}

// Delete all books published before specified year in the "books" collection
export const deleteBooksBeforeAYearService = async (year) => {
    const result = await db.collection("books").deleteMany({ year: { $lt: year } });
    return result;
}

// Using aggregation Functions, Filter books published after a specified year and sort them by year descending.
export const aggregateBooksAfterAYearService = async (year) => {
    const result = await db.collection("books").aggregate([
        { $match: { year: { $gt: year } } },
        { $sort: { year: -1 } }
    ]).toArray();
    return result;
}

// Find all books published after a specified year, showing only the title, author, and year fields.
export const findBooksAfterAYearShowSpecificFieldsService = async (year) => {
    const result = await db.collection("books").aggregate([
        { $match: { year: { $gt: year } } },
        { $project: { title: 1, author: 1, year: 1, _id: 0 } }
    ]).toArray();
    return result;
}

// Using aggregation functions, break an array of genres into separate documents.
export const unwindGenresService = async () => {
    const result = await db.collection("books").aggregate([
        { $unwind: "$genres" }
    ]).toArray();
    return result;
}

// Using aggregation functions, Join the books collection with the logs collection.
export const joinCollectionsService = async () => {
    const result = await db.collection("books").aggregate([
        {
            $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "book_id",
                as: "logs"
            }
        }
    ]).toArray();
    return result;
}