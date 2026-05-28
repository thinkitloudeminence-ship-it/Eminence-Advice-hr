const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Ensure uploads folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
   'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://eminenceadvice.com',
    'https://www.eminenceadvice.com',
    'https://eminence-advice-hr.vercel.app',
    'https://eminence-advice-hr-etfi.vercel.app',  // ← NAYA DOMAIN ADD KARO
    'https://admin.eminenceadvice.com',
  ],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple NoSQL injection protection (manual)
app.use((req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/[$]/g, '');
      }
    });
  }
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = req.query[key].replace(/[$.]/g, '');
      }
    });
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const jobRoutes = require('./src/routes/job.routes');
const applicationRoutes = require('./src/routes/application.routes');
const blogRoutes = require('./src/routes/blog.routes');
const contactRoutes = require('./src/routes/contact.routes');
const serviceRoutes = require('./src/routes/service.routes');
const dashboardRoutes = require('./src/routes/dashboard.routes');
const paymentRoutes = require('./src/routes/payment.routes');


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/payment', paymentRoutes);


const errorHandler = require('./src/middleware/error');
app.use(errorHandler);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;

const connectDB = async (retryCount = 0) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    if (retryCount < 5) {
      console.log(`🔄 Retrying connection in 5 seconds... (Attempt ${retryCount + 1}/5)`);
      setTimeout(() => connectDB(retryCount + 1), 5000);
    } else {
      console.error('❌ Failed to connect after 5 attempts');
      process.exit(1);
    }
  }
};

connectDB();