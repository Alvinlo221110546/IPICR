import React, { useEffect, useState } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../Utils/api.js';
import Footer from '../Componen/Footer.jsx';

// ========================
// Form untuk tambah/edit
// ========================
function MemberForm({ onDone, initial, members }) {
  const [form, setForm] = useState({
    nik: '',
    name: '',
    dob: '',
    father_name: '',
    mother_name: '',
    notes: '',
    gender: 'male',
    spouse_id: null,
    parent_id: null,
    generation: 1,
    grandfather_id: null,
    grandmother_id: null,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        nik: initial.nik || '',
        name: initial.name || '',
        dob: initial.dob || '',
        father_name: initial.father_name || '',
        mother_name: initial.mother_name || '',
        notes: initial.notes || '',
        gender: initial.gender || 'male',
        spouse_id: initial.spouse_id || null,
        parent_id: initial.parent_id || null,
        generation: initial.generation || 1,
        grandfather_id: initial.grandfather_id || null,
        grandmother_id: initial.grandmother_id || null,
      });
    }
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert('Nama wajib diisi');
      return;
    }

    const payload = {
      nik: form.nik,
      name: form.name,
      dob: form.dob,
      father_name: form.father_name,
      mother_name: form.mother_name,
      notes: form.notes,
      gender: form.gender,
      spouse_id: form.spouse_id ? Number(form.spouse_id) : null,
      parent_id: form.parent_id ? Number(form.parent_id) : null,
      generation: form.generation ? Number(form.generation) : 1,
      grandfather_id: form.grandfather_id ? Number(form.grandfather_id) : null,
      grandmother_id: form.grandmother_id ? Number(form.grandmother_id) : null,
    };

    await onDone(payload);

    if (!initial) {
      setForm({
        nik: '',
        name: '',
        dob: '',
        father_name: '',
        mother_name: '',
        notes: '',
        gender: 'male',
        spouse_id: null,
        parent_id: null,
        generation: 1,
        grandfather_id: null,
        grandmother_id: null,
      });
    }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <input placeholder="NIK" value={form.nik} onChange={e => setForm({ ...form, nik: e.target.value })} style={inputStyle} />
      <input placeholder="Nama" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
      <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} style={inputStyle} />
      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} style={inputStyle}>
        <option value="male">Laki-laki</option>
        <option value="female">Perempuan</option>
      </select>
      <input placeholder="Nama Ayah" value={form.father_name} onChange={e => setForm({ ...form, father_name: e.target.value })} style={inputStyle} />
      <input placeholder="Nama Ibu" value={form.mother_name} onChange={e => setForm({ ...form, mother_name: e.target.value })} style={inputStyle} />
      <input placeholder="ID Pasangan" type="number" value={form.spouse_id || ''} onChange={e => setForm({ ...form, spouse_id: e.target.value ? Number(e.target.value) : null })} style={inputStyle} />
      <input placeholder="ID Orang Tua" type="number" value={form.parent_id || ''} onChange={e => setForm({ ...form, parent_id: e.target.value ? Number(e.target.value) : null })} style={inputStyle} />
      <input placeholder="Generasi" type="number" value={form.generation} onChange={e => setForm({ ...form, generation: e.target.value ? Number(e.target.value) : 1 })} style={inputStyle} />
      <input placeholder="ID Kakek" type="number" value={form.grandfather_id || ''} onChange={e => setForm({ ...form, grandfather_id: e.target.value ? Number(e.target.value) : null })} style={inputStyle} />
      <input placeholder="ID Nenek" type="number" value={form.grandmother_id || ''} onChange={e => setForm({ ...form, grandmother_id: e.target.value ? Number(e.target.value) : null })} style={inputStyle} />
      <textarea placeholder="Catatan" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, minHeight: '60px' }} />
      <button type="submit" style={buttonStyle}>{initial ? 'Update' : 'Submit'}</button>
    </form>
  );
}

// ========================
// Dashboard utama
// ========================
export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      alert('Silakan login terlebih dahulu');
      window.location = '/login';
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (payload) => {
    try {
      await createMember(payload);
      await load();
    } catch (err) {
      alert(err.message || 'Gagal membuat member');
    }
  };

  const onUpdate = async (payload) => {
    try {
      await updateMember(editing.id, payload);
      setEditing(null);
      await load();
    } catch (err) {
      alert(err.message || 'Gagal update member');
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    try {
      await deleteMember(id);
      await load();
    } catch (err) {
      alert(err.message || 'Gagal menghapus member');
    }
  };

  const getNameById = (id) => {
    if (!id) return '';
    const m = members.find(x => x.id === id);
    return m ? m.name : '';
  };

  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1, padding: '32px 64px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#1565c0', marginBottom: '12px' }}>{editing ? 'Edit Member' : 'Tambah Member'}</h3>
              <MemberForm initial={editing} onDone={editing ? onUpdate : onCreate} members={members} />
            </div>

            <div style={{ flex: 2 }}>
              <h3 style={{ color: '#1565c0', marginBottom: '12px' }}>Daftar Anggota</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <thead style={{ backgroundColor: '#1565c0', color: 'white' }}>
                    <tr>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>NIK</th>
                      <th style={thStyle}>Nama</th>
                      <th style={thStyle}>Gender</th>
                      <th style={thStyle}>Generasi</th>
                      <th style={thStyle}>Tanggal Lahir</th>
                      <th style={thStyle}>Nama Ayah</th>
                      <th style={thStyle}>Nama Ibu</th>
                      <th style={thStyle}>Kakek</th>
                      <th style={thStyle}>Nenek</th>
                      <th style={thStyle}>Catatan</th>
                      <th style={thStyle}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, idx) => (
                      <tr key={m.id} style={{ backgroundColor: idx % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                        <td style={tdStyle}>{m.id}</td>
                        <td style={tdStyle}>{m.nik || ''}</td>
                        <td style={tdStyle}>{m.name}</td>
                        <td style={tdStyle}>{m.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</td>
                        <td style={tdStyle}>{m.generation}</td>
                        <td style={tdStyle}>{m.dob || ''}</td>
                        <td style={tdStyle}>{m.father_name || ''}</td>
                        <td style={tdStyle}>{m.mother_name || ''}</td>
                        <td style={tdStyle}>{getNameById(m.grandfather_id)}</td>
                        <td style={tdStyle}>{getNameById(m.grandmother_id)}</td>
                        <td style={tdStyle}>{m.notes || ''}</td>
                        <td style={tdStyle}>
                          <button onClick={() => setEditing(m)} style={editBtn}>Edit</button>
                          <button onClick={() => onDelete(m.id)} style={delBtn}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// ========================
// Styles
// ========================
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  background: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
};

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1.5px solid #90caf9',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
  boxSizing: 'border-box',
};

const buttonStyle = {
  backgroundColor: '#1565c0',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background 0.3s',
};

const thStyle = { padding: '10px', textAlign: 'left', fontWeight: '600' };
const tdStyle = { padding: '8px 10px', borderBottom: '1px solid #e0e0e0', fontSize: '14px' };
const editBtn = { backgroundColor: '#64b5f6', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '6px' };
const delBtn = { backgroundColor: '#e57373', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '5px', cursor: 'pointer' };
