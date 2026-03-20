import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [adminUsers] = useState([
    { id: 1, name: 'Raj Kumar', email: 'raj@example.com', joinDate: '2024-01-01', status: 'Active', plan: 'Premium' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', joinDate: '2024-01-15', status: 'Active', plan: 'Standard' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', joinDate: '2024-02-01', status: 'Inactive', plan: 'Basic' },
    { id: 4, name: 'Sanjana Verma', email: 'sanjana@example.com', joinDate: '2024-02-10', status: 'Active', plan: 'Premium' },
  ]);

  const [adminClaims] = useState([
    { id: 'CLM001', user: 'Raj Kumar', amount: 15000, status: 'Pending', type: 'Accident', date: '2024-03-18' },
    { id: 'CLM002', user: 'Priya Singh', amount: 8500, status: 'Pending', type: 'Theft', date: '2024-03-17' },
    { id: 'CLM003', user: 'Amit Patel', amount: 5000, status: 'Pending', type: 'Weather', date: '2024-03-16' },
  ]);

  const [stats] = useState({
    totalUsers: 2850,
    activePolicies: 2420,
    totalClaims: 345,
    approvedClaims: 298,
    totalPayout: 2845000,
    monthlyRevenue: 425000
  });

  const [selectedClaim, setSelectedClaim] = useState(null);

  const handleApproveClaim = (claimId) => {
    alert(`Claim ${claimId} has been approved!`);
  };

  const handleRejectClaim = (claimId) => {
    alert(`Claim ${claimId} has been rejected!`);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header">
          <h1>🔐 Admin Dashboard</h1>
          <p>System Control Center - Manage users, policies, and claims</p>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <Card className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-value">{stats.totalUsers.toLocaleString()}</div>
            <div className="metric-label">Total Users</div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon">📋</div>
            <div className="metric-value">{stats.activePolicies.toLocaleString()}</div>
            <div className="metric-label">Active Policies</div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-value">{stats.totalClaims}</div>
            <div className="metric-label">Total Claims</div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon">✅</div>
            <div className="metric-value">{Math.round((stats.approvedClaims / stats.totalClaims) * 100)}%</div>
            <div className="metric-label">Approval Rate</div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon">💰</div>
            <div className="metric-value">₹{(stats.totalPayout / 100000).toFixed(1)}L</div>
            <div className="metric-label">Total Payout</div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon">📈</div>
            <div className="metric-value">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</div>
            <div className="metric-label">Monthly Revenue</div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          <Card title="Platform Overview" className="chart-card">
            <div className="chart">
              <div className="chart-stat">
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '85%' }}></div>
                </div>
                <span className="bar-label">User Growth</span>
              </div>
              <div className="chart-stat">
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '72%' }}></div>
                </div>
                <span className="bar-label">Active Policies</span>
              </div>
              <div className="chart-stat">
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '65%' }}></div>
                </div>
                <span className="bar-label">Claim Rate</span>
              </div>
              <div className="chart-stat">
                <div className="chart-bar">
                  <div className="bar-fill" style={{ height: '95%' }}></div>
                </div>
                <span className="bar-label">Payouts</span>
              </div>
            </div>
          </Card>

          <Card title="Claim Statistics" className="chart-card">
            <div className="pie-chart">
              <div className="pie-item approved">
                <span className="pie-label">
                  Approved: {stats.approvedClaims}
                  <br/>({Math.round((stats.approvedClaims / stats.totalClaims) * 100)}%)
                </span>
              </div>
              <div className="pie-item pending">
                <span className="pie-label">
                  Pending: {adminClaims.length}
                  <br/>(1%)
                </span>
              </div>
              <div className="pie-item rejected">
                <span className="pie-label">
                  Rejected: {stats.totalClaims - stats.approvedClaims - adminClaims.length}
                  <br/>({Math.round(((stats.totalClaims - stats.approvedClaims - adminClaims.length) / stats.totalClaims) * 100)}%)
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Pending Claims */}
        <Card title="Pending Claims for Review" className="pending-claims-card">
          <div className="claims-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminClaims.map(claim => (
                  <tr key={claim.id}>
                    <td className="claim-id">{claim.id}</td>
                    <td>{claim.user}</td>
                    <td>{claim.type}</td>
                    <td className="amount">₹{claim.amount.toLocaleString()}</td>
                    <td>{claim.date}</td>
                    <td>
                      <Badge label={claim.status} type="warning" />
                    </td>
                    <td className="actions-cell">
                      <Button 
                        size="sm" 
                        variant="success"
                        onClick={() => handleApproveClaim(claim.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => handleRejectClaim(claim.id)}
                      >
                        Reject
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedClaim(claim)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Claim Details Modal */}
        {selectedClaim && (
          <Card title="Claim Details" className="details-modal">
            <div className="modal-overlay" onClick={() => setSelectedClaim(null)}></div>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setSelectedClaim(null)}>✕</button>
              
              <div className="detail-row">
                <span className="detail-label">Claim ID:</span>
                <span className="detail-value">{selectedClaim.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">User:</span>
                <span className="detail-value">{selectedClaim.user}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Claim Type:</span>
                <span className="detail-value">{selectedClaim.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value highlight">₹{selectedClaim.amount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date Submitted:</span>
                <span className="detail-value">{selectedClaim.date}</span>
              </div>

              <div className="divider"></div>

              <div className="modal-actions">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={() => {
                    handleApproveClaim(selectedClaim.id);
                    setSelectedClaim(null);
                  }}
                >
                  Approve Claim
                </Button>
                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={() => {
                    handleRejectClaim(selectedClaim.id);
                    setSelectedClaim(null);
                  }}
                >
                  Reject Claim
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setSelectedClaim(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* User Management */}
        <Card title="Active Users Management" className="users-card">
          <div className="users-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map(user => (
                  <tr key={user.id}>
                    <td className="user-name">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.joinDate}</td>
                    <td>{user.plan}</td>
                    <td>
                      <Badge 
                        label={user.status} 
                        type={user.status === 'Active' ? 'success' : 'warning'}
                      />
                    </td>
                    <td className="actions-cell">
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm" variant="outline">Suspend</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* System Controls */}
        <Card title="System Controls" className="system-controls">
          <div className="control-buttons">
            <Button variant="primary" size="lg">Generate Reports</Button>
            <Button variant="secondary" size="lg">View Analytics</Button>
            <Button variant="outline" size="lg">Send Notification</Button>
            <Button variant="outline" size="lg">System Settings</Button>
            <Button variant="outline" size="lg">Export Data</Button>
            <Button variant="danger" size="lg">Emergency Alert</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
