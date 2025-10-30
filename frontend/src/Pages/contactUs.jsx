import React, { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        alert('Gagal mengirim pesan: ' + data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Terjadi kesalahan saat mengirim pesan.');
    }
  };


  return (
    <div style={{
      padding: '80px 20px 40px',
      maxWidth: '700px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#333',
    }}>
      <h1 style={{
        color: '#1565c0',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Contact Us
      </h1>

      <p style={{ textAlign: 'center', marginBottom: '40px' }}>
        Ingin menghubungi <strong>ICR Pedigree</strong>? Silakan isi form di bawah ini atau email kami di <strong>support@icrpedigree.com</strong>.
      </p>

      {submitted && (
        <p style={{ color: 'green', textAlign: 'center' }}>
          Terima kasih! Pesan Anda telah terkirim.
        </p>
      )}

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama"
          required
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1.5px solid #90caf9',
            outline: 'none',
          }}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1.5px solid #90caf9',
            outline: 'none',
          }}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Pesan Anda"
          required
          rows={5}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1.5px solid #90caf9',
            outline: 'none',
            resize: 'vertical',
          }}
        />
        <button type="submit" style={{
          padding: '12px',
          backgroundColor: '#1565c0',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}
