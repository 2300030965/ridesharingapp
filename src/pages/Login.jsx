import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleCustomerLogin = () => {
    navigate('/customer-login');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-logo">🛡️</div>
          <h1>InsureGig</h1>
          <p>AI-Powered Insurance for Gig Workers</p>
        </div>

        <div className="role-selector">
          <h2>Select Login Type</h2>
          <div className="role-options">
            <div className="role-card" onClick={handleCustomerLogin}>
              <div className="role-icon">👤</div>
              <h3>Customer</h3>
              <p>Gig worker login</p>
              <Button variant="primary" size="md" className="role-btn">
                Login as Customer
              </Button>
            </div>

            <div className="role-card" onClick={handleAdminLogin}>
              <div className="role-icon">👨‍💼</div>
              <h3>Admin</h3>
              <p>Administrator login</p>
              <Button variant="secondary" size="md" className="role-btn">
                Login as Admin
              </Button>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <ul>
            <li><strong>Customer:</strong> Any email / Any password</li>
            <li><strong>Admin:</strong> admin@insuregig.com / admin123</li>
          </ul>
          <div className="login-links">
            <Link to="/about">About Us</Link>
            <span className="separator">•</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
