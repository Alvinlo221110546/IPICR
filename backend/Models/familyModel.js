import { pool } from '../Config/db.js';
import { encryptText, decryptText } from '../Middleware/encrypt.js';

// Buat tabel family_members jika belum ada
export const createFamilyTableIfNotExists = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS family_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nik VARCHAR(32) UNIQUE,
    name VARCHAR(1024) NOT NULL,
    dob VARCHAR(256),
    father_name VARCHAR(1024),
    mother_name VARCHAR(1024),
    notes VARCHAR(2048),
    gender ENUM('male','female') DEFAULT 'male',
    parent_id INT,
    spouse_id INT,
    grandfather_id INT,
    grandmother_id INT,
    generation INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES family_members(id) ON DELETE SET NULL,
    FOREIGN KEY (spouse_id) REFERENCES family_members(id) ON DELETE SET NULL,
    FOREIGN KEY (grandfather_id) REFERENCES family_members(id) ON DELETE SET NULL,
    FOREIGN KEY (grandmother_id) REFERENCES family_members(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(sql);
};

// Tambah anggota baru
export const insertMember = async ({
  nik,
  name,
  dob,
  father_name,
  mother_name,
  notes,
  parent_id,
  gender = 'male',
  generation = 1,
  spouse_id,
  grandfather_id,
  grandmother_id
}) => {
  const encName = encryptText(name);
  const encDob = dob ? encryptText(dob) : '';
  const encFather = father_name ? encryptText(father_name) : '';
  const encMother = mother_name ? encryptText(mother_name) : '';
  const encNotes = notes ? encryptText(notes) : '';

  // Gunakan null jika tidak ada
  const pid = parent_id ? parseInt(parent_id) : null;
  const sid = spouse_id ? parseInt(spouse_id) : null;
  const gid = grandfather_id ? parseInt(grandfather_id) : null;
  const gm_id = grandmother_id ? parseInt(grandmother_id) : null;

  const [res] = await pool.execute(
    `INSERT INTO family_members 
     (nik, name, dob, father_name, mother_name, notes, parent_id, gender, generation, spouse_id, grandfather_id, grandmother_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nik, encName, encDob, encFather, encMother, encNotes, pid, gender, generation, sid, gid, gm_id]
  );

  return res.insertId;
};


// Update data anggota
export const updateMember = async (
  id,
  {
    nik,
    name,
    dob,
    father_name,
    mother_name,
    notes,
    parent_id,
    gender,
    spouse_id,
    generation,
    grandfather_id,
    grandmother_id
  }
) => {
  const encName = encryptText(name);
  const encDob = dob ? encryptText(dob) : '';
  const encFather = father_name ? encryptText(father_name) : '';
  const encMother = mother_name ? encryptText(mother_name) : '';
  const encNotes = notes ? encryptText(notes) : '';

  // Gunakan null jika tidak ada
  const pid = parent_id ? parseInt(parent_id) : null;
  const sid = spouse_id ? parseInt(spouse_id) : null;
  const gid = grandfather_id ? parseInt(grandfather_id) : null;
  const gm_id = grandmother_id ? parseInt(grandmother_id) : null;

  await pool.execute(
    `UPDATE family_members 
     SET nik=?, name=?, dob=?, father_name=?, mother_name=?, notes=?, parent_id=?, gender=?, spouse_id=?, generation=?, grandfather_id=?, grandmother_id=? 
     WHERE id=?`,
    [nik, encName, encDob, encFather, encMother, encNotes, pid, gender, sid, generation, gid, gm_id, id]
  );
};

// Ambil semua anggota
export const getAllMembers = async () => {
  const [rows] = await pool.query(`
    SELECT id, nik, name, dob, father_name, mother_name, notes, gender, parent_id, spouse_id, generation, grandfather_id, grandmother_id
    FROM family_members
    ORDER BY id
  `);

  return rows.map(r => ({
    id: r.id,
    nik: r.nik,
    name: decryptText(r.name),
    dob: r.dob ? decryptText(r.dob) : '',
    father_name: r.father_name ? decryptText(r.father_name) : '',
    mother_name: r.mother_name ? decryptText(r.mother_name) : '',
    notes: r.notes ? decryptText(r.notes) : '',
    gender: r.gender,
    parent_id: r.parent_id,
    spouse_id: r.spouse_id,
    generation: r.generation,
    grandfather_id: r.grandfather_id,
    grandmother_id: r.grandmother_id
  }));
};

// Ambil anggota berdasarkan ID
export const getMemberById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM family_members WHERE id=?`, [id]);
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.id,
    nik: r.nik,
    name: decryptText(r.name),
    dob: r.dob ? decryptText(r.dob) : '',
    father_name: r.father_name ? decryptText(r.father_name) : '',
    mother_name: r.mother_name ? decryptText(r.mother_name) : '',
    notes: r.notes ? decryptText(r.notes) : '',
    gender: r.gender,
    parent_id: r.parent_id,
    spouse_id: r.spouse_id,
    generation: r.generation,
    grandfather_id: r.grandfather_id,
    grandmother_id: r.grandmother_id
  };
};

// Hapus anggota
export const deleteMember = async (id) => {
  await pool.execute(`DELETE FROM family_members WHERE id=?`, [id]);
};
