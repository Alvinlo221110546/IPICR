import { pool } from '../Config/db.js';

export const createAuditTableIfNotExists = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100),
    resource VARCHAR(100),
    resource_id INT,
    meta JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(sql);
};

export const insertAudit = async ({ user_id, action, resource, resource_id, meta }) => {
  await pool.execute(`INSERT INTO audit_logs (user_id, action, resource, resource_id, meta) VALUES (?, ?, ?, ?, ?)`, [
    user_id || null,
    action,
    resource,
    resource_id || null,
    JSON.stringify(meta || {})
  ]);
};
