import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; // Update the import path as necessary

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth(); // Get token from useAuth

  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/routes/recent_transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Assuming the API response is an object with a transactions property
      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.error('Error fetching recent transactions:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRecentTransactions();
    }
  }, [token]);

  return (
    <div>
      <h2>Recent Transactions</h2>
      {Array.isArray(transactions) && transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.amount} - {transaction.source || transaction.category} - {transaction.date} - {transaction.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available</p>
      )}
    </div>
  );
};

export default RecentTransactions;

