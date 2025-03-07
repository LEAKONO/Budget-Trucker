import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';

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
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#007bff',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
  },
};

const FinancialGoalForm = () => {
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  const formik = useFormik({
    initialValues: {
      goal_name: '',
      target_amount: '',
      current_amount: '',
      target_date: '',
    },
    validationSchema: Yup.object({
      goal_name: Yup.string().required('Goal name is required'),
      target_amount: Yup.number().required('Target amount is required'),
      current_amount: Yup.number().required('Current amount is required'),
      target_date: Yup.date().required('Target date is required'),
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          'https://personal-finance-iah4.onrender.com/api/financial-goals',
          values,
          config
        );
        setMessage('Financial goal added successfully!');
        formik.resetForm();
      } catch (error) {
        setMessage('Failed to add financial goal');
        console.error('Error adding financial goal:', error);
      }
    },
  });

  return (
    <div style={styles.form}>
      <h2>Add Financial Goal</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="goal_name">Goal Name</label>
          <input
            id="goal_name"
            name="goal_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.goal_name}
            style={styles.input}
          />
          {formik.touched.goal_name && formik.errors.goal_name ? (
            <div style={styles.errorMessage}>{formik.errors.goal_name}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="target_amount">Target Amount</label>
          <input
            id="target_amount"
            name="target_amount"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.target_amount}
            style={styles.input}
          />
          {formik.touched.target_amount && formik.errors.target_amount ? (
            <div style={styles.errorMessage}>{formik.errors.target_amount}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="current_amount">Current Amount</label>
          <input
            id="current_amount"
            name="current_amount"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.current_amount}
            style={styles.input}
          />
          {formik.touched.current_amount && formik.errors.current_amount ? (
            <div style={styles.errorMessage}>{formik.errors.current_amount}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="target_date">Target Date</label>
          <input
            id="target_date"
            name="target_date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.target_date}
            style={styles.input}
          />
          {formik.touched.target_date && formik.errors.target_date ? (
            <div style={styles.errorMessage}>{formik.errors.target_date}</div>
          ) : null}
        </div>

        <button type="submit" style={styles.button}>Add Goal</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default FinancialGoalForm;