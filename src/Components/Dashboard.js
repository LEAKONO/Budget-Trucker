import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddIncome from './AddIncome';
import AddExpense from './AddExpense';
import TransactionsList from './TransactionsList';
import RecentTransactions from './RecentTransactions';
import Balance from './Balance';
import MonthlySummary from './MonthlySummary';
import { useAuth } from '../Contexts/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Routes>
        <Route path="add-income" element={<AddIncome />} />
        <Route path="add-expense" element={<AddExpense />} />
        <Route path="transactions" element={<TransactionsList />} />
        <Route path="recent-transactions" element={<RecentTransactions />} />
        <Route path="balance" element={<Balance />} />
        <Route path="monthly-summary" element={<MonthlySummary />} />
        {/* Redirect to a default route within dashboard if no sub-route matches */}
        <Route path="*" element={<Navigate to="add-income" />} />
      </Routes>
    </div>
  );
};

export default Dashboard;

