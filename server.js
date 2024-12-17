const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

// Load the Tracker model from initialiser.js
const Tracker = require('./initialiser');

// Server and MongoDB Configurations
const PORT = process.env.PORT || 10000;
const MONGODB_URI = 'mongodb+srv://smartboyharis:dOqVt7KhShYXrdmG@cluster0.sbvnb.mongodb.net/attendance';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create HTTP Server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve homepage
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error loading index.html:", err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/records') {
    // Fetch tracker records
    Tracker.find({})
      .then((records) => {
        console.log('Fetched records:', records);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(records));
      })
      .catch((err) => {
        console.error("Error fetching records:", err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error fetching records');
      });
  } else {
    // Handle unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
