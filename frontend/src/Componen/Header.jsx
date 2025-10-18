import React from 'react';
import LogoutButton from './LogoutButton.jsx';

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: '#1565c0',
        color: '#fff',
        padding: '20px 30px',
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
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: '700',
          marginLeft: '40px', 
        }}
      >
        ICR Pedigree Dashboard
      </h1>

      <LogoutButton />
    </header>
  );
}
