import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@insuregig.com');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (email !== 'admin@insuregig.com') newErrors.email = 'Invalid admin email';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password !== 'admin123') newErrors.password = 'Invalid password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store admin info in localStorage for demo
    localStorage.setItem('userType', 'admin');
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('isLoggedIn', 'true');

    // Add small delay to ensure state updates, then navigate
    setTimeout(() => {
      navigate('/admin');
      window.location.reload();
    }, 100);
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <button className="back-btn" onClick={handleBackToLogin}>← Back</button>

        <div className="login-header">
          <div className="login-logo">👨‍💼</div>
          <h1>Admin Login</h1>
          <p>System administrator access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="Enter admin email"
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
              placeholder="Enter password"
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
            Login as Admin
          </button>
        </form>

        <div className="login-footer">
          <p>Admin Credentials:</p>
          <p className="demo-creds">Email: admin@insuregig.com</p>
          <p className="demo-creds">Password: admin123</p>
          <p className="demo-note">Secure admin credentials for system administrators only</p>
        </div>

        <div className="security-notice">
          <span className="lock-icon">🔒</span>
          <p>Only authorized personnel can access admin dashboard</p>
        </div>
      </div>
    </div>
  );
}
