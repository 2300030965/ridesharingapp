import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerLogin.css';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 4) newErrors.password = 'Password must be at least 4 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store user info in localStorage for demo
    localStorage.setItem('userType', 'customer');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');

    // Add small delay to ensure state updates, then navigate
    setTimeout(() => {
      navigate('/dashboard');
      window.location.reload();
    }, 100);
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="customer-login-container">
      <div className="login-box">
        <button className="back-btn" onClick={handleBackToLogin}>← Back</button>

        <div className="login-header">
          <div className="login-logo">👤</div>
          <h1>Customer Login</h1>
          <p>Access your insurance dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="submit" className="submit-btn">
            Login as Customer
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <p className="demo-creds">Any valid email • Any password</p>
          <p className="demo-note">This is a demo app - credentials are not verified</p>
        </div>

        <div className="signup-link">
          <p>Don't have an account? <a href="#signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
}
