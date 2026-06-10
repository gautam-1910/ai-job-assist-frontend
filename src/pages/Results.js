import React, { useState, useEffect } from 'react';
import axios from 'axios';

function parseJobResearch(text) {
  const lines = text.split('\n').filter(line => line.trim());
  const jobs = [];
  let current = null;
  for (const line of lines) {
    const numbered = line.match(/^(\d+)\.\s+\*?\*?(.+?)\*?\*?$/);
    if (numbered) {
      if (current) jobs.push(current);
      current = { title: numbered[2].replace(/\*\*/g, ''), link: '', salary: '' };
    } else if (current && (line.includes('http') || line.includes('www'))) {
      current.link = line.trim();
    } else if (current && (line.includes('₹') || line.toLowerCase().includes('lpa') || line.toLowerCase().includes('per month'))) {
      current.salary = line.trim();
    }
  }
  if (current) jobs.push(current);
  return jobs;
}

function Results() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [resumeFilename, setResumeFilename] = useState('');
  const [copied, setCopied] = useState({});
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
    setResults(null);
    try {
      const res = await axios.post('http://127.0.0.1:8000/run', {
        user_email: email,
        resume_filename: resumeFilename,
      }, { timeout: 120000 });
      setResults(res.data);
    } catch (err) {
      alert('Something went wrong. Check the backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [key]: true });
    setTimeout(() => setCopied((c) => ({ ...c, [key]: false })), 2000);
  };

  const jobs = results ? parseJobResearch(results.job_research) : [];

  return (
    <div style={styles.container}>
      <div style={styles.glow} />
      <div style={styles.content}>
        <span style={styles.badge}>🤖 AI Agents</span>
        <h1 style={styles.title}>Your AI Results</h1>
        <p style={styles.subtitle}>
          Click below to let the AI agents research jobs and generate your materials.
        </p>

        <button
          style={loading ? styles.buttonDisabled : styles.button}
          onClick={handleRun}
          disabled={loading}
        >
          {loading ? (
            <span style={styles.spinnerWrapper}>
              <span style={styles.spinner} /> Agents working... (1-2 mins)
            </span>
          ) : '⚡ Run AI Agents'}
        </button>

        {loading && (
          <div style={styles.loadingCard}>
            <p style={styles.loadingStep}>🔍 Job Researcher is scanning the web...</p>
            <p style={styles.loadingStep}>📄 Resume Tailor is analyzing your profile...</p>
            <p style={styles.loadingStep}>✉️ Cold Email Writer is drafting your email...</p>
          </div>
        )}

        {results && (
          <div style={styles.resultsContainer}>

            {/* Job Research Cards */}
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>🔍 Job Research</h2>
            </div>
            {jobs.length > 0 ? (
              <div style={styles.jobGrid}>
                {jobs.map((job, i) => (
                  <div key={i} style={styles.jobCard}>
                    <div style={styles.jobIndex}>#{i + 1}</div>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    {job.salary && <p style={styles.jobSalary}>💰 {job.salary}</p>}
                    {job.link && (
                      <a href={job.link} target="_blank" rel="noreferrer" style={styles.jobLink}>
                        Apply →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <button
                    style={copied['job_research'] ? styles.copiedBtn : styles.copyBtn}
                    onClick={() => handleCopy('job_research', results.job_research)}
                  >
                    {copied['job_research'] ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <p style={styles.cardContent}>{results.job_research}</p>
              </div>
            )}

            {/* Resume Summary */}
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>📄 Resume Summary</h2>
              <button
                style={copied['resume_summary'] ? styles.copiedBtn : styles.copyBtn}
                onClick={() => handleCopy('resume_summary', results.resume_summary)}
              >
                {copied['resume_summary'] ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div style={{ ...styles.card, borderLeft: '3px solid #818cf8' }}>
              <p style={styles.cardContent}>{results.resume_summary}</p>
            </div>

            {/* Cold Email */}
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>✉️ Cold Email</h2>
              <button
                style={copied['cold_email'] ? styles.copiedBtn : styles.copyBtn}
                onClick={() => handleCopy('cold_email', results.cold_email)}
              >
                {copied['cold_email'] ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div style={{ ...styles.card, borderLeft: '3px solid #34d399' }}>
              <p style={styles.cardContent}>{results.cold_email}</p>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
    paddingBottom: '80px',
  },
  glow: {
    position: 'fixed',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
    padding: '60px 20px 0',
    width: '100%',
    maxWidth: '860px',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: 'rgba(99,102,241,0.12)',
    color: '#a5b4fc',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    marginBottom: '20px',
    border: '1px solid rgba(99,102,241,0.25)',
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: 'white',
    marginBottom: '12px',
    letterSpacing: '-1px',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '32px',
    fontSize: '1rem',
  },
  button: {
    padding: '14px 40px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    marginBottom: '32px',
    boxShadow: '0 0 20px rgba(99,102,241,0.3)',
  },
  buttonDisabled: {
    padding: '14px 40px',
    backgroundColor: '#111',
    color: '#334155',
    border: '1px solid #1e293b',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'not-allowed',
    fontWeight: '600',
    marginBottom: '32px',
  },
  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid #333',
    borderTop: '2px solid #a5b4fc',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingCard: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    padding: '24px 32px',
    marginBottom: '32px',
    textAlign: 'left',
    width: '100%',
  },
  loadingStep: {
    color: '#475569',
    fontSize: '0.95rem',
    marginBottom: '10px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '16px',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#e2e8f0',
    margin: 0,
  },
  jobGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
    width: '100%',
  },
  jobCard: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'left',
    borderTop: '3px solid #6366f1',
    transition: 'border-color 0.2s',
  },
  jobIndex: {
    color: '#6366f1',
    fontSize: '0.75rem',
    fontWeight: '700',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  jobTitle: {
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '8px',
    margin: '0 0 8px 0',
  },
  jobSalary: {
    color: '#34d399',
    fontSize: '0.85rem',
    margin: '8px 0',
  },
  jobLink: {
    color: '#818cf8',
    fontSize: '0.85rem',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '8px',
    border: '1px solid #1e293b',
    padding: '4px 12px',
    borderRadius: '6px',
  },
  card: {
    backgroundColor: '#0a0a0a',
    border: '1px solid #1a1a1a',
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'left',
    width: '100%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '12px',
  },
  copyBtn: {
    padding: '6px 14px',
    backgroundColor: 'transparent',
    color: '#475569',
    border: '1px solid #1e293b',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  copiedBtn: {
    padding: '6px 14px',
    backgroundColor: 'rgba(34,197,94,0.1)',
    color: '#86efac',
    border: '1px solid rgba(34,197,94,0.2)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
  cardContent: {
    color: '#94a3b8',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap',
    fontSize: '0.95rem',
    margin: 0,
  },
};

export default Results;