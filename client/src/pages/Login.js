import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Handle navigation after successful login
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate('/user-dashboard');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setLoginSuccess(false);
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      setLoading(true);
      const result = await login(username, password);
      
      console.log('Login result:', result); // Debug log
      
      if (result.success) {
        setLoginSuccess(true);
        // Navigation will happen in useEffect
      } else {
        setError(result.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Prevent double submission
  const isSubmitDisabled = loading || loginSuccess;

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to JobSprout</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            disabled={isSubmitDisabled}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isSubmitDisabled}
          />
          <button 
            type="submit" 
            disabled={isSubmitDisabled}
          >
            {loading ? 'Logging in...' : 
             loginSuccess ? 'Success!' : 'Login'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;