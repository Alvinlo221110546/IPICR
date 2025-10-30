import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../Utils/api.js'; 

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register({ username, password }); 
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Registrasi gagal');
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <form onSubmit={submit} style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '40px 32px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '32px',
          color: '#1565c0',
          fontWeight: '600',
          fontSize: '28px',
          letterSpacing: '0.5px'
        }}>Register</h2>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="username" style={{
            display: 'block',
            marginBottom: '8px',
            color: '#1565c0',
            fontSize: '14px',
            fontWeight: '500'
          }}>Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Masukkan username"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              height: '48px',
              padding: '0 16px',
              borderRadius: '8px',
              border: '1.5px solid #90caf9',
              outline: 'none',
              fontSize: '15px',
              transition: 'all 0.2s',
              backgroundColor: isLoading ? '#f5f5f5' : '#fff',
              boxSizing: 'border-box'
            }}
            onFocus={e => {
              if (!isLoading) {
                e.target.style.borderColor = '#1565c0';
                e.target.style.boxShadow = '0 0 0 3px rgba(21, 101, 192, 0.1)';
              }
            }}
            onBlur={e => {
              e.target.style.borderColor = '#90caf9';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label htmlFor="password" style={{
            display: 'block',
            marginBottom: '8px',
            color: '#1565c0',
            fontSize: '14px',
            fontWeight: '500'
          }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Masukkan password"
            required
            disabled={isLoading}
            style={{
              width: '100%',
              height: '48px',
              padding: '0 16px',
              borderRadius: '8px',
              border: '1.5px solid #90caf9',
              outline: 'none',
              fontSize: '15px',
              transition: 'all 0.2s',
              backgroundColor: isLoading ? '#f5f5f5' : '#fff',
              boxSizing: 'border-box'
            }}
            onFocus={e => {
              if (!isLoading) {
                e.target.style.borderColor = '#1565c0';
                e.target.style.boxShadow = '0 0 0 3px rgba(21, 101, 192, 0.1)';
              }
            }}
            onBlur={e => {
              e.target.style.borderColor = '#90caf9';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: isLoading ? '#90caf9' : '#1565c0',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 2px 8px rgba(21, 101, 192, 0.3)'
          }}
          onMouseEnter={e => {
            if (!isLoading) {
              e.target.style.backgroundColor = '#0d47a1';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(21, 101, 192, 0.4)';
            }
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = isLoading ? '#90caf9' : '#1565c0';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(21, 101, 192, 0.3)';
          }}
        >
          {isLoading ? 'Memproses...' : 'Register'}
        </button>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          fontSize: '14px',
          color: '#555'
        }}>
          Sudah punya akun?{' '}
          <span 
            onClick={goToLogin} 
            style={{ 
              color: '#1565c0', 
              cursor: 'pointer', 
              fontWeight: '600',
              textDecoration: 'none'
            }}
            onMouseEnter={e => e.target.style.color = '#0d47a1'}
            onMouseLeave={e => e.target.style.color = '#1565c0'}
          >
            Login di sini
          </span>
        </p>
      </form>
    </div>
  );
}
