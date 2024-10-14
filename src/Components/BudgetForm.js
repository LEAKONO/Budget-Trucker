import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBudget = () => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const budgetData = { category, limit: parseFloat(limit), year: parseInt(year), month: parseInt(month) };

    try {
      const response = await axios.post('https://budget-trucker-b.onrender.com/routes/budget', budgetData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      navigate('/budgets');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
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

  return (
    <div style={styles.form}>
      <h2>Add Budget</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <input
            style={styles.input}
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Limit:</label>
          <input
            style={styles.input}
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            style={styles.input}
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Month:</label>
          <input
            style={styles.input}
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>
        <button style={styles.button} type="submit">Add Budget</button>
      </form>
    </div>
  );
};

export default AddBudget;
