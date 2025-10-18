import { pool } from '../Config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || 'icr_token';

export const createUsersTableIfNotExists = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(sql);
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username & password required' });
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.execute(`INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`, [username, hash, role || 'user']);
    res.json({ message: 'registered' });
  } catch (e) {
    res.status(400).json({ message: 'username exists or invalid' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.execute(`SELECT id, password_hash, role FROM users WHERE username=?`, [username]);
  const user = rows[0];
  if (!user) return res.status(401).json({ message: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'invalid credentials' });
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '6h' });
  res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
  res.json({ message: 'ok', role: user.role });
};

export const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ message: 'logged out' });
};
