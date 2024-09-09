import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard'; 
import { AuthProvider, useAuth } from './Contexts/AuthContext'; // Import useAuth here
import { useLocation } from 'react-router-dom';

// PrivateRoute component
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { token } = useAuth();
  
  return token ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect to Signup */}
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

