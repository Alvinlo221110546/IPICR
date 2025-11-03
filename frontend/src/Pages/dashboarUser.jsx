import React, { useEffect, useState } from "react";
import { getMembers, createMember, updateMember, deleteMember } from "../Utils/api.js";
import Footer from "../Componen/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import userpict from "../assets/user-default.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function UserDashboard() {
  const [members, setMembers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [treeVisible, setTreeVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nik: "",
    name: "",
    dob: "",
    gender: "male",
    father_id: null,
    mother_id: null,
    spouse_id: null,
    notes: "",
  });

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      await MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Silakan login terlebih dahulu",
      });
      window.location = "/login";
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nama wajib diisi!",
      });
      return;
    }

    const payload = {
      nik: form.nik,
      name: form.name,
      dob: form.dob,
      gender: form.gender,
      father_id: form.father_id ?? null,
      mother_id: form.mother_id ?? null,
      spouse_id: form.spouse_id ?? null,
      notes: form.notes,
    };

    try {
      if (editingId) {
        await updateMember(editingId, payload);
        await MySwal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Anggota keluarga berhasil diperbarui!",
        });
      } else {
        await createMember(payload);
        await MySwal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Anggota keluarga berhasil ditambahkan!",
        });
      }
      resetForm();
      await loadMembers();
    } catch (err) {
      await MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal menyimpan anggota keluarga",
      });
    }
  };

  const resetForm = () => {
    setForm({
      nik: "",
      name: "",
      dob: "",
      gender: "male",
      father_id: null,
      mother_id: null,
      spouse_id: null,
      notes: "",
    });
    setEditingId(null);
    setFormVisible(false);
  };

  const onEdit = (member) => {
    setForm({
      nik: member.nik,
      name: member.name,
      dob: member.dob,
      gender: member.gender,
      father_id: member.father_id,
      mother_id: member.mother_id,
      spouse_id: member.spouse_id,
      notes: member.notes,
    });
    setEditingId(member.id);
    setFormVisible(true);
  };

  const onDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Anggota ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMember(id);
      await loadMembers();
      await MySwal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Anggota berhasil dihapus",
      });
    } catch (err) {
      await MySwal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal menghapus anggota",
      });
    }
  };

 
  const buildTreeByGeneration = () => {
    const map = {};
    const roots = [];

    members.forEach((m) => {
      map[m.id] = { ...m, children: [], level: 0 };
    });

    members.forEach((m) => {
      const node = map[m.id];
      if (m.father_id && map[m.father_id]) {
        map[m.father_id].children.push(node);
        node.level = map[m.father_id].level + 1;
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const renderTreeByGeneration = (nodes) => {
    if (!nodes || nodes.length === 0) return null;

    const levels = {};

    const traverse = (node) => {
      if (!levels[node.level]) levels[node.level] = [];
      levels[node.level].push(node);
      node.children.forEach(traverse);
    };

    nodes.forEach(traverse);

    return Object.keys(levels)
      .sort((a, b) => a - b)
      .map((lvl) => (
        <div key={lvl} className="d-flex justify-content-center mb-3 gap-3">
          {levels[lvl].map((node) => (
            <div
              key={node.id}
              className={`p-2 border rounded text-center ${node.gender === "male"
                ? "bg-primary bg-opacity-10"
                : "bg-warning bg-opacity-10"
                }`}
              style={{ minWidth: "120px" }}
            >
              <strong>{node.name}</strong>
              <br />
              <span className="text-primary">
                ({node.gender === "male" ? "Laki-laki" : "Perempuan"})
              </span>
              <br />
              {node.dob && (
                <span className="text-muted">
                  {new Date(node.dob).toLocaleDateString()}
                </span>
              )}
              <br />
              {node.notes && (
                <span className="fst-italic text-secondary">[{node.notes}]</span>
              )}
            </div>
          ))}
        </div>
      ));
  };


  const getNameById = (id) => {
    if (!id) return "-";
    const member = members.find((m) => m.id === id);
    return member ? member.name : "-";
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <main className="container my-4">
        <h2 className="text-center mb-4 text-primary">Dashboard Keluarga Anda</h2>

        <div className="d-flex justify-content-center mb-3 gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? "Tutup Form" : editingId ? "Edit Anggota" : "Tambah Anggota"}
          </button>
          <button
            className="btn btn-success"
            onClick={() => setTreeVisible(!treeVisible)}
          >
            {treeVisible ? "Tutup Tree" : "Lihat Pedigree"}
          </button>
        </div>

        {formVisible && (
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="NIK"
                      className="form-control"
                      value={form.nik}
                      onChange={(e) => setForm({ ...form, nik: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="form-control"
                      value={form.name}
                      required
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <select
                      className="form-control"
                      value={form.father_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          father_id: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    >
                      <option value="">Pilih Ayah</option>
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      value={form.mother_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          mother_id: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    >
                      <option value="">Pilih Ibu</option>
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-control"
                      value={form.spouse_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          spouse_id: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                    >
                      <option value="">Pilih Pasangan</option>
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <textarea
                      placeholder="Catatan"
                      className="form-control"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-3 text-end">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "Perbarui Anggota" : "Simpan Anggota"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={resetForm}
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {treeVisible && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title text-center text-success mb-3">
                Pedigree Keluarga (Generasi)
              </h5>
              {members.length === 0 ? (
                <p className="text-center text-muted">Belum ada anggota.</p>
              ) : (
                renderTreeByGeneration(buildTreeByGeneration())
              )}
            </div>
          </div>
        )}


        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {members.length === 0 && (
            <p className="text-center text-muted">
              Belum ada anggota keluarga yang ditambahkan.
            </p>
          )}
          {members.map((m) => (
            <div key={m.id} className="col">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <img
                    src={userpict}
                    alt="Profile"
                    className="rounded-circle mb-2"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <h6 className="card-title text-primary">{m.name}</h6>
                  <p className="card-text text-muted mb-1">
                    {m.dob ? new Date(m.dob).toLocaleDateString() : "Tanggal tidak tersedia"}
                  </p>
                  <p className="card-text mb-1">
                    Gender: <strong>{m.gender === "male" ? "Laki-laki" : "Perempuan"}</strong>
                  </p>
                  <p className="card-text mb-1">Ayah: {getNameById(m.father_id)}</p>
                  <p className="card-text mb-1">Ibu: {getNameById(m.mother_id)}</p>
                  <p className="card-text mb-1">Pasangan: {getNameById(m.spouse_id)}</p>
                  <p className="card-text fst-italic text-secondary">{m.notes}</p>
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(m)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(m.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
