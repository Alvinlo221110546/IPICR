import React from 'react';
import LogoutButton from './LogoutButton.jsx';

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: '#1565c0',
        color: '#fff',
        padding: '18px 60px 18px 48px', // padding kanan lebih besar agar tombol tak tergencet
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        margin: 0,
      }}
    >
      <h1
        style={{
          fontSize: '22px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          margin: 0,
        }}
      >
        ICR Pedigree Dashboard
      </h1>

      <LogoutButton />
    </header>
  );
}
