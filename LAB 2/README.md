render live link: https://lab-2-sqlite-crud-api.onrender.com/

# Lab 2: SQLite and Relational Database Operations

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Postman](https://img.shields.io/badge/Tested%20With-Postman-FF6C37?logo=postman&logoColor=white)](https://www.postman.com/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white)](https://github.com/nareshdayyala009/lab-2sqlite-crud-api.git)

---

## Student Details

| Attribute | Details |
| :--- | :--- |
| **Student Name** | Dayyala Naresh |
| **Student ID / Reg No.** | N25H03A1299 |
| **Course** | B.Tech CSE – Gen AI |
| **Academic Project** | Lab 2 – SQLite and Relational Database Operations |
| **Repository URL** | [nareshdayyala009/lab-2sqlite-crud-api](https://github.com/nareshdayyala009/lab-2sqlite-crud-api.git) |

---

## Table of Contents

- [1. Project Title and Introduction](#1-project-title-and-introduction)
- [2. Project Overview](#2-project-overview)
- [3. Objectives](#3-objectives)
- [4. Technologies Used](#4-technologies-used)
- [5. Project Folder Structure](#5-project-folder-structure)
- [6. Database Design](#6-database-design)
- [7. SQLite Database Schema](#7-sqlite-database-schema)
- [8. Installation and Setup](#8-installation-and-setup)
- [9. How to Run the Project](#9-how-to-run-the-project)
- [10. API Documentation](#10-api-documentation)
- [11. CRUD Operations](#11-crud-operations)
- [12. API Request and Response Examples](#12-api-request-and-response-examples)
- [13. Postman Testing](#13-postman-testing)
- [14. Database Verification](#14-database-verification)
- [15. Screenshots](#15-screenshots)
- [16. Learning Outcomes](#16-learning-outcomes)
- [17. Conclusion](#17-conclusion)

---

## 1. Project Title and Introduction

### Lab 2 – SQLite Database and CRUD Routes Using Node.js and Express

In modern web development, backend applications rely on persistent databases to store, retrieve, update, and manipulate structured information. This project implements a complete, production-grade RESTful API backend using **Node.js**, **Express.js**, and an embedded **SQLite** relational database.

The application manages a book inventory system, providing endpoints for all standard CRUD (Create, Read, Update, Delete) operations. It emphasizes clean software architecture, asynchronous database connectivity, parameterized SQL queries to protect against SQL injection vulnerabilities, structured error handling, and standard HTTP response status codes.

---

## 2. Project Overview

The primary objective of this project is to build and test an end-to-end backend service that interacts with an SQLite relational database (`database.db`).

Key highlights of the implementation:
- **Database-First Startup**: The Express server establishes a connection with the SQLite database before opening port `3000` for incoming network requests.
- **Automatic Initialization**: On initial execution, the server reads `initDB.sql` to automatically create the `book` table and seed it with 9 realistic initial records if it does not already exist.
- **Standardized REST Endpoints**: Routes follow standard REST conventions (`GET /books/`, `GET /books/:id/`, `POST /books/`, `PUT /books/:id/`, `DELETE /books/:id/`).
- **Data Validation & Error Resilience**: Requests validate mandatory payload fields, enforce appropriate HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, and `500 Internal Server Error`), and handle exceptions gracefully with `try...catch` blocks.
- **Security**: All SQL statements utilize parameterized queries (`?` placeholders) rather than raw string concatenation.

---

## 3. Objectives

- [x] Configure and initialize a Node.js project using npm and `package.json`.
- [x] Integrate the `express` web framework for routing and middleware management.
- [x] Connect an embedded **SQLite** database using `sqlite` and the `sqlite3` driver.
- [x] Write an SQL initialization script (`initDB.sql`) defining the schema and initial seed data.
- [x] Implement complete **CRUD** capabilities across five RESTful endpoints.
- [x] Validate client inputs and implement appropriate HTTP status codes.
- [x] Execute thorough end-to-end testing using **Postman**.
- [x] Verify database persistence and schema integrity using **DB Browser for SQLite**.
- [x] Document the entire system with authentic screenshots and structured markdown.

---

## 4. Technologies Used

| Technology | Role & Purpose |
| :--- | :--- |
| **Node.js** | Server-side JavaScript runtime environment executing backend logic. |
| **Express.js** | Lightweight web framework used for handling HTTP requests, middleware, and routing. |
| **SQLite3** | Self-contained, serverless, zero-configuration relational database engine. |
| **sqlite** | Modern promise-based wrapper library facilitating `async/await` syntax with SQLite3. |
| **JavaScript (ES6+)** | Core programming language leveraging modern asynchronous patterns (`async/await`, destructuring). |
| **SQL** | Structured Query Language used for table creation, data insertion, querying, updates, and deletion. |
| **Nodemon** | Development tool that monitors directory files and automatically restarts the node process on change. |
| **Postman** | API testing platform utilized to send HTTP requests and inspect status codes, headers, and payloads. |
| **DB Browser for SQLite**| Visual GUI tool used to inspect and verify database tables, column types, and persisted records. |
| **Git & GitHub** | Distributed version control and source code repository hosting. |

---

## 5. Project Folder Structure

```text
lab-2sqlite-crud-api/
├── LAB 2/
│   ├── database-verification.png  # DB Browser for SQLite showing 9 records
│   ├── delete-book.png            # Postman DELETE /books/:id response
│   ├── get-all-books.png          # Postman GET /books/ response
│   ├── get-book-by-id.png         # Postman GET /books/:id response
│   ├── post-add-book.png          # Postman POST /books/ response
│   └── put-update-book.png        # Postman PUT /books/:id response
├── .gitignore                     # Git ignore rules (node_modules, logs)
├── app.js                         # Core Express server and CRUD route handlers
├── database.db                    # SQLite relational database storage file
├── initDB.sql                     # SQL schema definition and seed dataset
├── package-lock.json              # Deterministic dependency tree lockfile
├── package.json                   # Project metadata, dependencies, and npm scripts
└── README.md                      # Comprehensive project documentation
```

---

## 6. Database Design

The relational database consists of an entity named `book`. This table stores metadata about publications, including title, author attribution, pricing, and page counts.

### Entity-Relationship Representation

```text
+--------------------------------------------------------+
|                         BOOK                           |
+--------------------------------------------------------+
| * id     : INTEGER (PRIMARY KEY, AUTOINCREMENT)       |
|   title  : TEXT    (NOT NULL)                          |
|   author : TEXT    (NOT NULL)                          |
|   price  : INTEGER (NOT NULL)                          |
|   pages  : INTEGER (NOT NULL)                          |
+--------------------------------------------------------+
```

### Design Considerations
1. **Primary Key**: An auto-incrementing integer identifier (`id`) guarantees uniqueness for every book record.
2. **Data Types**: `TEXT` is allocated for strings with variable length (`title`, `author`), while `INTEGER` is enforced for numerical quantities (`price`, `pages`).
3. **Integrity Constraints**: `NOT NULL` constraints prevent partial or incomplete book records from entering the database.

---

## 7. SQLite Database Schema

### SQL DDL & DML (`initDB.sql`)

```sql
-- Create the book table
CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    pages INTEGER NOT NULL
);

-- Seed initial nine sample books
INSERT INTO book (title, author, price, pages) VALUES
('The Pragmatic Programmer', 'Andrew Hunt', 550, 352),
('Design Patterns', 'Erich Gamma', 620, 395),
('Introduction to Algorithms', 'Thomas H. Cormen', 780, 1312),
('Structure and Interpretation of Computer Programs', 'Harold Abelson', 500, 657),
('The Art of Computer Programming', 'Donald Knuth', 900, 672),
('Artificial Intelligence: A Modern Approach', 'Stuart Russell', 850, 1152),
('Deep Learning', 'Ian Goodfellow', 700, 800),
('Python Crash Course', 'Eric Matthes', 400, 544),
('JavaScript: The Good Parts', 'Douglas Crockford', 350, 176);
```

### Initial Seed Data

| ID | Title | Author | Price (₹) | Pages |
| :---: | :--- | :--- | :---: | :---: |
| 1 | The Pragmatic Programmer | Andrew Hunt | 550 | 352 |
| 2 | Design Patterns | Erich Gamma | 620 | 395 |
| 3 | Introduction to Algorithms | Thomas H. Cormen | 780 | 1312 |
| 4 | Structure and Interpretation of Computer Programs | Harold Abelson | 500 | 657 |
| 5 | The Art of Computer Programming | Donald Knuth | 900 | 672 |
| 6 | Artificial Intelligence: A Modern Approach | Stuart Russell | 850 | 1152 |
| 7 | Deep Learning | Ian Goodfellow | 700 | 800 |
| 8 | Python Crash Course | Eric Matthes | 400 | 544 |
| 9 | JavaScript: The Good Parts | Douglas Crockford | 350 | 176 |

---

## 8. Installation and Setup

### Prerequisites

Ensure the following tools are installed on your workstation:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **Git**
- **Postman** (Desktop application or Web Agent)
- **DB Browser for SQLite** (optional, for direct database inspection)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nareshdayyala009/lab-2sqlite-crud-api.git
   cd lab-2sqlite-crud-api
   ```

2. **Install Node.js Dependencies**
   ```bash
   npm install
   ```

   This installs the required packages defined in `package.json`:
   - `express`: Minimalist web framework.
   - `sqlite`: Promise-based SQLite interface.
   - `sqlite3`: Native SQLite database driver.
   - `nodemon`: Automatic development server reloader.

---

## 9. How to Run the Project

### Running in Production / Standard Mode
To execute the application using standard Node.js:
```bash
npm start
```

### Running in Development Mode (Live Reloading)
To run with `nodemon` for automatic server reloading on code changes:
```bash
npm run dev
```

### Console Output
Upon successful initialization, the console displays:
```text
Database initialized with sample data.
Server Running at http://localhost:3000/
```

The database file `database.db` is verified or created in the project root directory.

---

## 10. API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints Summary

| HTTP Method | Endpoint | Description | Request Body | Success Status |
| :--- | :--- | :--- | :--- | :---: |
| **GET** | `/books/` | Retrieve all books from the database | None | `200 OK` |
| **GET** | `/books/:id/` | Retrieve a specific book by ID | None | `200 OK` |
| **POST** | `/books/` | Insert a new book record | JSON Object | `201 Created` |
| **PUT** | `/books/:id/` | Update an existing book's details | JSON Object | `200 OK` |
| **DELETE** | `/books/:id/` | Remove a book record by ID | None | `200 OK` |
| **GET** | `/time` | Retrieve current server date and time | None | `200 OK` |

---

## 11. CRUD Operations

| CRUD Operation | HTTP Method | Route | Parameterized SQL Query |
| :--- | :---: | :--- | :--- |
| **Create** | `POST` | `/books/` | `INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);` |
| **Read (All)** | `GET` | `/books/` | `SELECT * FROM book ORDER BY id;` |
| **Read (Single)** | `GET` | `/books/:bookId/` | `SELECT * FROM book WHERE id = ?;` |
| **Update** | `PUT` | `/books/:bookId/` | `UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?;` |
| **Delete** | `DELETE` | `/books/:bookId/` | `DELETE FROM book WHERE id = ?;` |

---

## 12. API Request and Response Examples

### 1. GET `/books/` — Retrieve All Books
Retrieves the full list of books currently stored in the database.

- **Method**: `GET`
- **URL**: `http://localhost:3000/books/`
- **Status**: `200 OK`
- **Response Example**:
```json
[
  {
    "id": 1,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt",
    "price": 550,
    "pages": 352
  },
  {
    "id": 2,
    "title": "Design Patterns",
    "author": "Erich Gamma",
    "price": 620,
    "pages": 395
  },
  {
    "id": 3,
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "price": 780,
    "pages": 1312
  }
]
```

#### Screenshot: GET All Books
![GET All Books](<screenshots/get-all-books.png>)

---

### 2. GET `/books/:id/` — Retrieve Book by ID
Fetches a single book matching the URL parameter `id`.

- **Method**: `GET`
- **URL**: `http://localhost:3000/books/1/`
- **Status**: `200 OK`
- **Response Example (Success)**:
```json
{
  "id": 1,
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "price": 550,
  "pages": 352
}
```
- **Response Example (Not Found - Status: `404 Not Found`)**:
```json
{
  "error": "Book not found"
}
```

#### Screenshot: GET Book by ID
![GET Book by ID](<screenshots/get-book-by-id.png>)

---

### 3. POST `/books/` — Add a New Book
Inserts a new book into the database. Validates that `title`, `author`, `price`, and `pages` are present.

- **Method**: `POST`
- **URL**: `http://localhost:3000/books/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 450,
  "pages": 464
}
```
- **Status**: `201 Created`
- **Response Example**:
```json
{
  "message": "Book added successfully",
  "bookId": 10
}
```

#### Screenshot: POST Add Book
![POST Add Book](<screenshots/post-add-book.png>)

---

### 4. PUT `/books/:id/` — Update an Existing Book
Modifies details of an existing book by its primary key `id`.

- **Method**: `PUT`
- **URL**: `http://localhost:3000/books/11/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "title": "Clean Code Second Edition",
  "author": "Robert C. Martin",
  "price": 499,
  "pages": 480
}
```
- **Status**: `200 OK`
- **Response Example (Success)**:
```json
{
  "message": "Book updated successfully"
}
```
- **Response Example (Book Not Found - Status: `404 Not Found`)**:
```json
{
  "error": "Book not found"
}
```

#### Screenshot: PUT Update Book
![PUT Update Book](<screenshots/put-update-book.png>)

---

### 5. DELETE `/books/:id/` — Delete a Book
Permanently removes a book record matching the specified ID from the database.

- **Method**: `DELETE`
- **URL**: `http://localhost:3000/books/11/`
- **Status**: `200 OK`
- **Response Example (Success)**:
```json
{
  "message": "Book deleted successfully"
}
```
- **Response Example (Not Found - Status: `404 Not Found`)**:
```json
{
  "error": "Book not found"
}
```

#### Screenshot: DELETE Book
![DELETE Book](<screenshots/delete-book.png>)

---

### 6. GET `/time` — Current Server Date and Time
Utility route providing current server timestamp.

- **Method**: `GET`
- **URL**: `http://localhost:3000/time`
- **Status**: `200 OK`
- **Response Example**:
```text
2026-10-31T10:30:00.000Z
```

---

## 13. Postman Testing

All endpoints were tested systematically using **Postman Agent** against a live local instance running on `http://localhost:3000`.

### Test Execution Summary

| Test Case | Method | Endpoint Tested | Request Data | Expected Status | Actual Status | Result |
| :--- | :---: | :--- | :--- | :---: | :---: | :---: |
| Retrieve All Books | `GET` | `/books/` | None | `200 OK` | `200 OK` | **Passed** |
| Retrieve Single Book | `GET` | `/books/1/` | None | `200 OK` | `200 OK` | **Passed** |
| Create New Book | `POST` | `/books/` | Clean Code JSON Payload | `201 Created` | `201 Created` | **Passed** |
| Update Book | `PUT` | `/books/11/` | Clean Code 2nd Ed Payload | `200 OK` | `200 OK` | **Passed** |
| Delete Book | `DELETE` | `/books/11/` | None | `200 OK` | `200 OK` | **Passed** |
| Query Deleted Book | `GET` | `/books/11/` | None | `404 Not Found` | `404 Not Found` | **Passed** |
| Update Missing Book | `PUT` | `/books/999/` | Valid JSON | `404 Not Found` | `404 Not Found` | **Passed** |
| Delete Missing Book | `DELETE` | `/books/999/` | None | `404 Not Found` | `404 Not Found` | **Passed** |

---

## 14. Database Verification

To verify that changes are written directly to disk and not just stored in volatile memory:
1. **DB Browser for SQLite** was launched pointing to `c:\Users\nares\OneDrive\Desktop\Lab 1\database.db`.
2. The `book` table structure was examined under the **Database Structure** tab.
3. The records were queried and reviewed in the **Browse Data** tab, verifying:
   - Initial 9 records seeded correctly with proper IDs, strings, and integers.
   - Primary key auto-increment functionality verified.
   - Data types properly preserved across all columns.

#### Screenshot: Database Verification
![Database Verification](<screenshots/database-verification.png>)

---

## 15. Screenshots

All six authentic test execution screenshots are stored in the [`LAB 2/`](<LAB 2>) directory and displayed under their respective sections above:

| # | Screenshot File | Description | Section Link |
| :-: | :--- | :--- | :--- |
| 1 | [`get-all-books.png`](<screenshots/get-all-books.png>) | Postman `GET /books/` (200 OK) retrieving all books | [View Screenshot](#screenshot-get-all-books) |
| 2 | [`get-book-by-id.png`](<screenshots/get-book-by-id.png>) | Postman `GET /books/1/` (200 OK) retrieving book by ID | [View Screenshot](#screenshot-get-book-by-id) |
| 3 | [`post-add-book.png`](<screenshots/post-add-book.png>) | Postman `POST /books/` (201 Created) adding Clean Code | [View Screenshot](#screenshot-post-add-book) |
| 4 | [`put-update-book.png`](<screenshots/put-update-book.png>) | Postman `PUT /books/11/` (200 OK) updating book | [View Screenshot](#screenshot-put-update-book) |
| 5 | [`delete-book.png`](<screenshots/delete-book.png>) | Postman `DELETE /books/11/` (200 OK) deleting book | [View Screenshot](#screenshot-delete-book) |
| 6 | [`database-verification.png`](<screenshots/database-verification.png>) | DB Browser for SQLite showing verified records in `database.db` | [View Screenshot](#screenshot-database-verification) |

---

## 16. Learning Outcomes

Through the hands-on completion of this laboratory project, the following core software engineering and backend competencies were developed:

1. **Relational Database Integration**: Gained practical experience connecting an Express backend to an embedded SQLite database using `sqlite` and `sqlite3` drivers.
2. **Asynchronous JavaScript Architecture**: Mastered modern `async/await` patterns with database transactions, eliminating callback hell and ensuring non-blocking I/O.
3. **RESTful API Design Standards**: Applied industry-standard URL path naming, appropriate HTTP verb choices (`GET`, `POST`, `PUT`, `DELETE`), and canonical status codes (`200`, `201`, `400`, `404`, `500`).
4. **Defensive Coding & Security**: Implemented parameterized SQL queries to prevent SQL injection attacks and validated incoming request payloads.
5. **Database Initialization Workflows**: Developed automated table creation and data seeding logic ensuring frictionless developer onboarding.
6. **API Verification & Diagnostics**: Utilized Postman for request/response validation and DB Browser for SQLite for persistent disk verification.

---

## 17. Conclusion

This project successfully fulfills all requirements for **Lab 2 – SQLite and Relational Database Operations**. The backend service provides a robust, scalable, and secure API for book inventory management, backed by a persistent SQLite database. All CRUD operations have been thoroughly verified through Postman testing and direct SQLite database inspection, with genuine execution records documented throughout this report.

---

### Author
**Dayyala Naresh**  
Student ID: `N25H03A1299`  
B.Tech CSE – Gen AI | NIAT  
GitHub: [@nareshdayyala009](https://github.com/nareshdayyala009)
