require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve your frontend files, including favicon.ico

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test DB connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ DB connected at:', res.rows[0].now);
  }
});

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
    user: process.env.EMAIL_USER, // your gmail email
    pass: process.env.EMAIL_PASS, // your gmail app password or real password
  },
});

// Temporary OTP store (replace with Redis for production)
const otpStore = new Map();

// DB tables initialization
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS job_applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        job_id INTEGER NOT NULL,
        resume_path VARCHAR(255) NOT NULL,
        cover_letter TEXT,
        interest_statement TEXT,
        availability TEXT[],
        status VARCHAR(50) DEFAULT 'In Review',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

// Call DB init on startup
initDB();

// Routes

// Registration - send OTP
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }

  try {
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP + timestamp + user info temporarily
    otpStore.set(email, { otp, timestamp: Date.now() });
    otpStore.set(email + '_data', { name, phone, password });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your FlexiWork Registration OTP',
      html: `
        <h3>Welcome to FlexiWork!</h3>
        <p>Your OTP for registration is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

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

    // Insert user into DB
    const insertRes = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [userData.name, email, userData.phone, userData.password]
    );

    // Clear OTP data
    otpStore.delete(email);
    otpStore.delete(email + '_data');

    return res.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: insertRes.rows[0].id,
        name: userData.name,
        email,
        phone: userData.phone,
      },
    });
  } catch (error) {
    console.error('❌ OTP verification error:', error);
    return res.status(500).json({ success: false, message: 'Verification failed' });
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

    const insertRes = await pool.query(
      `INSERT INTO job_applications 
       (user_id, job_id, resume_path, cover_letter, interest_statement, availability) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, jobId, req.file.path, coverLetter || null, interestStatement || null, availabilityArr]
    );

    return res.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: insertRes.rows[0].id,
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
    const result = await pool.query(
      'SELECT * FROM job_applications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return res.json({ success: true, applications: result.rows });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch applications' });
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
      server.close(() => {
        pool.end(() => {
          console.log('Database pool closed.');
          process.exit(0);
        });
      });
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
