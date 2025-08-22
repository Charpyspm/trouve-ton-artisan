import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

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

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
