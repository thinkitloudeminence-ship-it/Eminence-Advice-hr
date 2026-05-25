// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const helmet = require('helmet');
// const compression = require('compression');
// const rateLimit = require('express-rate-limit');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const path = require('path');

// dotenv.config({ path: './.env' });

// const app = express();

// // Security middleware
// app.use(helmet());
// app.use(compression());
// app.use(cors({
//   origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
//   credentials: true
// }));

// // Body parser
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// // Data sanitization against XSS
// app.use(xss());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 1000,
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api', limiter);

// // Static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Import routes
// const authRoutes = require('./src/routes/auth.routes');
// const jobRoutes = require('./src/routes/job.routes');
// const applicationRoutes = require('./src/routes/application.routes');
// const blogRoutes = require('./src/routes/blog.routes');
// const contactRoutes = require('./src/routes/contact.routes');
// const serviceRoutes = require('./src/routes/service.routes');
// const websiteContentRoutes = require('./src/routes/websiteContent.routes');
// const seoRoutes = require('./src/routes/seo.routes');
// const adminRoutes = require('./src/routes/admin.routes');
// const dashboardRoutes = require('./src/routes/dashboard.routes');

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/website', websiteContentRoutes);
// app.use('/api/seo', seoRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB Connected Successfully'))
// .catch(err => console.error('❌ MongoDB Connection Error:', err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://eminenceadvice.com', 'https://www.eminenceadvice.com', 'https://eminence-advice-hr.vercel.app'],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization
app.use(mongoSanitize());
app.use(xss());

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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============ MONGODB CONNECTION WITH RETRY LOGIC ============
const PORT = process.env.PORT || 5000;

const connectDB = async (retryCount = 0) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected Successfully');
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
      console.error('❌ Failed to connect after 5 attempts. Please check:');
      console.error('   1. Your internet connection');
      console.error('   2. MongoDB Atlas IP whitelist (0.0.0.0/0)');
      console.error('   3. Username/password are correct');
      console.error('   4. Try using VPN or mobile hotspot');
      process.exit(1);
    }
  }
};

connectDB();