import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!email) return alert('Please enter your email');
    localStorage.setItem('userEmail', email);
    navigate('/upload');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Job Application Assistant</h1>
      <p style={styles.subtitle}>Let AI research jobs, tailor your resume, and write cold emails for you.</p>
      <input
        style={styles.input}
        type="email"
        placeholder="Enter your email to get started"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={styles.button} onClick={handleStart}>
        Get Started →
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    color: 'white',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    marginBottom: '40px',
    textAlign: 'center',
    maxWidth: '500px',
  },
  input: {
    width: '360px',
    padding: '14px 18px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#1e293b',
    color: 'white',
    fontSize: '1rem',
    marginBottom: '16px',
    outline: 'none',
  },
  button: {
    padding: '14px 32px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Home;