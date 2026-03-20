import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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

// ✅ Protected Route
function ProtectedRoute({ children, requiredRole }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userType');

  if (!isLoggedIn || userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [authState, setAuthState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    localStorage.clear();
    setAuthState({ isLoggedIn: false, userType: null });
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // ✅ FIXED for HashRouter
  const currentPath = window.location.hash.replace('#', '');

  const isOnLoginPage =
    currentPath === '/' ||
    currentPath === '/login' ||
    currentPath === '/customer-login' ||
    currentPath === '/admin-login';

  return (
    <Router>
      <div className="app">

        {!isOnLoginPage && authState?.isLoggedIn && (
          <Header userType={authState.userType} onLogout={handleLogout} />
        )}

        <main className="main-content">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />

            {/* Customer Protected Routes */}
            <Route path="/landing" element={
              <ProtectedRoute requiredRole="customer">
                <Landing />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="customer">
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/plans" element={
              <ProtectedRoute requiredRole="customer">
                <Plans />
              </ProtectedRoute>
            } />

            <Route path="/apply" element={
              <ProtectedRoute requiredRole="customer">
                <Apply />
              </ProtectedRoute>
            } />

            <Route path="/calculator" element={
              <ProtectedRoute requiredRole="customer">
                <Calculator />
              </ProtectedRoute>
            } />

            <Route path="/recommendations" element={
              <ProtectedRoute requiredRole="customer">
                <RideRecommendation />
              </ProtectedRoute>
            } />

            <Route path="/risk" element={
              <ProtectedRoute requiredRole="customer">
                <RiskPrediction />
              </ProtectedRoute>
            } />

            <Route path="/claims" element={
              <ProtectedRoute requiredRole="customer">
                <Claims />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute requiredRole="customer">
                <CustomerProfile />
              </ProtectedRoute>
            } />

            {/* Admin Protected Route */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </main>

        {!isOnLoginPage && authState?.isLoggedIn && <Footer />}

      </div>
    </Router>
  );
}

export default App;