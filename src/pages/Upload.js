import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF file');
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      await axios.post(`http://127.0.0.1:8000/upload-resume/${email}`, formData);
      navigate('/results');
    } catch (err) {
      alert('Upload failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.name.endsWith('.pdf')) {
      setFile(dropped);
    } else {
      alert('Only PDF files are allowed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.glow} />
      <div style={styles.content}>
        <span style={styles.badge}>📄 Step 2 of 2</span>
        <h1 style={styles.title}>Upload Your Resume</h1>
        <p style={styles.subtitle}>Upload your resume as a PDF. Our AI will parse and tailor it for you.</p>

        <div
          style={{ ...styles.dropzone, ...(dragging ? styles.dropzoneDragging : {}) }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div style={styles.dropIcon}>📁</div>
          <p style={styles.dropText}>
            {file ? `Selected: ${file.name}` : 'Drag & drop your PDF here'}
          </p>
          <p style={styles.dropSubtext}>or</p>
          <label style={styles.browseButton}>
            Browse File
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <button
          style={loading ? styles.buttonDisabled : styles.button}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? (
            <span>⏳ Uploading...</span>
          ) : (
            'Upload & Continue →'
          )}
        </button>
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
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
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
    width: '100%',
    maxWidth: '520px',
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
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '12px',
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: '32px',
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  dropzone: {
    width: '100%',
    border: '2px dashed #1e293b',
    borderRadius: '16px',
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    backgroundColor: '#0a0a0a',
    transition: 'border-color 0.2s',
    cursor: 'pointer',
  },
  dropzoneDragging: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.05)',
  },
  dropIcon: {
    fontSize: '2.5rem',
    marginBottom: '8px',
  },
  dropText: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500',
  },
  dropSubtext: {
    color: '#475569',
    fontSize: '0.85rem',
  },
  browseButton: {
    padding: '10px 24px',
    backgroundColor: 'rgba(99,102,241,0.15)',
    color: '#a5b4fc',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    border: '1px solid rgba(99,102,241,0.3)',
    marginTop: '8px',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
  },
  buttonDisabled: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1e293b',
    color: '#475569',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'not-allowed',
    fontWeight: '600',
  },
};

export default Upload;