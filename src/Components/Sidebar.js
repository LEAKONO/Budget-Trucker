import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDollarSign, FaShoppingCart, FaList, FaCalendarAlt, FaMoneyBillWave, FaChartPie, FaBullseye, FaWallet } from 'react-icons/fa'; 
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const routes = [
    { path: '/dashboard/add-income', label: 'Add Income', icon: <FaDollarSign /> },
    { path: '/dashboard/add-expense', label: 'Add Expense', icon: <FaShoppingCart /> },
    { path: '/dashboard/transactions', label: 'Transactions', icon: <FaList /> },
    { path: '/dashboard/recent-transactions', label: 'Recent Transactions', icon: <FaCalendarAlt /> },
    { path: '/dashboard/balance', label: 'Balance', icon: <FaMoneyBillWave /> },
    { path: '/dashboard/monthly-summary', label: 'Monthly Summary', icon: <FaChartPie /> },
    { path: '/dashboard/financial-goals', label: 'Financial Goals', icon: <FaBullseye /> },
    { path: '/dashboard/add-financial-goal', label: 'Add Financial Goal', icon: <FaBullseye /> },
    { path: '/dashboard/budget', label: 'Budget', icon: <FaWallet /> },
    { path: '/dashboard/add-budget', label: 'Add Budget', icon: <FaWallet /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <ul>
          {routes.map((route) => (
            <li key={route.path} className={`sidebar-item ${location.pathname === route.path ? 'active' : ''}`}>
              <Link to={route.path} className="sidebar-link">
                <span className="sidebar-icon">{route.icon}</span>
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
