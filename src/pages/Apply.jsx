import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import './Apply.css';

export default function Apply() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    plan: planParam || 'standard',
    fullName: '',
    email: '',
    phone: '',
    vehicleNumber: '',
    vehicleType: 'car'
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const plans = [
    { id: 'basic', name: 'Basic Plan - ₹99/week', price: 99 },
    { id: 'standard', name: 'Standard Plan - ₹199/week', price: 199 },
    { id: 'premium', name: 'Premium Plan - ₹299/week', price: 299 }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle number is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const selectedPlan = plans.find(p => p.id === formData.plan);

  if (submitted) {
    return (
      <div className="apply">
        <div className="apply-container">
          <Card className="success-card full-width">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h2>Application Submitted Successfully!</h2>
              <p>Thank you for applying for {selectedPlan.name}.</p>
              
              <div className="summary">
                <div className="summary-row">
                  <span>Name:</span>
                  <strong>{formData.fullName}</strong>
                </div>
                <div className="summary-row">
                  <span>Email:</span>
                  <strong>{formData.email}</strong>
                </div>
                <div className="summary-row">
                  <span>Phone:</span>
                  <strong>{formData.phone}</strong>
                </div>
                <div className="summary-row">
                  <span>Plan:</span>
                  <strong>{selectedPlan.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Coverage Duration:</span>
                  <strong>{formData.startDate} to {formData.endDate}</strong>
                </div>
              </div>

              <div className="next-steps">
                <h3>What's Next?</h3>
                <ol>
                  <li>We'll verify your information within 2 hours</li>
                  <li>You'll receive a confirmation email with your policy details</li>
                  <li>Coverage will start on your selected start date</li>
                  <li>Keep your policy number handy for claims</li>
                </ol>
              </div>

              <Button 
                variant="primary" 
                size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    startDate: '',
                    endDate: '',
                    plan: 'standard',
                    fullName: '',
                    email: '',
                    phone: '',
                    vehicleNumber: '',
                    vehicleType: 'car'
                  });
                }}
              >
                Apply Another Plan
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="apply">
      <div className="apply-container">
        <h1>Apply for Insurance Coverage</h1>
        
        <div className="apply-grid">
          {/* Form Card */}
          <Card title="Application Form" className="form-card">
            <form onSubmit={handleSubmit} className="apply-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'input-error' : ''}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'input-error' : ''}
                      placeholder="+91-XXXXXXXXXX"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="form-section">
                <h3>Vehicle Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="vehicleNumber">Vehicle Number *</label>
                    <input
                      type="text"
                      id="vehicleNumber"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      className={errors.vehicleNumber ? 'input-error' : ''}
                      placeholder="e.g., DL-01-AB-1234"
                    />
                    {errors.vehicleNumber && <span className="error-text">{errors.vehicleNumber}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehicleType">Vehicle Type</label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                    >
                      <option value="bike">Bike / Scooter</option>
                      <option value="auto">Auto Rickshaw</option>
                      <option value="car">Car</option>
                      <option value="cab">Cab / Taxi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Coverage Period */}
              <div className="form-section">
                <h3>Coverage Period</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date *</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={errors.startDate ? 'input-error' : ''}
                    />
                    {errors.startDate && <span className="error-text">{errors.startDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="endDate">End Date *</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={errors.endDate ? 'input-error' : ''}
                    />
                    {errors.endDate && <span className="error-text">{errors.endDate}</span>}
                  </div>
                </div>
              </div>

              {/* Plan Selection */}
              <div className="form-section">
                <h3>Select Your Plan *</h3>
                
                <div className="plan-options">
                  {plans.map(plan => (
                    <label key={plan.id} className="plan-option">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={formData.plan === plan.id}
                        onChange={handleChange}
                      />
                      <span className="plan-label">{plan.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="form-section">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the Terms & Conditions and Privacy Policy</span>
                </label>
              </div>

              <div className="form-actions">
                <Button type="submit" variant="primary" size="lg">
                  Submit Application
                </Button>
              </div>
            </form>
          </Card>

          {/* Summary Card */}
          <Card title="Coverage Summary" className="summary-card">
            <div className="summary-details">
              <div className="summary-item">
                <span className="item-label">Selected Plan:</span>
                <span className="item-value">{selectedPlan.name}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Weekly Premium:</span>
                <span className="item-value highlight">₹{selectedPlan.price}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Start Date:</span>
                <span className="item-value">{formData.startDate || 'Not selected'}</span>
              </div>
              <div className="summary-item">
                <span className="item-label">End Date:</span>
                <span className="item-value">{formData.endDate || 'Not selected'}</span>
              </div>

              {formData.startDate && formData.endDate && (
                <>
                  <div className="divider"></div>
                  <div className="calculation">
                    <div className="calc-row">
                      <span>Duration:</span>
                      <span>
                        {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (7 * 24 * 60 * 60 * 1000))} weeks
                      </span>
                    </div>
                    <div className="calc-row total">
                      <span>Total Amount:</span>
                      <span>
                        ₹{selectedPlan.price * Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (7 * 24 * 60 * 60 * 1000))}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="features-list">
                <h4>Included Benefits:</h4>
                <ul>
                  {formData.plan === 'basic' && (
                    <>
                      <li>✓ Basic accident coverage</li>
                      <li>✓ Vehicle damage protection</li>
                      <li>✓ 24/7 customer support</li>
                    </>
                  )}
                  {formData.plan === 'standard' && (
                    <>
                      <li>✓ Comprehensive accident coverage</li>
                      <li>✓ Vehicle damage + theft</li>
                      <li>✓ Priority support (8 hours)</li>
                      <li>✓ Weather & pollution alerts</li>
                    </>
                  )}
                  {formData.plan === 'premium' && (
                    <>
                      <li>✓ Full accident coverage</li>
                      <li>✓ Vehicle + personal injury</li>
                      <li>✓ Premium support (2 hours)</li>
                      <li>✓ Real-time alerts & recommendations</li>
                      <li>✓ Smart route planning</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
