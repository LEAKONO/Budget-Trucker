import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; // Update the import path as necessary

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useAuth(); // Get token from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/routes/income', [{ amount, source, date, description }], {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Income added successfully');
    } catch (error) {
      console.error('Error adding income:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" placeholder="Source" onChange={(e) => setSource(e.target.value)} required />
      <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} required />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
      <button type="submit">Add Income</button>
    </form>
  );
};

export default AddIncome;

