const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const fs = require("fs");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database.db");
let db = null;

// Initialize Database and Start Server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Run the initialization SQL script to create table and seed data
    const initSQL = fs.readFileSync(
      path.join(__dirname, "initDB.sql"),
      "utf-8"
    );

    // Check if the book table already has data
    const existingBooks = await db.all(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='book'"
    );

    if (existingBooks.length === 0) {
      // Table doesn't exist, run the full init script
      const statements = initSQL
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      for (const statement of statements) {
        await db.run(statement);
      }
      console.log("Database initialized with sample data.");
    } else {
      console.log("Database already exists. Skipping initialization.");
    }

    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// API 1: GET all books
app.get("/books/", async (request, response) => {
  try {
    const getBooksQuery = `SELECT * FROM book ORDER BY id;`;
    const booksArray = await db.all(getBooksQuery);
    response.json(booksArray);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API 2: GET a specific book by ID
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const getBookQuery = `SELECT * FROM book WHERE id = ?;`;
    const book = await db.get(getBookQuery, [bookId]);

    if (book === undefined) {
      response.status(404).json({ error: "Book not found" });
    } else {
      response.json(book);
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API 3: POST a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;

    // Validate required fields
    if (!title || !author || price === undefined || pages === undefined) {
      return response.status(400).json({
        error: "All fields are required: title, author, price, pages",
      });
    }

    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;
    const result = await db.run(addBookQuery, [title, author, price, pages]);

    response.status(201).json({
      message: "Book added successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API 4: PUT update an existing book
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    // Check if the book exists
    const existingBook = await db.get(`SELECT * FROM book WHERE id = ?;`, [
      bookId,
    ]);

    if (existingBook === undefined) {
      return response.status(404).json({ error: "Book not found" });
    }

    const updateBookQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;
    await db.run(updateBookQuery, [title, author, price, pages, bookId]);

    response.json({ message: "Book updated successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// API 5: DELETE a book
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    // Check if the book exists
    const existingBook = await db.get(`SELECT * FROM book WHERE id = ?;`, [
      bookId,
    ]);

    if (existingBook === undefined) {
      return response.status(404).json({ error: "Book not found" });
    }

    const deleteBookQuery = `DELETE FROM book WHERE id = ?;`;
    await db.run(deleteBookQuery, [bookId]);

    response.json({ message: "Book deleted successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

