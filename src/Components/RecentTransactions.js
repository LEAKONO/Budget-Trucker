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
    textAlign: 'center',
  },
  mainHeading: {
    margin: '20px 0',
    fontSize: '28px',
    color: '#333',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
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

        const response = await axios.get(
          'https://personal-finance-iah4.onrender.com/api/transactions/recent-transactions',
          config
        );
        console.log('API response:', response.data);

        setRecentTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recent transactions:', err);
        setError(err.response ? err.response.data.message : 'An error occurred');
        setLoading(false);
      }
    };

    if (token) {
      fetchRecentTransactions();
    } else {
      console.error('No token found, unable to fetch transactions.');
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
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Amount</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Description</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.recent_incomes.map((income, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{income.amount}</td>
                <td style={styles.tableCell}>{new Date(income.date).toLocaleDateString()}</td>
                <td style={styles.tableCell}>{income.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={styles.expenseHeading}>Recent Expenses</h3>
      {recentTransactions.recent_expenses.length === 0 ? (
        <p style={styles.message}>No recent expenses found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Amount</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Description</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.recent_expenses.map((expense, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{expense.amount}</td>
                <td style={styles.tableCell}>{new Date(expense.date).toLocaleDateString()}</td>
                <td style={styles.tableCell}>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentTransactions;