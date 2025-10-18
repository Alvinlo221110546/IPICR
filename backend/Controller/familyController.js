import * as Family from '../Models/familyModel.js';
import { insertAudit } from '../Models/auditModel.js';

export const init = async () => {
  await Family.createFamilyTableIfNotExists();
};


export const createMember = async (req, res) => {
  try {
    const { name, dob, father_name, mother_name, notes } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nama wajib diisi' });
    }

    const id = await Family.insertMember({
      name,
      dob,
      father_name,
      mother_name,
      notes,
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
    const id = req.params.id;
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
    const id = req.params.id;
    const { name, dob, father_name, mother_name, notes } = req.body;

    await Family.updateMember(id, {
      name,
      dob,
      father_name,
      mother_name,
      notes,
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
    const id = req.params.id;
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
