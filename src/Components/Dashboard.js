import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddIncome from './AddIncome';
import AddExpense from './AddExpense';
import Transactions from './Transactions';
import RecentTransactions from './RecentTransactions';
import Balance from './Balance';
import MonthlySummary from './MonthlySummary';
import MonthlyChart from './MonthlyChart';
import Sidebar from './Sidebar';
import FinancialGoalList from './FinancialGoalList';
import FinancialGoalForm from './FinancialGoalForm';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import Home from './Home'; // Import the Home component
import { useAuth } from '../Contexts/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '250px', padding: '20px', flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="add-income" element={<AddIncome />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="recent-transactions" element={<RecentTransactions />} />
          <Route path="balance" element={<Balance />} />
          <Route path="monthly-summary" element={<MonthlySummary />} />
          <Route path="monthly-chart" element={<MonthlyChart />} />
          <Route path="financial-goals" element={<FinancialGoalList />} />
          <Route path="add-financial-goal" element={<FinancialGoalForm />} />
          <Route path="budget" element={<BudgetList />} />
          <Route path="add-budget" element={<BudgetForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
