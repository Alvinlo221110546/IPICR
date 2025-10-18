import { pool } from '../Config/db.js';
import { encryptText, decryptText } from '../Middleware/encrypt.js';

// 🧱 Buat tabel family_members jika belum ada
export const createFamilyTableIfNotExists = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS family_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1024) NOT NULL,
    dob VARCHAR(256),
    father_name VARCHAR(1024),
    mother_name VARCHAR(1024),
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(sql);
};

// ✨ Tambah anggota baru
export const insertMember = async ({ name, dob, father_name, mother_name, notes }) => {
  const encName = encryptText(name);
  const encDob = dob ? encryptText(dob) : null;
  const encFather = father_name ? encryptText(father_name) : null;
  const encMother = mother_name ? encryptText(mother_name) : null;
  const encNotes = notes ? encryptText(notes) : null;

  const [res] = await pool.execute(
    `INSERT INTO family_members (name, dob, father_name, mother_name, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [encName, encDob, encFather, encMother, encNotes]
  );

  return res.insertId;
};

// 📋 Ambil semua anggota keluarga
export const getAllMembers = async () => {
  const [rows] = await pool.query(`
    SELECT id, name, dob, father_name, mother_name, notes
    FROM family_members
    ORDER BY id
  `);

  return rows.map((r) => ({
    id: r.id,
    name: decryptText(r.name),
    dob: r.dob ? decryptText(r.dob) : '',
    father_name: r.father_name ? decryptText(r.father_name) : '',
    mother_name: r.mother_name ? decryptText(r.mother_name) : '',
    notes: r.notes ? decryptText(r.notes) : ''
  }));
};

// 🔍 Ambil anggota berdasarkan ID
export const getMemberById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM family_members WHERE id=?`, [id]);
  if (rows.length === 0) return null;

  const r = rows[0];
  return {
    id: r.id,
    name: decryptText(r.name),
    dob: r.dob ? decryptText(r.dob) : '',
    father_name: r.father_name ? decryptText(r.father_name) : '',
    mother_name: r.mother_name ? decryptText(r.mother_name) : '',
    notes: r.notes ? decryptText(r.notes) : ''
  };
};

// 📝 Update data anggota
export const updateMember = async (id, { name, dob, father_name, mother_name, notes }) => {
  const encName = encryptText(name);
  const encDob = dob ? encryptText(dob) : null;
  const encFather = father_name ? encryptText(father_name) : null;
  const encMother = mother_name ? encryptText(mother_name) : null;
  const encNotes = notes ? encryptText(notes) : null;

  await pool.execute(
    `UPDATE family_members 
     SET name=?, dob=?, father_name=?, mother_name=?, notes=? 
     WHERE id=?`,
    [encName, encDob, encFather, encMother, encNotes, id]
  );
};

// ❌ Hapus anggota
export const deleteMember = async (id) => {
  await pool.execute(`DELETE FROM family_members WHERE id=?`, [id]);
};
