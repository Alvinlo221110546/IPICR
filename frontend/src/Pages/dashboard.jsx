import React, { useEffect, useState } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../Utils/api.js';
import Header from '../Componen/Header.jsx';
import Footer from '../Componen/Footer.jsx';

function MemberForm({ onDone, initial }) {
  const [form, setForm] = useState(initial || {
    name: '', dob: '', father_name: '', mother_name: '', notes: ''
  });

  useEffect(() => {
    setForm(initial || {
      name: '', dob: '', father_name: '', mother_name: '', notes: ''
    });
  }, [initial]);

  const submit = async (e) => {
    e.preventDefault();
    await onDone(form);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
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
      <input
        placeholder="Nama Ayah (optional)"
        value={form.father_name}
        onChange={e => setForm({ ...form, father_name: e.target.value })}
        style={inputStyle}
      />
      <input
        placeholder="Nama Ibu (optional)"
        value={form.mother_name}
        onChange={e => setForm({ ...form, mother_name: e.target.value })}
        style={inputStyle}
      />
      <input
        placeholder="Catatan"
        value={form.notes}
        onChange={e => setForm({ ...form, notes: e.target.value })}
        style={inputStyle}
      />
      <button
        type="submit"
        style={{
          backgroundColor: '#1565c0',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'background 0.3s',
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#0d47a1'}
        onMouseLeave={e => e.target.style.backgroundColor = '#1565c0'}
      >
        {initial ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}

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

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      alert('Please login');
      window.location = '/login';
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (payload) => {
    await createMember(payload);
    await load();
  };

  const onUpdate = async (payload) => {
    await updateMember(editing.id, payload);
    setEditing(null);
    await load();
  };

  const onDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    await deleteMember(id);
    await load();
  };

  return (
    <>
      <div style={{ marginBottom:'100px' }}>
        <Header />
      </div>
      <div style={{ minHeight: '1000vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>

        <main style={{
          flex: 1,
          padding: '32px 64px',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#1565c0', marginBottom: '12px' }}>
                {editing ? 'Edit Member' : 'Tambah Member'}
              </h3>
              <MemberForm
                initial={editing || null}
                onDone={editing ? onUpdate : onCreate}
              />
            </div>

            <div style={{ flex: 2 }}>
              <h3 style={{ color: '#1565c0', marginBottom: '12px' }}>Daftar Anggota</h3>
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <thead style={{ backgroundColor: '#1565c0', color: 'white' }}>
                    <tr>
                      <th style={thStyle}>ID</th>
                      <th style={thStyle}>Nama</th>
                      <th style={thStyle}>Tanggal Lahir</th>
                      <th style={thStyle}>Nama Ayah</th>
                      <th style={thStyle}>Nama Ibu</th>
                      <th style={thStyle}>Catatan</th>
                      <th style={thStyle}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m, idx) => (
                      <tr key={m.id} style={{ backgroundColor: idx % 2 === 0 ? '#f8f9fa' : '#fff' }}>
                        <td style={tdStyle}>{m.id}</td>
                        <td style={tdStyle}>{m.name}</td>
                        <td style={tdStyle}>{m.dob || ''}</td>
                        <td style={tdStyle}>{m.father_name || ''}</td>
                        <td style={tdStyle}>{m.mother_name || ''}</td>
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

const thStyle = {
  padding: '10px',
  textAlign: 'left',
  fontWeight: '600',
};

const tdStyle = {
  padding: '8px 10px',
  borderBottom: '1px solid #e0e0e0',
  fontSize: '14px',
};

const editBtn = {
  backgroundColor: '#64b5f6',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '6px',
};

const delBtn = {
  backgroundColor: '#e57373',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};
