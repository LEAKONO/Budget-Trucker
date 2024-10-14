import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard'; 
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  const [transactions, setTransactions] = useState([
    // Sample transaction data
    { id: 1, type: 'income', amount: 2000, date: '2024-01-10', description: 'Salary', category: 'Salary' },
    { id: 2, type: 'expense', amount: 500, date: '2024-01-15', description: 'Groceries', category: 'Food' },
    { id: 3, type: 'expense', amount: 200, date: '2024-01-20', description: 'Utilities', category: 'Bills' },
  ]);

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <Dashboard transactions={transactions} />
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;