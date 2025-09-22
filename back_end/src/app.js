const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const recallRoutes = require('./routes/recallRoutes');
const modelRoutes = require('./routes/modelRoutes');
const errorHandler = require('./middleware/errorHandler');

//import parseForwarded from 'forwarded-parse'
const  ipKeyGenerator= require('express-rate-limit');

const app = express();

// Rate limiting
/*
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


app.use(limiter); */




// ...

const NUMBER_OF_PROXIES_TO_TRUST = 1

app.use(
	rateLimit({
		keyGenerator: (req, res) => {
      
      if (!req.ip) {
		console.error('Warning: request.ip is missing!')
		return req.socket.remoteAddress
	}

			let ip = req.ip

      
			return ipKeyGenerator(ip)
		},
		// ...
	}),
)

// CORS
const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
  maxAge: 600,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// Body parser
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/recall', recallRoutes);
app.use('/api/model', modelRoutes);

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