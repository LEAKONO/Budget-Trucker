import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; // Update the import path as necessary

const TransactionsList = () => {
  const [transactions, setTransactions] = useState({ incomes: [], expenses: [] });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const { token } = useAuth(); // Get token from useAuth

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/routes/transactions', {
        headers: { Authorization: `Bearer ${token}` },
        params: { start_date: startDate, end_date: endDate, category }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error.response?.data || error.message);
    }
  }, [token, startDate, endDate, category]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <button onClick={fetchTransactions}>Fetch Transactions</button>
      
      <h2>Incomes</h2>
      <ul>
        {transactions.incomes.map((income) => (
          <li key={income.id}>
            {income.amount} - {income.source} - {income.date} - {income.description}
          </li>
        ))}
      </ul>
      
      <h2>Expenses</h2>
      <ul>
        {transactions.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.amount} - {expense.category} - {expense.date} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
