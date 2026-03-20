import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './Plans.css';

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      weeklyPrice: '₹99',
      monthlyPrice: '₹399',
      coverage: '₹10,000',
      features: [
        '✓ Basic accident coverage',
        '✓ Vehicle damage protection',
        '✓ 24/7 support',
        '✗ Weather alerts',
        '✗ AI recommendations',
        '✗ Ride planning'
      ],
      color: 'basic',
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard',
      weeklyPrice: '₹199',
      monthlyPrice: '₹799',
      coverage: '₹25,000',
      features: [
        '✓ Comprehensive accident coverage',
        '✓ Vehicle damage + theft',
        '✓ 24/7 priority support',
        '✓ Weather alerts',
        '✓ Basic AI recommendations',
        '✗ Ride planning'
      ],
      color: 'standard',
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium',
      weeklyPrice: '₹299',
      monthlyPrice: '₹1,199',
      coverage: '₹50,000',
      features: [
        '✓ Full accident coverage',
        '✓ Vehicle + personal injury',
        '✓ Premium support (2hr response)',
        '✓ Real-time weather alerts',
        '✓ Advanced AI recommendations',
        '✓ Smart route planning'
      ],
      color: 'premium',
      recommended: false
    }
  ];

  return (
    <div className="plans">
      <div className="plans-container">
        <div className="plans-header">
          <h1>Choose Your Insurance Plan</h1>
          <p>Flexible coverage designed for gig workers. Pay weekly, stay protected.</p>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map(plan => (
            <Card key={plan.id} className={`plan-card plan-${plan.color} ${plan.recommended ? 'recommended' : ''}`}>
              {plan.recommended && (
                <div className="recommended-badge">
                  <Badge label="Most Popular" type="warning" />
                </div>
              )}
              
              <div className="plan-header">
                <h2>{plan.name} Plan</h2>
                <div className="plan-prices">
                  <div className="price-main">{plan.weeklyPrice}</div>
                  <div className="price-label">per week</div>
                  <div className="price-monthly">≈ {plan.monthlyPrice}/month</div>
                </div>
              </div>

              <div className="coverage-info">
                <span className="coverage-label">Coverage:</span>
                <span className="coverage-amount">{plan.coverage}</span>
              </div>

              <div className="plan-features">
                <h3>Included Features</h3>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={feature.includes('✓') ? 'included' : 'excluded'}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plan-actions">
                <Link to={`/apply?plan=${plan.id}`}>
                  <Button 
                    variant={plan.recommended ? 'primary' : 'outline'}
                    size="lg"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    Select {plan.name}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <section className="comparison-section">
          <h2>Plan Comparison</h2>
          <div className="comparison-table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th>Standard</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Weekly Premium</td>
                  <td>₹99</td>
                  <td>₹199</td>
                  <td>₹299</td>
                </tr>
                <tr>
                  <td>Coverage Amount</td>
                  <td>₹10,000</td>
                  <td>₹25,000</td>
                  <td>₹50,000</td>
                </tr>
                <tr>
                  <td>Accident Coverage</td>
                  <td>Basic</td>
                  <td>Comprehensive</td>
                  <td>Full</td>
                </tr>
                <tr>
                  <td>Vehicle Theft</td>
                  <td>❌</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>Personal Injury</td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>Support Response Time</td>
                  <td>24 hours</td>
                  <td>8 hours</td>
                  <td>2 hours</td>
                </tr>
                <tr>
                  <td>AI Recommendations</td>
                  <td>❌</td>
                  <td>Basic</td>
                  <td>Advanced</td>
                </tr>
                <tr>
                  <td>Weather Alerts</td>
                  <td>❌</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>Route Planning</td>
                  <td>❌</td>
                  <td>❌</td>
                  <td>✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <Card title="Can I switch plans?">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.
            </Card>
            <Card title="What happens if I don't work a week?">
              You can pause your coverage for up to 4 weeks per month. No charges apply during pause periods.
            </Card>
            <Card title="How fast are claims processed?">
              Basic claims are approved within 24 hours. Premium plan members get priority processing.
            </Card>
            <Card title="Is there a waiting period?">
              Coverage starts immediately after plan selection. Some conditions have a 7-day waiting period.
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
