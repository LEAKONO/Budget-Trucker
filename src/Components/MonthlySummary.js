import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; // Update the import path as necessary

const MonthlySummary = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0 });
  const [month, setMonth] = useState('');
  const { token } = useAuth(); // Get token from useAuth

  const fetchMonthlySummary = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/routes/monthly_summary', {
        headers: { Authorization: `Bearer ${token}` },
        params: { month }
      });
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching monthly summary:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <input type="month" onChange={(e) => setMonth(e.target.value)} />
      <button onClick={fetchMonthlySummary}>Fetch Summary</button>
      
      <h2>Monthly Summary</h2>
      <p>Total Income: ${summary.totalIncome}</p>
      <p>Total Expenses: ${summary.totalExpenses}</p>
    </div>
  );
};

export default MonthlySummary;

