import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './Dashboard.css';

export default function Dashboard() {
  const [userData] = useState({
    name: 'Raj Kumar',
    email: 'raj@example.com',
    phone: '+91-8765432109',
    joinDate: '2024-01-15',
    activePolicy: 'Premium Plan',
    weeklyPremium: '₹299',
    riskLevel: 'Low',
    coverageAmount: '₹50,000'
  });

  const [notifications] = useState([
    { id: 1, type: 'weather', message: '⚠️ Heavy rain expected tomorrow', time: '2 hours ago' },
    { id: 2, type: 'pollution', message: '🌫️ High pollution levels in your area', time: '5 hours ago' },
    { id: 3, type: 'alert', message: '✅ Premium payment successful', time: '1 day ago' }
  ]);

  const [claimsData] = useState([
    { id: 1, date: '2024-03-10', amount: '₹5,000', status: 'Approved', reason: 'Accident' },
    { id: 2, date: '2024-02-28', amount: '₹2,500', status: 'Approved', reason: 'Vehicle damage' },
    { id: 3, date: '2024-02-15', amount: '₹3,000', status: 'Pending', reason: 'Weather incident' }
  ]);

  const getRiskLevelColor = (level) => {
    switch(level) {
      case 'Low': return 'low';
      case 'Medium': return 'medium';
      case 'High': return 'high';
      default: return 'info';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1>Welcome, {userData.name}! 👋</h1>
        
        {/* User Info & Quick Stats */}
        <div className="dashboard-grid">
          <Card title="Profile Information" className="dashboard-card">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{userData.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Phone:</span>
              <span className="value">{userData.phone}</span>
            </div>
            <div className="info-row">
              <span className="label">Member Since:</span>
              <span className="value">{userData.joinDate}</span>
            </div>
          </Card>

          <Card title="Current Plan" className="dashboard-card">
            <div className="plan-info">
              <div className="plan-name">{userData.activePolicy}</div>
              <div className="plan-details">
                <div className="detail-row">
                  <span>Weekly Premium:</span>
                  <strong>{userData.weeklyPremium}</strong>
                </div>
                <div className="detail-row">
                  <span>Coverage Amount:</span>
                  <strong>{userData.coverageAmount}</strong>
                </div>
                <div className="detail-row">
                  <span>Risk Level:</span>
                  <Badge label={userData.riskLevel} type={getRiskLevelColor(userData.riskLevel)} />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Quick Stats" className="dashboard-card">
            <div className="stats-section">
              <div className="stat">
                <div className="stat-value">15</div>
                <div className="stat-name">Active Months</div>
              </div>
              <div className="stat">
                <div className="stat-value">3</div>
                <div className="stat-name">Claims Filed</div>
              </div>
              <div className="stat">
                <div className="stat-value">95%</div>
                <div className="stat-name">Approval Rate</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <Card title="Recent Notifications & Alerts" className="full-width-card">
          <div className="notifications-list">
            {notifications.map(notif => (
              <div key={notif.id} className={`notification-item notification-${notif.type}`}>
                <div className="notification-content">
                  <p className="notification-message">{notif.message}</p>
                  <span className="notification-time">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Claims History */}
        <Card title="Recent Claims" className="full-width-card">
          <div className="table-responsive">
            <table className="claims-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Amount Claimed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claimsData.map(claim => (
                  <tr key={claim.id}>
                    <td>{claim.date}</td>
                    <td>{claim.reason}</td>
                    <td>{claim.amount}</td>
                    <td>
                      <Badge 
                        label={claim.status} 
                        type={claim.status === 'Approved' ? 'success' : claim.status === 'Pending' ? 'warning' : 'danger'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button variant="primary" size="lg">Renew Plan</Button>
          <Button variant="secondary" size="lg">View Plans</Button>
          <Button variant="outline" size="lg">Download Invoice</Button>
        </div>
      </div>
    </div>
  );
}
