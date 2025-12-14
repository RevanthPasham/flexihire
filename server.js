require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import models
const User = require('./models/User');
const JobApplication = require('./models/JobApplication');
const Job = require('./models/Job');
const { generateJobs } = require('./utils/jobGenerator');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve your frontend files, including favicon.ico

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || (await MongoMemoryServer.create()).getUri();
    await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected (${process.env.MONGODB_URI ? 'from .env' : 'in-memory'})`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

connectDB();

// Multer config for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExts = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExts.includes(ext)) cb(null, true);
    else cb(new Error('Only PDF and Word documents are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Nodemailer setup (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'test@example.com', // your gmail email
    pass: process.env.EMAIL_PASS || 'testpass', // your gmail app password or real password
  },
});

// Temporary OTP store (replace with Redis for production)
const otpStore = new Map();

// Initialize database with jobs
async function initDB() {
  try {
    // Check if jobs already exist
    const existingJobs = await Job.countDocuments();
    if (existingJobs === 0) {
      const jobs = generateJobs();
      await Job.insertMany(jobs, { ordered: false });
      console.log(`✅ Seeded ${jobs.length} jobs in MongoDB`);
    } else {
      console.log('✅ Jobs already exist in database');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

// DB init will be called in startServer

// Routes

// Registration - send OTP
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  try {
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP + timestamp + user info temporarily
    otpStore.set(email, { otp, timestamp: Date.now() });
    otpStore.set(email + '_data', { name, phone, password });

    // Send OTP email
    console.log(`OTP for ${email}: ${otp}`); // Log OTP for testing
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'Your FlexiWork Registration OTP',
    //   html: `
    //     <h3>Welcome to FlexiWork!</h3>
    //     <p>Your OTP for registration is: <strong>${otp}</strong></p>
    //     <p>This OTP will expire in 10 minutes.</p>
    //   `,
    // });

    return res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('❌ Registration error:', error);
    return res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Verify OTP and create user
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  try {
    const stored = otpStore.get(email);
    const userData = otpStore.get(email + '_data');

    if (!stored || !userData) {
      return res.status(400).json({ success: false, message: 'OTP expired or invalid' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (Date.now() - stored.timestamp > 10 * 60 * 1000) { // 10 min expiry
      otpStore.delete(email);
      otpStore.delete(email + '_data');
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    // Create user in MongoDB
    const newUser = new User({
      name: userData.name,
      email,
      phone: userData.phone,
      password: userData.password,
    });

    const savedUser = await newUser.save();

    // Clear OTP data
    otpStore.delete(email);
    otpStore.delete(email + '_data');

    return res.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
      },
    });
  } catch (error) {
    console.error('❌ OTP verification error:', error);
    return res.status(500).json({ success: false, message: 'Verification failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Apply for job with resume upload
app.post('/api/apply-job', upload.single('resume'), async (req, res) => {
  const { userId, jobId, coverLetter, interestStatement, availability } = req.body;

  if (!userId || !jobId) {
    return res.status(400).json({ success: false, message: 'User ID and Job ID are required' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Resume file is required' });
  }

  try {
    const availabilityArr = availability ? availability.split(',') : [];

    const newApplication = new JobApplication({
      userId,
      jobId: parseInt(jobId),
      resumePath: req.file.path,
      coverLetter: coverLetter || '',
      interestStatement: interestStatement || '',
      availability: availabilityArr,
    });

    const savedApplication = await newApplication.save();

    return res.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: savedApplication._id,
    });
  } catch (error) {
    console.error('❌ Job application error:', error);

    // Delete uploaded file if DB insert fails
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete file after error:', err);
      });
    }

    return res.status(500).json({ success: false, message: 'Application submission failed' });
  }
});

// Get all job applications of a user
app.get('/api/applications/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const applications = await JobApplication.find({ userId }).sort({ createdAt: -1 });

    return res.json({ success: true, applications });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });
    return res.json({ success: true, jobs });
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server with port fallback
const startServer = async () => {
  try {
    await initDB();

    const server = app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Server shutting down...');
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        process.exit(0);
      });
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
