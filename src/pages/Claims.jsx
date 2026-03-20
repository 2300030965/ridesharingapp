import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './Claims.css';

export default function Claims() {
  const [activeTab, setActiveTab] = useState('submit');
  const [formData, setFormData] = useState({
    claimType: 'accident',
    date: '',
    amount: '',
    description: '',
    attachments: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [claimsHistory] = useState([
    {
      id: 'CLM001',
      date: '2024-03-10',
      type: 'Vehicle Accident',
      amount: 15000,
      status: 'Approved',
      submittedDate: '2024-03-08',
      approvedDate: '2024-03-10'
    },
    {
      id: 'CLM002',
      date: '2024-02-28',
      type: 'Theft',
      amount: 8500,
      status: 'Approved',
      submittedDate: '2024-02-28',
      approvedDate: '2024-03-01'
    },
    {
      id: 'CLM003',
      date: '2024-02-15',
      type: 'Weather Damage',
      amount: 5000,
      status: 'Pending',
      submittedDate: '2024-02-20',
      approvedDate: null
    },
    {
      id: 'CLM004',
      date: '2024-01-30',
      type: 'Minor Damage',
      amount: 2000,
      status: 'Rejected',
      submittedDate: '2024-02-01',
      approvedDate: null,
      reason: 'Claim amount below minimum threshold'
    }
  ]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Valid amount is required';
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          claimType: 'accident',
          date: '',
          amount: '',
          description: '',
          attachments: ''
        });
        setSubmitted(false);
        setActiveTab('history');
      }, 2000);
    }
  };

  const getStatusBadgeType = (status) => {
    switch(status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="claims">
      <div className="claims-container">
        <h1>Insurance Claims Management</h1>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            📝 Submit Claim
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📋 Claims History
          </button>
          <button 
            className={`tab-button ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            ❓ Claim Guide
          </button>
        </div>

        {/* Submit Claim Tab */}
        {activeTab === 'submit' && (
          <div className="tab-content">
            {submitted ? (
              <Card className="success-message">
                <div className="success-content">
                  <div className="success-icon">✓</div>
                  <h2>Claim Submitted Successfully!</h2>
                  <p>Your claim has been received. Claim ID: CLM005</p>
                  <p>We'll review and contact you within 24 hours.</p>
                </div>
              </Card>
            ) : (
              <div className="submit-grid">
                <Card title="Claim Details" className="form-card">
                  <form onSubmit={handleSubmit} className="claim-form">
                    <div className="form-group">
                      <label htmlFor="claimType">Claim Type *</label>
                      <select
                        id="claimType"
                        name="claimType"
                        value={formData.claimType}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="accident">Vehicle Accident</option>
                        <option value="theft">Theft/Burglary</option>
                        <option value="weather">Weather Damage</option>
                        <option value="mechanical">Mechanical Failure</option>
                        <option value="injury">Personal Injury</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="date">Incident Date *</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={`form-input ${errors.date ? 'input-error' : ''}`}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="amount">Claim Amount (₹) *</label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          className={`form-input ${errors.amount ? 'input-error' : ''}`}
                          placeholder="Enter amount"
                          min="0"
                        />
                        {errors.amount && <span className="error-text">{errors.amount}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description of Incident *</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                        placeholder="Describe what happened..."
                        rows="6"
                      ></textarea>
                      {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="attachments">Supporting Documents</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          id="attachments"
                          name="attachments"
                          onChange={handleChange}
                          multiple
                          className="file-input"
                        />
                        <div className="file-info">
                          📎 Upload photos, medical reports, police FIR, etc.
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <Button type="submit" variant="primary" size="lg">
                        Submit Claim
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg"
                        onClick={() => setFormData({
                          claimType: 'accident',
                          date: '',
                          amount: '',
                          description: '',
                          attachments: ''
                        })}
                      >
                        Clear Form
                      </Button>
                    </div>
                  </form>
                </Card>

                <Card title="Claim Guide" className="guide-card">
                  <div className="quick-guide">
                    <h3>Quick Tips</h3>
                    <ul>
                      <li>
                        <strong>🏃 Act Fast:</strong>
                        <br/>Submit claims within 7 days of incident
                      </li>
                      <li>
                        <strong>📸 Document:</strong>
                        <br/>Take photos/videos of damage
                      </li>
                      <li>
                        <strong>📝 Report:</strong>
                        <br/>File police/authority report if needed
                      </li>
                      <li>
                        <strong>✍️ Detail:</strong>
                        <br/>Provide complete incident description
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Claims History Tab */}
        {activeTab === 'history' && (
          <div className="tab-content">
            <Card title="Your Claims" className="full-width-card">
              <div className="claims-table-responsive">
                <table className="claims-data-table">
                  <thead>
                    <tr>
                      <th>Claim ID</th>
                      <th>Incident Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimsHistory.map(claim => (
                      <tr key={claim.id}>
                        <td className="claim-id">{claim.id}</td>
                        <td>{claim.date}</td>
                        <td>{claim.type}</td>
                        <td className="amount">₹{claim.amount.toLocaleString()}</td>
                        <td>
                          <Badge 
                            label={claim.status} 
                            type={getStatusBadgeType(claim.status)}
                          />
                        </td>
                        <td>{claim.submittedDate}</td>
                        <td>
                          <Button size="sm" variant="outline">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="claims-stats">
                <div className="stat">
                  <span className="stat-value">{claimsHistory.length}</span>
                  <span className="stat-label">Total Claims</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{claimsHistory.filter(c => c.status === 'Approved').length}</span>
                  <span className="stat-label">Approved</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    ₹{claimsHistory.filter(c => c.status === 'Approved').reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                  </span>
                  <span className="stat-label">Total Paid</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Claim Guide Tab */}
        {activeTab === 'guide' && (
          <div className="tab-content">
            <div className="guide-grid">
              <Card title="How to File a Claim">
                <ol className="guide-list">
                  <li><strong>Report Incident:</strong> Notify us immediately after incident</li>
                  <li><strong>Gather Documents:</strong> Collect all relevant proof and photos</li>
                  <li><strong>File Online:</strong> Submit claim through here or mobile app</li>
                  <li><strong>Document Review:</strong> Our team reviews submitted documents</li>
                  <li><strong>Approval/Rejection:</strong> Get decision within 48 hours</li>
                  <li><strong>Payment:</strong> Approved claims paid within 5 business days</li>
                </ol>
              </Card>

              <Card title="Claim Types & Limits">
                <div className="claim-types">
                  <div className="type-item">
                    <h4>🚗 Vehicle Damage</h4>
                    <p><strong>Coverage:</strong> Up to ₹50,000</p>
                    <p><strong>Deductible:</strong> ₹1,000</p>
                  </div>
                  <div className="type-item">
                    <h4>🔓 Theft/Burglary</h4>
                    <p><strong>Coverage:</strong> Up to ₹40,000</p>
                    <p><strong>Deductible:</strong> ₹2,000</p>
                  </div>
                  <div className="type-item">
                    <h4>⛈️ Weather Damage</h4>
                    <p><strong>Coverage:</strong> Up to ₹25,000</p>
                    <p><strong>Deductible:</strong> ₹500</p>
                  </div>
                  <div className="type-item">
                    <h4>⚕️ Medical/Injury</h4>
                    <p><strong>Coverage:</strong> Up to ₹30,000</p>
                    <p><strong>Deductible:</strong> ₹500</p>
                  </div>
                </div>
              </Card>

              <Card title="Documents You'll Need">
                <ul className="document-list">
                  <li>✓ Original insurance policy</li>
                  <li>✓ Police report (FIR) if applicable</li>
                  <li>✓ Photos/videos of damage</li>
                  <li>✓ Medical reports (if injury claim)</li>
                  <li>✓ Repair bills/quotations</li>
                  <li>✓ Receipts of vehicle maintenance</li>
                  <li>✓ Identification proof</li>
                  <li>✓ Vehicle registration documents</li>
                </ul>
              </Card>

              <Card title="FAQ">
                <div className="faq-items">
                  <div className="faq-item">
                    <h4>How long does claim processing take?</h4>
                    <p>Usually 24-48 hours. Emergency claims processed within 12 hours.</p>
                  </div>
                  <div className="faq-item">
                    <h4>Can I file a claim online?</h4>
                    <p>Yes! File claims anytime through this portal. 24/7 access available.</p>
                  </div>
                  <div className="faq-item">
                    <h4>What if my claim is rejected?</h4>
                    <p>You can appeal within 30 days. We'll provide detailed rejection reason.</p>
                  </div>
                  <div className="faq-item">
                    <h4>How will I receive payment?</h4>
                    <p>Direct bank transfer or InsureGig wallet. Amount credited within 5 days.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
