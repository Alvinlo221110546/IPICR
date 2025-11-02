import React, { useEffect, useState } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../Utils/api.js';
import Footer from '../Componen/Footer.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// ==================== Member Form ====================
function MemberForm({ onDone, initial, members }) {
  const [form, setForm] = useState({
    nik: '',
    name: '',
    dob: '',
    notes: '',
    gender: 'male',
    father_id: null,
    mother_id: null,
    spouse_id: null,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        nik: initial.nik || '',
        name: initial.name || '',
        dob: initial.dob || '',
        notes: initial.notes || '',
        gender: initial.gender || 'male',
        father_id: initial.father_id || null,
        mother_id: initial.mother_id || null,
        spouse_id: initial.spouse_id || null,
      });
    }
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      await MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Nama wajib diisi',
        confirmButtonColor: '#d33',
      });
      return;
    }

    const payload = {
      nik: form.nik,
      name: form.name,
      dob: form.dob,
      notes: form.notes,
      gender: form.gender,
      father_id: form.father_id ? Number(form.father_id) : null,
      mother_id: form.mother_id ? Number(form.mother_id) : null,
      spouse_id: form.spouse_id ? Number(form.spouse_id) : null,
    };

    await onDone(payload);

    if (!initial) {
      setForm({
        nik: '',
        name: '',
        dob: '',
        notes: '',
        gender: 'male',
        father_id: null,
        mother_id: null,
        spouse_id: null,
      });
    }
  };

  return (
    <form onSubmit={submit} style={formStyle}>
      <input
        placeholder="NIK"
        value={form.nik}
        onChange={e => setForm({ ...form, nik: e.target.value })}
        style={inputStyle}
      />
      <input
        placeholder="Nama"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        style={inputStyle}
      />
      <input
        type="date"
        value={form.dob}
        onChange={e => setForm({ ...form, dob: e.target.value })}
        style={inputStyle}
      />
      <select
        value={form.gender}
        onChange={e => setForm({ ...form, gender: e.target.value })}
        style={inputStyle}
      >
        <option value="male">Laki-laki</option>
        <option value="female">Perempuan</option>
      </select>

      {/* Pilih Ayah */}
      <select
        value={form.father_id || ''}
        onChange={e => setForm({ ...form, father_id: e.target.value ? Number(e.target.value) : null })}
        style={inputStyle}
      >
        <option value="">Pilih Ayah</option>
        {members.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      {/* Pilih Ibu */}
      <select
        value={form.mother_id || ''}
        onChange={e => setForm({ ...form, mother_id: e.target.value ? Number(e.target.value) : null })}
        style={inputStyle}
      >
        <option value="">Pilih Ibu</option>
        {members.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      {/* Pilih Pasangan */}
      <select
        value={form.spouse_id || ''}
        onChange={e => setForm({ ...form, spouse_id: e.target.value ? Number(e.target.value) : null })}
        style={inputStyle}
      >
        <option value="">Pilih Pasangan</option>
        {members.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      <textarea
        placeholder="Catatan"
        value={form.notes}
        onChange={e => setForm({ ...form, notes: e.target.value })}
        style={{ ...inputStyle, minHeight: '60px' }}
      />
      <button type="submit" style={buttonStyle}>{initial ? 'Update' : 'Submit'}</button>
    </form>
  );
}

// ==================== Dashboard ====================
export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      await MySwal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: 'Silakan login terlebih dahulu',
        confirmButtonColor: '#3085d6',
      });
      window.location = '/login';
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (payload) => {
    try {
      await createMember(payload);
      await load();
      await MySwal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Member berhasil dibuat',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Gagal membuat member',
        confirmButtonColor: '#d33',
      });
    }
  };

  const onUpdate = async (payload) => {
    try {
      await updateMember(editing.id, payload);
      setEditing(null);
      await load();
      await MySwal.fire({
        icon: 'success',
        title: 'Sukses',
        text: 'Member berhasil diupdate',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Gagal update member',
        confirmButtonColor: '#d33',
      });
    }
  };

  const onDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data member akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMember(id);
      await load();
      await MySwal.fire({
        icon: 'success',
        title: 'Terhapus!',
        text: 'Member berhasil dihapus',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Gagal menghapus member',
        confirmButtonColor: '#d33',
      });
    }
  };

  const getNameById = (id) => {
    if (!id) return '';
    const m = members.find(x => x.id === id);
    return m ? m.name : '';
  };

  return (
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
                    <th style={thStyle}>Ayah</th>
                    <th style={thStyle}>Ibu</th>
                    <th style={thStyle}>Pasangan</th>
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
                      <td style={tdStyle}>{getNameById(m.father_id)}</td>
                      <td style={tdStyle}>{getNameById(m.mother_id)}</td>
                      <td style={tdStyle}>{getNameById(m.spouse_id)}</td>
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
  );
}

// ==================== Styles ====================
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
