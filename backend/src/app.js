const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration: Allow local Vite frontend during dev and production frontend
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy'));
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint (Required for Render and monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'klyro-backend',
    timestamp: new Date().toISOString()
  });
});
const { requireAuth, requireAdmin } = require('./middlewares/auth.middleware');

// Test protected route
app.get('/api/auth/me', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'Authenticated successfully',
    user: req.user
  });
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} does not exist.`
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('[Error]', err.stack || err.message);
  res.status(err.status || 500).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'Something went wrong on the server'
  });
});

module.exports = app;