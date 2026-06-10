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
      <div style={styles.glow} />
      <div style={styles.content}>
        <span style={styles.badge}>✨ Powered by CrewAI + Groq</span>
        <h1 style={styles.title}>AI Job Application<br />Assistant</h1>
        <p style={styles.subtitle}>
          Let AI agents research jobs, tailor your resume,<br />and write cold emails — in seconds.
        </p>
        <div style={styles.inputWrapper}>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter your email to get started"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />
          <button style={styles.button} onClick={handleStart}>
            Get Started →
          </button>
        </div>
        <div style={styles.features}>
          <div style={styles.feature}>🔍 Job Research</div>
          <div style={styles.feature}>📄 Resume Tailoring</div>
          <div style={styles.feature}>✉️ Cold Email Writing</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
  },
  glow: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
    padding: '40px 20px',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    color: '#a5b4fc',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    marginBottom: '24px',
    border: '1px solid rgba(99,102,241,0.3)',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '20px',
    lineHeight: '1.15',
    letterSpacing: '-1px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    marginBottom: '40px',
    lineHeight: '1.7',
  },
  inputWrapper: {
    display: 'flex',
    gap: '12px',
    marginBottom: '40px',
    width: '100%',
    maxWidth: '520px',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    borderRadius: '10px',
    border: '1px solid #1e293b',
    backgroundColor: '#0f172a',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '14px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  features: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  feature: {
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    color: '#94a3b8',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
};

export default Home;