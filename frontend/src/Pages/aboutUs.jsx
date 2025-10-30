// src/Pages/AboutUs.jsx
import React from 'react';

export default function AboutUs() {
  return (
    <div
      style={{
        padding: '80px 20px 40px',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Inter, Arial, sans-serif',
        lineHeight: '1.8',
        color: '#333',
      }}
    >
      <h1
        style={{
          color: '#1565c0',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2.2rem',
          fontWeight: '700',
        }}
      >
        Tentang Kami
      </h1>

      <p style={{ marginBottom: '20px', textAlign: 'justify' }}>
        <strong>ICR Pedigree</strong> adalah sistem informasi silsilah manusia yang dikembangkan
        untuk membantu keluarga, peneliti, dan organisasi dalam mencatat, menelusuri, serta
        memvisualisasikan hubungan kekerabatan antarindividu secara akurat dan modern.
      </p>

      <p style={{ marginBottom: '20px', textAlign: 'justify' }}>
        Platform ini dirancang agar pengguna dapat dengan mudah membuat pohon keluarga digital,
        menyimpan data generasi, serta menjaga warisan sejarah keluarga secara aman dan terorganisir.
      </p>

      <h2
        style={{
          color: '#0d47a1',
          marginTop: '40px',
          marginBottom: '15px',
          fontSize: '1.5rem',
        }}
      >
        Visi Kami
      </h2>
      <p style={{ marginBottom: '20px', textAlign: 'justify' }}>
        Menjadi platform silsilah digital terpercaya yang membantu masyarakat melestarikan sejarah
        keluarga, mempererat hubungan antar generasi, dan mendukung penelitian genealogis di
        Indonesia.
      </p>

      <h2
        style={{
          color: '#0d47a1',
          marginTop: '40px',
          marginBottom: '15px',
          fontSize: '1.5rem',
        }}
      >
        Misi Kami
      </h2>
      <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyleType: 'disc' }}>
        <li>Menyediakan sistem pencatatan silsilah keluarga yang intuitif dan mudah digunakan.</li>
        <li>Memfasilitasi pelestarian data keluarga lintas generasi secara digital.</li>
        <li>Mendukung penelitian dan pengembangan dalam bidang genealogis dan sejarah keluarga.</li>
      </ul>

      <p style={{ textAlign: 'justify' }}>
        Melalui <strong>ICR Pedigree</strong>, kami percaya setiap keluarga memiliki kisah yang
        berharga untuk dijaga dan dibagikan. Dengan teknologi, kami membantu menjembatani masa lalu,
        masa kini, dan masa depan keluarga Anda.
      </p>
    </div>
  );
}
