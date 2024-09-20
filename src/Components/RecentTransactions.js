import React, { useEffect, useState } from 'react';
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
  mainHeading: {
    margin: '20px 0',
    fontSize: '28px',
    color: '#333',  // Main heading color
  },
  incomeHeading: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#28a745',  
  },
  expenseHeading: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#dc3545',  
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

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState({
    recent_incomes: [],
    recent_expenses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); 

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        console.log('Fetching recent transactions...');
        const config = {
          headers: { Authorization: `Bearer ${token}` }, 
        };

        
        const response = await axios.get('http://127.0.0.1:5000/routes/recent_transactions', config);
        console.log('API response:', response.data);
        
        setRecentTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching recent transactions:", err);
        setError(err.response ? err.response.data : 'An error occurred');
        setLoading(false);
      }
    };

    if (token) {
      fetchRecentTransactions(); 
    } else {
      console.error("No token found, unable to fetch transactions.");
      setError('No token provided.');
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p style={styles.message}>Loading recent transactions...</p>;
  if (error) return <p style={styles.message}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.mainHeading}>Recent Transactions</h2>

      <h3 style={styles.incomeHeading}>Recent Incomes</h3>
      {recentTransactions.recent_incomes.length === 0 ? (
        <p style={styles.message}>No recent incomes found.</p>
      ) : (
        <ul style={styles.list}>
          {recentTransactions.recent_incomes.map((income, index) => (
            <li key={index} style={styles.listItem}>
              <p>Amount: {income.amount}</p>
              <p>Date: {new Date(income.date).toLocaleDateString()}</p>
              <p>Description: {income.description}</p>
            </li>
          ))}
        </ul>
      )}

      <h3 style={styles.expenseHeading}>Recent Expenses</h3>
      {recentTransactions.recent_expenses.length === 0 ? (
        <p style={styles.message}>No recent expenses found.</p>
      ) : (
        <ul style={styles.list}>
          {recentTransactions.recent_expenses.map((expense, index) => (
            <li key={index} style={styles.listItem}>
              <p>Amount: {expense.amount}</p>
              <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
              <p>Description: {expense.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
