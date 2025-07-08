import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>
          <Link to="/" aria-label="Go to homepage">
            <span>Job</span><span>Sprout</span>
          </Link>
        </h1>
      </div>
      <nav aria-label="Main Navigation">
        <ul className="nav-links">
          <li>
            <Link to="/" aria-label="Go to homepage">Home</Link>
          </li>
          <li>
            <Link to="/jobs" aria-label="Browse job listings">Jobs</Link>
          </li>
          <li>
            <Link to="/companies" aria-label="Explore companies">Companies</Link>
          </li>
          <li>
            <Link to="/career-advice" aria-label="Read career advice">Career Advice</Link>
          </li>
        </ul>

        <div className="auth-section">
          {user ? (
            <div className="user-menu-container">
              <div 
                className="user-profile"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="username">{user.username}</span>
              </div>
              
              {showUserMenu && (
                <div className="user-menu">
                  {isAdmin ? (
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  ) : (
                    <Link to="/user-dashboard">My Dashboard</Link>
                  )}
                  <button 
                    type="button" 
                    className="nav-button logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" aria-label="Login to your account">
                <button type="button" className="nav-button">Login</button>
              </Link>
              <Link to="/signup" aria-label="Create a new account">
                <button type="button" className="nav-button signup">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;