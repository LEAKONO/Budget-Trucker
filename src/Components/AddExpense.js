import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; // Update the import path as necessary

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useAuth(); // Get token from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/routes/expense', { amount, category, date, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} required />
      <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} required />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
