import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import './Landing.css';

export default function Landing() {
  const features = [
    {
      icon: '🛡️',
      title: 'Parametric Insurance',
      description: 'Smart insurance that pays based on specific triggers, not traditional claims.'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Pricing',
      description: 'Machine learning algorithms calculate fair premiums based on real-time data.'
    },
    {
      icon: '⚡',
      title: 'Weekly Premium Model',
      description: 'Pay only for the weeks you\'re working. Flexible and transparent pricing.'
    },
    {
      icon: '📱',
      title: 'Instant Claims',
      description: 'Quick claim processing with automatic payouts for covered incidents.'
    },
    {
      icon: '📊',
      title: 'Risk Analytics',
      description: 'Real-time risk assessment and recommendations to reduce incidents.'
    },
    {
      icon: '💰',
      title: 'Best Rates',
      description: 'Competitive pricing and discounts for safe driving and good behavior.'
    }
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Smart Insurance for Gig Workers</h1>
          <p className="hero-subtitle">
            AI-powered parametric insurance designed specifically for Ola, Uber, and other gig economy professionals.
          </p>
          <div className="hero-buttons">
            <Link to="/plans">
              <Button size="lg" variant="primary">Get Started Now</Button>
            </Link>
            <Link to="/calculator">
              <Button size="lg" variant="outline">Try Calculator</Button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-icon">🚗💼📊</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose InsureGig?</h2>
          <p>Revolutionary insurance designed for the gig economy</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-value">50K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">98%</div>
            <div className="stat-label">Claim Approval Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">₹500+</div>
            <div className="stat-label">Avg Weekly Coverage</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Protected?</h2>
          <p>Join thousands of gig workers earning safely with InsureGig</p>
          <Link to="/plans">
            <Button size="lg" variant="primary">Start Your Coverage</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
