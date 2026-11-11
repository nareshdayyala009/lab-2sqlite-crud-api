/**
 * Lab 3: REST API, Query Parameters, Validation, and Debugging
 * Student: Dayyala Naresh (Registration No: 252U1R9029)
 * Faculty: Joel Prashanth D
 * Institution: Aurora | Branch: CSE - Gen AI
 */

const express = require("express");
const { initializeDB, getDB } = require("./database");

const app = express();
app.use(express.json());

// Allowed columns for SQL sorting (Strict Allowlist prevents SQL Injection)
const ALLOWED_SORT_COLUMNS = ["id", "title", "author", "price", "pages"];
const ALLOWED_SORT_ORDERS = ["ASC", "DESC"];

/**
 * Helper validator for Book input payload
 * Used in POST /books and PUT /books/:id
 */
function validateBookPayload(body) {
  const { title, author, price, pages } = body;

  // Title validation
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return { isValid: false, message: "Title is required and must not be empty" };
  }

  // Author validation
  if (!author || typeof author !== "string" || author.trim().length === 0) {
    return { isValid: false, message: "Author is required and must not be empty" };
  }

  // Price validation
  if (price === undefined || price === null || price === "" || isNaN(Number(price))) {
    return { isValid: false, message: "Price is required and must be numeric" };
  }
  const numericPrice = Number(price);
  if (numericPrice < 0) {
    return { isValid: false, message: "Price must not be negative" };
  }

  // Pages validation (optional, but if supplied must be positive integer)
  if (pages !== undefined && pages !== null && pages !== "") {
    const numPages = Number(pages);
    if (!Number.isInteger(numPages) || numPages <= 0) {
      return { isValid: false, message: "Pages must be a positive integer" };
    }
  }

  return {
    isValid: true,
    data: {
      title: title.trim(),
      author: author.trim(),
      price: numericPrice,
      pages: pages !== undefined && pages !== null && pages !== "" ? Number(pages) : null,
    },
  };
}

/**
 * Route: GET /
 * Welcome route describing API metadata and available endpoints
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Lab 3 REST API - Books Directory",
    student: {
      name: "Dayyala Naresh",
      registrationNumber: "252U1R9029",
      course: "Backend Development Fundamentals",
      faculty: "Joel Prashanth D",
    },
    endpoints: {
      "GET /": "API welcome message and documentation",
      "GET /books": "Retrieve books with optional query filters (search_q, order_by, order, limit, offset, min_price, max_price)",
      "GET /books/:id": "Retrieve a single book by ID",
      "POST /books": "Create a new book record",
      "PUT /books/:id": "Update an existing book record",
      "DELETE /books/:id": "Delete a book record by ID",
    },
  });
});

/**
 * Route: GET /books
 * Retrieve all books with full support for filtering, sorting, and pagination
 */
