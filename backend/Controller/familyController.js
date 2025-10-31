import * as Family from '../Models/familyModel.js';
import { insertAudit } from '../Models/auditModel.js';


export const init = async () => {
  await Family.createFamilyTableIfNotExists();
};


export const createMember = async (req, res) => {
  try {
    const {
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
    } = req.body;

    
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Nama wajib diisi' });
    }

    if (!nik || nik.length < 10) {
      return res.status(400).json({ message: 'NIK tidak valid' });
    }

   
    const pid = parent_id ? parseInt(parent_id) : null;
    const sid = spouse_id ? parseInt(spouse_id) : null;
    const gid = grandfather_id ? parseInt(grandfather_id) : null;
    const gm_id = grandmother_id ? parseInt(grandmother_id) : null;
    const gen = generation ? parseInt(generation) : 1;

    const id = await Family.insertMember({
      nik,
      name,
      dob,
      father_name,
      mother_name,
      notes,
      parent_id: pid,
      gender: gender || 'male',
      spouse_id: sid,
      generation: gen,
      grandfather_id: gid,
      grandmother_id: gm_id
    });

    await insertAudit({
      user_id: req.user?.userId,
      action: 'create',
      resource: 'member',
      resource_id: id,
      meta: { name_masked: name.slice(0, 2) + '***' },
    });

    res.status(201).json({ message: 'Member created successfully', id });
  } catch (err) {
    console.error('❌ Error creating member:', err);
    res.status(500).json({ message: 'Error creating member', error: err.message });
  }
};


export const getMembers = async (req, res) => {
  try {
    const rows = await Family.getAllMembers();
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching members:', err);
    res.status(500).json({ message: 'Error fetching members', error: err.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' });

    const member = await Family.getMemberById(id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    res.json(member);
  } catch (err) {
    console.error('❌ Error fetching member by ID:', err);
    res.status(500).json({ message: 'Error fetching member', error: err.message });
  }
};


export const updateMember = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' });

    const {
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
    } = req.body;

   
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Nama wajib diisi' });
    }

    
    const pid = parent_id ? parseInt(parent_id) : null;
    const sid = spouse_id ? parseInt(spouse_id) : null;
    const gid = grandfather_id ? parseInt(grandfather_id) : null;
    const gm_id = grandmother_id ? parseInt(grandmother_id) : null;
    const gen = generation ? parseInt(generation) : 1;

    await Family.updateMember(id, {
      nik,
      name,
      dob,
      father_name,
      mother_name,
      notes,
      parent_id: pid,
      gender: gender || 'male',
      spouse_id: sid,
      generation: gen,
      grandfather_id: gid,
      grandmother_id: gm_id
    });

    await insertAudit({
      user_id: req.user?.userId,
      action: 'update',
      resource: 'member',
      resource_id: id,
    });

    res.json({ message: 'Member updated successfully' });
  } catch (err) {
    console.error('❌ Error updating member:', err);
    res.status(500).json({ message: 'Error updating member', error: err.message });
  }
};


export const deleteMember = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID tidak valid' });

    await Family.deleteMember(id);

    await insertAudit({
      user_id: req.user?.userId,
      action: 'delete',
      resource: 'member',
      resource_id: id,
    });

    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting member:', err);
    res.status(500).json({ message: 'Error deleting member', error: err.message });
  }
};
