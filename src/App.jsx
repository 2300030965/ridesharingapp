import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import CustomerLogin from './pages/CustomerLogin';
import AdminLogin from './pages/AdminLogin';
import Landing from './pages/Landing';
import About from './pages/About';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CustomerProfile from './pages/CustomerProfile';
import Plans from './pages/Plans';
import Apply from './pages/Apply';
import Calculator from './pages/Calculator';
import RideRecommendation from './pages/RideRecommendation';
import RiskPrediction from './pages/RiskPrediction';
import Claims from './pages/Claims';
import AdminDashboard from './pages/AdminDashboard';
import './styles/variables.css';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children, userType, requiredRole }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRoleFromStorage = localStorage.getItem('userType');

  if (!isLoggedIn || userRoleFromStorage !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [authState, setAuthState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (isLoggedIn && userType) {
      setAuthState({ isLoggedIn: true, userType });
    } else {
      setAuthState({ isLoggedIn: false, userType: null });
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminEmail');
    setAuthState({ isLoggedIn: false, userType: null });
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // Login pages don't show header/footer
  const isOnLoginPage = window.location.pathname === '/' || 
                       window.location.pathname === '/login' ||
                       window.location.pathname === '/customer-login' ||
                       window.location.pathname === '/admin-login';

  return (
    <Router>
      <div className="app">
        {!isOnLoginPage && authState?.isLoggedIn && <Header userType={authState.userType} onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />

            {/* Customer Routes - Protected */}
            <Route 
              path="/landing" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <Landing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/plans" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <Plans />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/apply" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <Apply />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calculator" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <Calculator />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recommendations" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <RideRecommendation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/risk" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <RiskPrediction />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/claims" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <Claims />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute requiredRole="customer" userType={authState?.userType}>
                  <CustomerProfile />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes - Protected */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin" userType={authState?.userType}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {!isOnLoginPage && authState?.isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;
