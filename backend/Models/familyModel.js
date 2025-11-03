import { pool } from '../Config/db.js';
import { encryptText, decryptText } from '../Middleware/encrypt.js';
export { pool };

export const createFamilyTableIfNotExists = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS family_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nik VARCHAR(32) UNIQUE,
      name VARCHAR(1024) NOT NULL,
      dob VARCHAR(256) NULL,
      notes VARCHAR(2048) NULL,
      gender ENUM('male','female') DEFAULT 'male',
      father_id INT NULL,
      mother_id INT NULL,
      spouse_id INT NULL,
      generation INT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (father_id) REFERENCES family_members(id) ON DELETE SET NULL,
      FOREIGN KEY (mother_id) REFERENCES family_members(id) ON DELETE SET NULL
      -- spouse_id tetap tanpa FK
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  await pool.query(sql);
  console.log("✅ family_members table ready");
};

export const insertMember = async ({
  nik,
  name,
  dob = null,
  notes = null,
  gender = 'male',
  generation = 1,
  father_id = null,
  mother_id = null,
  spouse_id = null
}) => {
  const encName = encryptText(name);
  const encDob = dob ? encryptText(dob) : null;
  const encNotes = notes ? encryptText(notes) : null;

  const [res] = await pool.execute(
    `INSERT INTO family_members 
     (nik, name, dob, notes, gender, generation, father_id, mother_id, spouse_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nik, encName, encDob, encNotes, gender, generation, father_id, mother_id, spouse_id]
  );

  console.log(`✅ Inserted new member: ${name}`);
  return res.insertId;
};

export const updateMember = async (
  id,
  {
    nik,
    name,
    dob = null,
    notes = null,
    gender,
    generation,
    father_id = null,
    mother_id = null,
    spouse_id = null
  }
) => {
  const encName = encryptText(name);
  const encDob = dob ? encryptText(dob) : null;
  const encNotes = notes ? encryptText(notes) : null;

  await pool.execute(
    `UPDATE family_members 
     SET nik=?, name=?, dob=?, notes=?, gender=?, generation=?, father_id=?, mother_id=?, spouse_id=? 
     WHERE id=?`,
    [nik, encName, encDob, encNotes, gender, generation, father_id, mother_id, spouse_id, id]
  );

  console.log(`📝 Updated member ID ${id} (${name})`);
};


export const getAllMembers = async () => {
  const [rows] = await pool.query(`
    SELECT id, nik, name, dob, notes, gender, father_id, mother_id, spouse_id, generation
    FROM family_members
    ORDER BY id
  `);

  return rows.map(r => ({
    id: r.id,
    nik: r.nik,
    name: decryptText(r.name),
    dob: r.dob ? decryptText(r.dob) : null,
    notes: r.notes ? decryptText(r.notes) : null,
    gender: r.gender,
    father_id: r.father_id,
    mother_id: r.mother_id,
    spouse_id: r.spouse_id,
    generation: r.generation
  }));
};

export const getMemberById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM family_members WHERE id=?`, [id]);
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.id,
    nik: r.nik,
    name: decryptText(r.name),
    dob: r.dob ? decryptText(r.dob) : null,
    notes: r.notes ? decryptText(r.notes) : null,
    gender: r.gender,
    father_id: r.father_id,
    mother_id: r.mother_id,
    spouse_id: r.spouse_id,
    generation: r.generation
  };
};

export const deleteMember = async (id) => {
  await pool.execute(`DELETE FROM family_members WHERE id=?`, [id]);
  console.log(`🗑️ Deleted member ID: ${id}`);
};
