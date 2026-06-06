import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [resumeFilename, setResumeFilename] = useState('');
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/resumes/${email}`);
        if (res.data.resumes.length > 0) {
          setResumeFilename(res.data.resumes[0].filename);
        }
      } catch (err) {
        console.error('Error fetching resume');
      }
    };
    fetchResume();
  }, [email]);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/run', {
        user_email: email,
        resume_filename: resumeFilename,
      });
      setResults(res.data);
    } catch (err) {
      alert('Something went wrong. Check the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AI Results</h1>
      <p style={styles.subtitle}>Click below to let the AI agents research jobs and generate your materials.</p>

      <button
        style={loading ? styles.buttonDisabled : styles.button}
        onClick={handleRun}
        disabled={loading}
      >
        {loading ? 'Agents working... (1-2 mins)' : 'Run AI Agents →'}
      </button>

      {results && (
        <div style={styles.resultsContainer}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🔍 Job Research</h2>
            <p style={styles.cardContent}>{results.job_research}</p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📄 Resume Summary</h2>
            <p style={styles.cardContent}>{results.resume_summary}</p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>✉️ Cold Email</h2>
            <p style={styles.cardContent}>{results.cold_email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: 'white',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  subtitle: {
    color: '#94a3b8',
    marginBottom: '32px',
    textAlign: 'center',
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
    marginBottom: '40px',
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
    marginBottom: '40px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    maxWidth: '800px',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '24px',
    borderRadius: '12px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#6366f1',
  },
  cardContent: {
    color: '#cbd5e1',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
  },
};

export default Results;