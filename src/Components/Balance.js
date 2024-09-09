import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; // Update the import path as necessary

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const { token } = useAuth(); // Get token from useAuth

  const fetchBalance = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/routes/balance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [token]);

  return (
    <div>
      <h2>Current Balance</h2>
      <p>${balance}</p>
    </div>
  );
};

export default Balance;
