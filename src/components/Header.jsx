import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ userType, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to={userType === 'admin' ? '/admin' : '/dashboard'} className="header-logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">InsureGig</span>
        </Link>
        <nav className="header-nav">
          {userType === 'customer' ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/plans" className="nav-link">Plans</Link>
              <Link to="/calculator" className="nav-link">Calculator</Link>
              <Link to="/recommendations" className="nav-link">Ride Tips</Link>
              <Link to="/risk" className="nav-link">Risk Check</Link>
              <Link to="/claims" className="nav-link">Claims</Link>
              <Link to="/about" className="nav-link">About</Link>
            </>
          ) : userType === 'admin' ? (
            <>
              <Link to="/admin" className="nav-link">Dashboard</Link>
              <Link to="/about" className="nav-link">About</Link>
              <span className="admin-badge">👨‍💼 Admin</span>
            </>
          ) : null}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
