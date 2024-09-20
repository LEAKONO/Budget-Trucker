import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'; 
import logo from '../Style/money.jpeg'; 

const NavBar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token') !== null; 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login';
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="navbar-logo-img" />
      </div>
      <nav>
        <ul className="navbar-menu">
          {isAuthenticated && (
            <>
              <li className={`navbar-item ${location.pathname.includes('/dashboard/Home') ? 'active' : ''}`}>
                <Link to="/dashboard" className="navbar-link">Home</Link>
              </li>
              <li className={`navbar-item ${location.pathname.includes('/dashboard/monthly-chart') ? 'active' : ''}`}>
                <Link to="/dashboard/monthly-chart" className="navbar-link">Monthly Budget</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
