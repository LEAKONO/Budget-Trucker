import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

const Balance = () => {
  const { token } = useAuth(); 
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/routes/balance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setBalance(data.balance);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchBalance();
    }
  }, [token]);

  if (loading) {
    return <div style={styles.container}>Loading balance...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Balance</h2>
      <div style={styles.balance}>${balance}</div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#333',
  },
  balance: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default Balance;
