import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5174;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'trouve_ton_artisan',
  charset: 'utf8mb4_general_ci',
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/artisans', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT `Nom`,`Spécialité`,`Note`,`Ville`,`A_propos`,`Email`,`Site_Web`,`Catégorie`,`Top` FROM `artisans`');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/artisans/:nom', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `artisans` WHERE `Nom` = ?', [req.params.nom]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Transporter for sending emails (configure via env)
const mailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

// Contact endpoint: send message to the artisan's email from DB
app.post('/api/artisans/:nom/contact', async (req, res) => {
  try {
    const { nom } = req.params;
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const [rows] = await pool.query('SELECT `Email` FROM `artisans` WHERE `Nom` = ?', [nom]);
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ error: 'Artisan not found' });
    }
    const dest = rows[0].Email;
    if (!dest) {
      return res.status(400).json({ error: 'Artisan has no email' });
    }

    // Compose email
    const fromAddr = process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@example.com';
    const siteName = process.env.SITE_NAME || 'Trouve ton artisan';

    await mailTransporter.sendMail({
      from: fromAddr,
      to: dest,
      replyTo: email,
      subject: `Nouveau message de ${name} — ${siteName}`,
      text: `Vous avez reçu un nouveau message pour ${nom} :\n\nDe: ${name} <${email}>\n\n${message}`,
      html: `<p>Vous avez reçu un nouveau message pour <strong>${nom}</strong>.</p>
             <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
             <p style="white-space:pre-wrap">${message}</p>`,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
