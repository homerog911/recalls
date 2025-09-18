const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS
app.use(cors());

// Body parser
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/manufacturer', manufacturerRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;