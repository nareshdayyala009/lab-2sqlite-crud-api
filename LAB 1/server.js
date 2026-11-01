// ============================================================
// Lab 1: Plain Node.js HTTP Server Demonstration
// Student: D.NARESH (Reg No: 252U1R904)
// Course: Backend Development Fundamentals | Branch: CSE - Gen AI
// Institution: Aurora | Faculty: Joel Prashanth D
// ============================================================

// Import the built-in 'http' module from Node.js (no external package needed)
const http = require('http');

// Define port number: use environment variable if provided, otherwise 3000
const PORT = process.env.PORT || 3000;

// Create the HTTP server using http.createServer()
// The callback function runs whenever a request reaches the server
const server = http.createServer((request, response) => {
  // Set the response HTTP status code to 200 (OK)
  response.statusCode = 200;

  // Set the Content-Type header to plain text
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // Send "Hello" as the response body and close the connection
  response.end('Hello');
});

// Start listening for incoming network requests on the designated port
server.listen(PORT, () => {
  console.log(`Plain Node.js HTTP Server is running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server.`);
});

