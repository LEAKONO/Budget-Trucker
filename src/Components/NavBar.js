import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file for styling
import logo from '../Style/money.jpeg'; // Import the logo image

const NavBar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token') !== null; // Example check for authentication

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/signup" className="navbar-logo">
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </Link>
        <ul className="navbar-menu">
          {isAuthenticated ? (
            <>
              <li className={`navbar-item ${location.pathname.includes('/add-income') ? 'active' : ''}`}>
                <Link to="/add-income" className="navbar-link">Add Income</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/add-expense') ? 'active' : ''}`}>
                <Link to="/add-expense" className="navbar-link">Add Expense</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/transactions') ? 'active' : ''}`}>
                <Link to="/transactions" className="navbar-link">Transactions</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/recent-transactions') ? 'active' : ''}`}>
                <Link to="/recent-transactions" className="navbar-link">Recent Transactions</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/balance') ? 'active' : ''}`}>
                <Link to="/balance" className="navbar-link">Balance</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/monthly-summary') ? 'active' : ''}`}>
                <Link to="/monthly-summary" className="navbar-link">Monthly Summary</Link>
              </li>
              <li className="navbar-item">
                <button onClick={() => {
                  localStorage.removeItem('token'); // Logout logic
                  window.location.href = '/login';
                }} className="navbar-link">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={`navbar-item ${location.pathname.includes('/login') ? 'active' : ''}`}>
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/signup') ? 'active' : ''}`}>
                <Link to="/signup" className="navbar-link">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
