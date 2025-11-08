import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4'
});


(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    console.log(`📍 Host: ${process.env.DB_HOST}`);
    console.log(`📊 Database: ${process.env.DB_NAME}`);
    connection.release(); 
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('🔍 Check your .env file configuration');
  }
})();