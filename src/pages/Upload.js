import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload Your Resume</h1>
      <p style={styles.subtitle}>Upload your resume as a PDF. Our AI will parse and tailor it for you.</p>
      <div style={styles.card}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />
        {file && <p style={styles.filename}>Selected: {file.name}</p>}
        <button
          style={loading ? styles.buttonDisabled : styles.button}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload & Continue →'}
        </button>
      </div>
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
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: '40px',
    textAlign: 'center',
    maxWidth: '500px',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '400px',
  },
  fileInput: {
    color: 'white',
  },
  filename: {
    color: '#6366f1',
    fontSize: '0.9rem',
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
    width: '100%',
  },
  buttonDisabled: {
    padding: '14px 32px',
    backgroundColor: '#334155',
    color: '#64748b',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'not-allowed',
    fontWeight: 'bold',
    width: '100%',
  },
};

export default Upload;