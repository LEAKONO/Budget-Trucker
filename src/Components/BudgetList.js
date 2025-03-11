import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
    color: '#555',
  },
  message: {
    fontSize: '18px',
    color: '#888',
  },
};

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('https://personal-finance-iah4.onrender.com/api/budget', config);

        setBudgets(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBudgets();
    } else {
      setError('No token provided.');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p style={styles.message}>Loading budgets...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Budget List</h2>

      {budgets.length === 0 ? (
        <p style={styles.message}>No budgets found.</p>
      ) : (
        <ul style={styles.list}>
          {budgets.map((budget) => (
            <li key={budget.id} style={styles.listItem}>
              <p><strong>Category:</strong> {budget.category}</p>
              <p><strong>Limit:</strong> ${budget.limit}</p>
              <p><strong>Year:</strong> {budget.year}</p>
              <p><strong>Month:</strong> {budget.month}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetList;