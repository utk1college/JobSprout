const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB Connected...');
  // Initialize jobs if needed
  require('./routes/jobs');
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('- GET  /api/jobs');
    console.log('- POST /api/jobs/seed');
    console.log('- GET  /test');
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Routes - These need to come BEFORE the catch-all route
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/admin', require('./routes/admin'));

// Basic test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// These static and catch-all routes should come LAST
app.use(express.static(path.join(__dirname, '../client/build')));

// This should be the VERY LAST route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});