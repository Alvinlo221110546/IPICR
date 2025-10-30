import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
dotenv.config();

import authRoutes from './Routes/authRoutes.js';
import familyRoutes from './Routes/familyRoutes.js';
import * as AuthController from './Controller/authController.js';
import * as AuditModel from './Models/auditModel.js';
import * as FamilyController from './Controller/familyController.js';
import contactRoutes from './Routes/contact.js';

const app = express();

// Security & basic middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}

const accessLogStream = fs.createWriteStream(path.join('./logs', 'access.log'), { flags: 'a' });


app.use(morgan('combined', { stream: accessLogStream }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Init DB tables
await AuthController.createUsersTableIfNotExists();
await AuditModel.createAuditTableIfNotExists();
await FamilyController.init();

// Seed admin user jika belum ada
import { pool } from './Config/db.js';
const [users] = await pool.query('SELECT COUNT(*) as cnt FROM users');
if (users[0].cnt === 0) {
  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.default.hash('admin123', 10);
  await pool.execute(
    'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
    ['admin', hash, 'admin']
  );
  console.log('✅ Seeded admin: admin / admin123');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);
app.use('/api', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) =>
  res.json({ status: 'ok', time: new Date().toISOString() })
);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend listening on http://localhost:${PORT}`)
);
