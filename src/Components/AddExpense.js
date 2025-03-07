import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext'; 

const AddExpense = ({ onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://personal-finance-iah4.onrender.com/api/expense', 
        { amount, category, date, description }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Expense added successfully');
      if (onAdd) onAdd(); // Notify parent component to refresh data
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="date"
        placeholder="Date"
        onChange={(e) => setDate(e.target.value)}
        required
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
      ></textarea>
      <button type="submit" style={styles.button}>Add Expense</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '100px',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    marginTop: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AddExpense;
