import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://travella-server-v2.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log('Login Response:', data);

      if (!response.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }

      // Store token and username in AuthContext (if exists)
      if (data.token) {
        login({ token: data.token, username });
      } else {
        login({ username });
      }

      // Redirect to admin dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrapper">
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <div className="plane-icon">✈️</div>
            <span className="logo-text">TravellA</span>
          </div>
          <h2 className="admin-login-title">Admin Login</h2>
          <p className="admin-login-subtitle">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="admin-login-card">
          <div className="admin-login-card-header">
            <h3 className="admin-login-card-title">Sign In</h3>
          </div>
          <div className="admin-login-card-content">
            <form onSubmit={handleSubmit} className="admin-login-form">
              {error && (
                <div className="admin-login-error">
                  <div className="error-icon">⚠️</div>
                  <span>{error}</span>
                </div>
              )}

              <div className="admin-login-form-group">
                <div className="admin-login-input-group">
                  <label htmlFor="username" className="admin-login-label">
                    Username
                  </label>
                  <div className="admin-login-input-wrapper">
                    <div className="admin-login-input-icon">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="admin-login-input"
                      required
                    />
                  </div>
                </div>

                <div className="admin-login-input-group">
                  <label htmlFor="password" className="admin-login-label">
                    Password
                  </label>
                  <div className="admin-login-input-wrapper">
                    <div className="admin-login-input-icon">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="admin-login-input"
                      required
                    />
                    <button
                      type="button"
                      className="admin-login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-login-options">
                <div className="admin-login-remember">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="admin-login-checkbox"
                  />
                  <label htmlFor="remember-me" className="admin-login-checkbox-label">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="admin-login-forgot-password"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="admin-login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* <div className="admin-login-divider">
                <div className="admin-login-divider-line"></div>
                <span className="admin-login-divider-text">Or continue with</span>
                <div className="admin-login-divider-line"></div>
              </div> */}

              {/* <div className="admin-login-social-buttons">
                <button
                  type="button"
                  className="admin-login-social-btn"
                  onClick={() => {
                    setError('Social login will be available in the full version');
                  }}
                >
                  <svg className="admin-login-social-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="admin-login-social-btn"
                  onClick={() => {
                    setError('Social login will be available in the full version');
                  }}
                >
                  <svg className="admin-login-social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div> */}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-login-footer">
          <p className="admin-login-footer-text">
            Need help? Contact{' '}
            <a href="mailto:support@travelai.com" className="admin-login-footer-link">
              support@travelai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
