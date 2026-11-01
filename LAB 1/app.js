// ============================================================
// Lab 1: Node.js and Express Server
// Student: D.NARESH (Reg No: 252U1R904)
// Course: Backend Development Fundamentals | Branch: CSE - Gen AI
// Institution: Aurora | Faculty: Joel Prashanth D
// ============================================================

const express = require('express');
const app = express();

// Configure the port using environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Enable JSON parsing middleware (good practice for Express APIs)
app.use(express.json());

// ------------------------------------------------------------
// Route 1: GET /
// Description: Returns a welcome message
// Status Code: 200 OK
// ------------------------------------------------------------
app.get('/', (req, res) => {
  res.status(200).send('Welcome to Lab 1: Node.js and Express Server by D.NARESH!');
});

// ------------------------------------------------------------
// Route 2: GET /about
// Description: Returns JSON containing student and course details
// Status Code: 200 OK
// ------------------------------------------------------------
app.get('/about', (req, res) => {
  const studentDetails = {
    name: 'D.NARESH',
    registrationNumber: '252U1R904',
    course: 'Backend Development Fundamentals',
    branch: 'CSE – Gen AI',
    section: 'Gen AI',
    institution: 'Aurora',
    faculty: 'Joel Prashanth D'
  };

  res.status(200).json(studentDetails);
});

// ------------------------------------------------------------
// Route 3: GET /time
// Description: Returns current server date and time using new Date()
// Status Code: 200 OK
// ------------------------------------------------------------
app.get('/time', (req, res) => {
  const now = new Date();
  const timeData = {
    message: 'Current Server Date and Time',
    iso: now.toISOString(),
    formatted: now.toString(),
    timestamp: now.getTime()
  };

  res.status(200).json(timeData);
});

// ------------------------------------------------------------
// Route 4: Catch-All / Unknown Routes
// Description: Handles any undefined route with a 404 JSON response
// Status Code: 404 Not Found
// ------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}. The requested route does not exist on this server.`
  });
});

// ------------------------------------------------------------
// Start Server
// ------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Express Server is running at http://localhost:${PORT}/`);
  console.log(`Available Endpoints:`);
  console.log(`  - GET http://localhost:${PORT}/`);
  console.log(`  - GET http://localhost:${PORT}/about`);
  console.log(`  - GET http://localhost:${PORT}/time`);
  console.log(`Press Ctrl+C to stop the server.`);
});