app.get("/books", async (req, res, next) => {
  try {
    const db = getDB();
    const {
      search_q,
      order_by = "id",
      order = "ASC",
      limit = "10",
      offset = "0",
      min_price,
      max_price,
    } = req.query;

    // 1. Validate order_by against allowlist
    const normalizedOrderBy = String(order_by).toLowerCase();
    if (!ALLOWED_SORT_COLUMNS.includes(normalizedOrderBy)) {
      return res.status(400).json({
        message: `Invalid 'order_by' parameter. Allowed values: ${ALLOWED_SORT_COLUMNS.join(", ")}`,
      });
    }

    // 2. Validate order against allowlist
    const normalizedOrder = String(order).toUpperCase();
    if (!ALLOWED_SORT_ORDERS.includes(normalizedOrder)) {
      return res.status(400).json({
        message: "Invalid 'order' parameter. Allowed values: ASC, DESC",
      });
    }

    // 3. Validate limit (positive integer)
    const limitNum = Number(limit);
    if (!Number.isInteger(limitNum) || limitNum <= 0) {
      return res.status(400).json({
        message: "'limit' must be a positive integer",
      });
    }

    // 4. Validate offset (non-negative integer)
    const offsetNum = Number(offset);
    if (!Number.isInteger(offsetNum) || offsetNum < 0) {
      return res.status(400).json({
        message: "'offset' must be a non-negative integer",
      });
    }

    // 5. Validate min_price & max_price if supplied
    let minPriceNum = null;
    let maxPriceNum = null;

    if (min_price !== undefined) {
      minPriceNum = Number(min_price);
      if (isNaN(minPriceNum) || minPriceNum < 0) {
        return res.status(400).json({
          message: "'min_price' must be a non-negative number",
        });
      }
    }

    if (max_price !== undefined) {
      maxPriceNum = Number(max_price);
      if (isNaN(maxPriceNum) || maxPriceNum < 0) {
        return res.status(400).json({
          message: "'max_price' must be a non-negative number",
        });
      }
    }

    if (minPriceNum !== null && maxPriceNum !== null && minPriceNum > maxPriceNum) {
      return res.status(400).json({
        message: "'min_price' cannot be greater than 'max_price'",
      });
    }

    // Build parameterized query dynamically
    let sql = "SELECT * FROM books";
    const conditions = [];
    const params = [];

    // Search partial title using LIKE
    if (search_q !== undefined && search_q.trim() !== "") {
      conditions.push("title LIKE ?");
      params.push(`%${search_q.trim()}%`);
    }

    // Filter minimum price
    if (minPriceNum !== null) {
      conditions.push("price >= ?");
      params.push(minPriceNum);
    }

    // Filter maximum price
    if (maxPriceNum !== null) {
      conditions.push("price <= ?");
      params.push(maxPriceNum);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    // Safe injection of verified column identifier & order
    sql += ` ORDER BY ${normalizedOrderBy} ${normalizedOrder}`;

    // Pagination
    sql += " LIMIT ? OFFSET ?;";
    params.push(limitNum, offsetNum);

    const books = await db.all(sql, params);
    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

/**
 * Route: GET /books/:id
 * Retrieve a single book by ID
 */
app.get("/books/:id", async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    if (!Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const db = getDB();
    const book = await db.get("SELECT * FROM books WHERE id = ?;", [bookId]);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

/**
 * Route: POST /books
 * Create a new book record
 */
app.post("/books", async (req, res, next) => {
  try {
    const validation = validateBookPayload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const { title, author, price, pages } = validation.data;
    const db = getDB();

    const insertSQL = "INSERT INTO books (title, author, price, pages) VALUES (?, ?, ?, ?);";
    const result = await db.run(insertSQL, [title, author, price, pages]);

    return res.status(201).json({
      message: "Book created successfully",
      book: {
        id: result.lastID,
        title,
        author,
        price,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Route: PUT /books/:id
 * Update an existing book record
 */
app.put("/books/:id", async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    if (!Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const db = getDB();
    const existingBook = await db.get("SELECT * FROM books WHERE id = ?;", [bookId]);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const validation = validateBookPayload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    const { title, author, price, pages } = validation.data;
    const updateSQL = "UPDATE books SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?;";
    await db.run(updateSQL, [title, author, price, pages, bookId]);

    return res.status(200).json({
      message: "Book updated successfully",
      book: {
        id: bookId,
        title,
        author,
        price,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Route: DELETE /books/:id
 * Delete a book record by ID
 */
app.delete("/books/:id", async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    if (!Number.isInteger(bookId) || bookId <= 0) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const db = getDB();
    const existingBook = await db.get("SELECT * FROM books WHERE id = ?;", [bookId]);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    await db.run("DELETE FROM books WHERE id = ?;", [bookId]);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
});

/**
 * 404 Handler for undefined routes
 */
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

/**
 * Centralized Safe Error Handling Middleware
 * Prevents stack trace leakages to client
 */
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

/**
 * Initialize Database and Start HTTP Server
 */
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDB();
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
      console.log(`Listening on all network interfaces (0.0.0.0:${PORT}) for deployment compatibility.`);
    });
    return server;
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

// Start server when executed directly
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };

