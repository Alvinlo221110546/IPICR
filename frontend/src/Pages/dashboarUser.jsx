import React, { useEffect, useState } from "react";
import { getMembers, createMember } from "../Utils/api.js";
import Footer from "../Componen/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import userpict from "../assets/user-default.png";

export default function UserDashboard() {
  const [members, setMembers] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [treeVisible, setTreeVisible] = useState(false);

  const [form, setForm] = useState({
    nik: "",
    name: "",
    dob: "",
    gender: "male",
    father_name: "",
    mother_name: "",
    spouse_id: null,
    parent_id: null,
    generation: 1,
    grandfather_id: null,
    grandmother_id: null,
    notes: "",
  });

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      alert("Silakan login terlebih dahulu");
      window.location = "/login";
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      spouse_id: form.spouse_id ?? null,
      parent_id: form.parent_id ?? null,
      generation: form.generation ? Number(form.generation) : 1,
      grandfather_id: form.grandfather_id ?? null,
      grandmother_id: form.grandmother_id ?? null,
    };

    try {
      await createMember(payload);
      // Reset form
      setForm({
        nik: "",
        name: "",
        dob: "",
        gender: "male",
        father_name: "",
        mother_name: "",
        spouse_id: null,
        parent_id: null,
        generation: 1,
        grandfather_id: null,
        grandmother_id: null,
        notes: "",
      });
      setFormVisible(false);
      await loadMembers();
    } catch (err) {
      alert(err.message || "Gagal membuat anggota keluarga");
    }
  };

 
  // TREE VIEW GENERATOR
  const buildTree = () => {
    const map = {};
    const roots = [];

    // Buat map dengan ID
    members.forEach((m) => {
      map[m.id] = { ...m, children: [] };
    });

    members.forEach((m) => {
      const node = map[m.id];
      if (m.parent_id && map[m.parent_id]) {
        map[m.parent_id].children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <ul key={node.id} className="list-group list-group-flush ms-4 mt-2">
        <li className="list-group-item border-0 p-1">
          <strong>{node.name}</strong>{" "}
          {node.gender && (
            <span className="text-primary">
              ({node.gender === "male" ? "Laki-laki" : "Perempuan"})
            </span>
          )}
          {node.dob && ` (${new Date(node.dob).toLocaleDateString()})`}
          {node.notes && (
            <span className="text-muted ms-2 fst-italic">[{node.notes}]</span>
          )}
          {node.children.length > 0 && renderTree(node.children)}
        </li>
      </ul>
    ));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <main className="container my-4">
        <h2 className="text-center mb-4 text-primary">Dashboard Keluarga Anda</h2>

        {/* Toggle Form */}
        <div className="d-flex justify-content-center mb-3 gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? "Tutup Form" : "Tambah Anggota"}
          </button>
          <button
            className="btn btn-success"
            onClick={() => setTreeVisible(!treeVisible)}
          >
            {treeVisible ? "Tutup Tree" : "Lihat Pedigree"}
          </button>
        </div>

        {/* FORM INPUT */}
        {formVisible && (
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={onCreate}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="NIK"
                      className="form-control"
                      value={form.nik}
                      onChange={(e) =>
                        setForm({ ...form, nik: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      value={form.dob}
                      onChange={(e) =>
                        setForm({ ...form, dob: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                    >
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="ID Orang Tua"
                      className="form-control"
                      value={form.parent_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          parent_id: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="ID Pasangan"
                      className="form-control"
                      value={form.spouse_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          spouse_id: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="Generasi"
                      className="form-control"
                      value={form.generation}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          generation: e.target.value
                            ? Number(e.target.value)
                            : 1,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Nama Ayah"
                      className="form-control"
                      value={form.father_name}
                      onChange={(e) =>
                        setForm({ ...form, father_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      placeholder="Nama Ibu"
                      className="form-control"
                      value={form.mother_name}
                      onChange={(e) =>
                        setForm({ ...form, mother_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="ID Kakek"
                      className="form-control"
                      value={form.grandfather_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          grandfather_id: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      placeholder="ID Nenek"
                      className="form-control"
                      value={form.grandmother_id ?? ""}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          grandmother_id: e.target.value
                            ? Number(e.target.value)
                            : null,
                        })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      placeholder="Catatan"
                      className="form-control"
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-3 text-end">
                  <button type="submit" className="btn btn-primary">
                    Simpan Anggota
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TREE VIEW */}
        {treeVisible && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title text-center text-success mb-3">
                Pedigree Keluarga
              </h5>
              {members.length === 0 ? (
                <p className="text-center text-muted">Belum ada anggota.</p>
              ) : (
                renderTree(buildTree())
              )}
            </div>
          </div>
        )}

        {/* CARD LIST */}
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
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <h6 className="card-title text-primary">{m.name}</h6>
                  <p className="card-text text-muted mb-1">
                    {m.dob
                      ? new Date(m.dob).toLocaleDateString()
                      : "Tanggal tidak tersedia"}
                  </p>
                  <p className="card-text mb-1">
                    Gender:{" "}
                    <strong>
                      {m.gender === "male" ? "Laki-laki" : "Perempuan"}
                    </strong>
                  </p>
                  <p className="card-text mb-1">Generasi: {m.generation}</p>
                  <p className="card-text mb-1">Ayah: {m.father_name || "-"}</p>
                  <p className="card-text mb-1">Ibu: {m.mother_name || "-"}</p>
                  <p className="card-text fst-italic text-secondary">
                    {m.notes}
                  </p>
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
