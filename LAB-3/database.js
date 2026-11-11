/**
 * Lab 3 - Database Connection & Initialization Module
 * Student: Dayyala Naresh (Reg No: 252U1R9029)
 * Faculty: Joel Prashanth D
 */

const path = require("path");
const fs = require("fs");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "database.db");
let db = null;

/**
 * Initializes the SQLite database connection and runs initial schema/seed scripts
 * if the database or table is empty or does not exist.
 */
async function initializeDB() {
  if (db) {
    return db;
  }

  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Verify if 'books' table exists in sqlite_master
    const tableExists = await db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='books';"
    );

    if (!tableExists) {
      console.log("Table 'books' not found. Initializing schema and seed data from initDB.sql...");
      const sqlScriptPath = path.join(__dirname, "initDB.sql");
      const initSQL = fs.readFileSync(sqlScriptPath, "utf-8");

      // Execute schema and seeding commands safely
      await db.exec(initSQL);
      console.log("Database initialized successfully with sample books.");
    } else {
      // Check record count
      const recordCount = await db.get("SELECT COUNT(*) AS count FROM books;");
      console.log(`Database connected. Current books in table: ${recordCount.count}`);
    }

    return db;
  } catch (error) {
    console.error("Failed to initialize database:", error.message);
    throw error;
  }
}

/**
 * Returns the active database instance.
 */
function getDB() {
  if (!db) {
    throw new Error("Database has not been initialized. Call initializeDB() first.");
  }
  return db;
}

module.exports = {
  initializeDB,
  getDB,
};

