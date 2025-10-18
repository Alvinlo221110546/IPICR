import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Utils/api.js';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form 
        onSubmit={submit} 
        style={{
          width: '360px',
          backgroundColor: '#fff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: '#1565c0',
          fontWeight: '600',
          letterSpacing: '1px'
        }}>
          Login
        </h2>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            color: '#1565c0',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Username
          </label>
          <input 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Masukkan username"
            required 
            style={{
              width: '100%',
              height: '42px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1.5px solid #90caf9',
              outline: 'none',
              fontSize: '14px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#1565c0'}
            onBlur={e => e.target.style.borderColor = '#90caf9'}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '6px',
            color: '#1565c0',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Password
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Masukkan password" 
            required 
            style={{
              width: '100%',
              height: '42px',
              padding: '0 12px',
              borderRadius: '8px',
              border: '1.5px solid #90caf9',
              outline: 'none',
              fontSize: '14px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#1565c0'}
            onBlur={e => e.target.style.borderColor = '#90caf9'}
          />
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            height: '42px',
            backgroundColor: '#1565c0',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#0d47a1'}
          onMouseLeave={e => e.target.style.backgroundColor = '#1565c0'}
        >
          Login
        </button>
      </form>
    </div>
  );
}
