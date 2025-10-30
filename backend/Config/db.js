import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'icr_pedigree',
  waitForConnections: true,
  connectionLimit: 10,
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4'
});


(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected!');
    connection.release(); 
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();
