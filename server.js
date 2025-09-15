// server.js
'use strict';

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

/**
 * Build the Postgres connection string from environment variables.
 * Priority:
 *  1. process.env.DATABASE_URL
 *  2. DB_USER/DB_PASSWORD/DB_HOST/DB_PORT/DB_NAME
 */
function buildConnectionString() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT = '5432',
    DB_NAME,
  } = process.env;

  if (DB_USER && DB_PASSWORD && DB_HOST && DB_NAME) {
    const user = encodeURIComponent(DB_USER);
    const pass = encodeURIComponent(DB_PASSWORD);
    const host = DB_HOST;
    const port = DB_PORT;
    const db = encodeURIComponent(DB_NAME);
    return `postgresql://${user}:${pass}@${host}:${port}/${db}`;
  }

  return null;
}

const connectionString = buildConnectionString();
if (!connectionString) {
  console.error(
    'FATAL: No database configuration found. Set DATABASE_URL or DB_USER/DB_PASSWORD/DB_HOST/DB_NAME in environment.'
  );
  process.exit(1);
}

// Configure pool. Enable SSL when the host is NOT localhost.
const poolConfig = { connectionString };

// Determine whether the connection targets localhost
const isLocal = /localhost|127\.0\.0\.1|::1/.test(connectionString);
if (!isLocal) {
  // For Render / Heroku-like managed Postgres, SSL is required and often
  // rejectUnauthorized must be set to false.
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

// Initialize DB connection (simple test)
async function initDB() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected. Server time:', result.rows[0].now);
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    // Exit so Render (or other hosts) mark the deploy as failed and you can inspect logs.
    process.exit(1);
  }
}

// Example routes
app.get('/', (req, res) => {
  res.send('Hello — server is up. Use /health or /db-time to check.');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/db-time', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.json({ now: rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'DB query error', detail: err.message });
  }
});

// route showing whether email env is set (safe — no secret values returned)
app.get('/env-info', (req, res) => {
  res.json({
    db: {
      configured: !!connectionString,
      host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via DATABASE_URL' : null),
      name: process.env.DB_NAME || null,
    },
    email_user_set: !!process.env.EMAIL_USER,
  });
});

async function start() {
  await initDB();
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

// start server
start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = { app, pool };
