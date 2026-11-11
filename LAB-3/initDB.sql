-- Lab 3: REST API, Query Parameters, Validation, and Debugging
-- Database Schema and Sample Data for 'books' table

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price REAL NOT NULL,
  pages INTEGER
);

-- Seed dataset with at least 10 diverse computer science and programming books
INSERT INTO books (title, author, price, pages) VALUES
  ('The Pragmatic Programmer', 'Andrew Hunt and David Thomas', 599.00, 352),
  ('Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 650.00, 464),
  ('JavaScript: The Good Parts', 'Douglas Crockford', 399.00, 176),
  ('Eloquent JavaScript', 'Marijn Haverbeke', 450.00, 472),
  ('You Don''t Know JS: Scope & Closures', 'Kyle Simpson', 299.00, 98),
  ('Design Patterns: Elements of Reusable Object-Oriented Software', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', 799.00, 395),
  ('Introduction to Algorithms', 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', 999.00, 1312),
  ('Head First Java', 'Kathy Sierra and Bert Bates', 520.00, 720),
  ('Learning Python', 'Mark Lutz', 750.00, 1648),
  ('Computer Networking: A Top-Down Approach', 'James F. Kurose and Keith W. Ross', 850.00, 864),
  ('Artificial Intelligence: A Modern Approach', 'Stuart Russell and Peter Norvig', 1150.00, 1152),
  ('Operating System Concepts', 'Abraham Silberschatz, Peter B. Galvin, Greg Gagne', 680.00, 976);

