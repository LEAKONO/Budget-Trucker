import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';
import { format } from 'date-fns';

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

const FinancialGoalsList = () => {
  const [financialGoals, setFinancialGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFinancialGoals = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('https://personal-finance-iah4.onrender.com/api/financial-goals', config);
        setFinancialGoals(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching financial goals');
        setLoading(false);
      }
    };

    if (token) {
      fetchFinancialGoals();
    } else {
      setError('No token provided');
      setLoading(false);
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'yyyy-MM-dd');
  };

  if (loading) return <p style={styles.message}>Loading financial goals...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Financial Goals</h2>
      {financialGoals.length === 0 ? (
        <p style={styles.message}>No financial goals found.</p>
      ) : (
        <ul style={styles.list}>
          {financialGoals.map((goal) => (
            <li key={goal._id} style={styles.listItem}>
              <p>Goal: {goal.goalName}</p>
              <p>Target Amount: {goal.targetAmount}</p>
              <p>Current Amount: {goal.currentAmount}</p>
              <p>Target Date: {formatDate(goal.targetDate)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FinancialGoalsList;