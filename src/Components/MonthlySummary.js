import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#007bff',
  },
  form: {
    margin: '20px 0',
  },
  input: {
    margin: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    fontSize: '18px',
    color: '#888',
  },
};

const MonthlySummary = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `https://personal-finance-iah4.onrender.com/api/monthly-summary?year=${year}&month=${month}`,
        config
      );
      setSummary(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token, year, month]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSummary();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Monthly Summary</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          style={styles.input}
          required
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month (1-12)"
          style={styles.input}
          required
          min="1"
          max="12"
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Get Summary'}
        </button>
      </form>

      {loading && <p style={styles.message}>Loading summary...</p>}
      {error && <p style={styles.message}>Error: {error}</p>}
      {summary && (
        <div>
          <p>Total Income: ${summary.total_income.toFixed(2)}</p>
          <p>Total Expenses: ${summary.total_expenses.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default MonthlySummary;