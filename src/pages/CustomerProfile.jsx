import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './CustomerProfile.css';

export default function CustomerProfile() {
  const [customer] = useState({
    id: 'CUST001',
    name: localStorage.getItem('userName') || 'Raj Kumar',
    email: localStorage.getItem('userEmail') || 'raj@example.com',
    phone: '+91-8765432109',
    joinDate: '2024-01-15',
    status: 'Active',
    totalRides: 1250,
    totalEarnings: '₹125,000',
    membershipLevel: 'Gold',
    riskScore: 25,
    safetyRating: 4.8,
    vehicle: {
      type: 'Auto',
      model: 'Toyota Ertiga',
      year: 2022,
      regNumber: 'KA05AB1234',
      insured: true
    },
    bankDetails: {
      accountName: 'Raj Kumar',
      accountNumber: '****5678',
      ifscCode: 'HDFC0000123'
    },
    documents: {
      drivingLicense: 'Verified ✓',
      aadhar: 'Verified ✓',
      bankAccount: 'Verified ✓'
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="customer-profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-letter">{customer.name.charAt(0)}</span>
          </div>
          <div className="profile-info">
            <h1>{customer.name}</h1>
            <p>Member ID: {customer.id}</p>
            <Badge label={customer.status} type="success" />
          </div>
          <Button variant="secondary" size="md" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="profile-grid">
          {/* Personal Information */}
          <Card title="Personal Information" className="profile-card">
            <div className="info-group">
              <div className="info-row">
                <span className="label">Email</span>
                <span className="value">{customer.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone</span>
                <span className="value">{customer.phone}</span>
              </div>
              <div className="info-row">
                <span className="label">Member Since</span>
                <span className="value">{customer.joinDate}</span>
              </div>
              <div className="info-row">
                <span className="label">Membership Level</span>
                <Badge label={customer.membershipLevel} type="primary" />
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card title="Performance Metrics" className="profile-card">
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value">{customer.totalRides}</div>
                <div className="metric-label">Total Rides</div>
              </div>
              <div className="metric">
                <div className="metric-value">{customer.totalEarnings}</div>
                <div className="metric-label">Total Earnings</div>
              </div>
              <div className="metric">
                <div className="metric-value">{customer.safetyRating}</div>
                <div className="metric-label">Safety Rating</div>
              </div>
              <div className="metric">
                <div className="metric-value">{customer.riskScore}</div>
                <div className="metric-label">Risk Score</div>
              </div>
            </div>
          </Card>

          {/* Vehicle Information */}
          <Card title="Vehicle Information" className="profile-card">
            <div className="info-group">
              <div className="info-row">
                <span className="label">Vehicle Type</span>
                <span className="value">{customer.vehicle.type}</span>
              </div>
              <div className="info-row">
                <span className="label">Model</span>
                <span className="value">{customer.vehicle.model}</span>
              </div>
              <div className="info-row">
                <span className="label">Year</span>
                <span className="value">{customer.vehicle.year}</span>
              </div>
              <div className="info-row">
                <span className="label">Registration</span>
                <span className="value">{customer.vehicle.regNumber}</span>
              </div>
              <div className="info-row">
                <span className="label">Insurance Status</span>
                <Badge label={customer.vehicle.insured ? 'Insured' : 'Not Insured'} type={customer.vehicle.insured ? 'success' : 'warning'} />
              </div>
            </div>
          </Card>

          {/* Bank Details */}
          <Card title="Bank Details" className="profile-card">
            <div className="info-group">
              <div className="info-row">
                <span className="label">Account Name</span>
                <span className="value">{customer.bankDetails.accountName}</span>
              </div>
              <div className="info-row">
                <span className="label">Account Number</span>
                <span className="value">{customer.bankDetails.accountNumber}</span>
              </div>
              <div className="info-row">
                <span className="label">IFSC Code</span>
                <span className="value">{customer.bankDetails.ifscCode}</span>
              </div>
            </div>
          </Card>

          {/* Document Verification */}
          <Card title="Document Verification" className="profile-card">
            <div className="verification-list">
              <div className="verification-item">
                <span className="doc-name">Driving License</span>
                <span className="doc-status verified">{customer.documents.drivingLicense}</span>
              </div>
              <div className="verification-item">
                <span className="doc-name">Aadhar</span>
                <span className="doc-status verified">{customer.documents.aadhar}</span>
              </div>
              <div className="verification-item">
                <span className="doc-name">Bank Account</span>
                <span className="doc-status verified">{customer.documents.bankAccount}</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions" className="profile-card">
            <div className="actions-list">
              <Button variant="primary" size="sm" className="action-btn">Change Password</Button>
              <Button variant="secondary" size="sm" className="action-btn">Update Vehicle</Button>
              <Button variant="outline" size="sm" className="action-btn">Download Statements</Button>
              <Button variant="danger" size="sm" className="action-btn">Suspend Account</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
