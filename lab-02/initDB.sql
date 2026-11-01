CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    pages INTEGER NOT NULL
);

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

