import Card from '../components/Card';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-hero">
          <h1>About InsureGig</h1>
          <p>Revolutionary Insurance for the Gig Economy</p>
        </div>

        <section className="about-section">
          <h2>Our Mission</h2>
          <Card>
            <p>
              InsureGig is dedicated to providing AI-powered parametric insurance designed specifically 
              for gig economy workers. We understand the unique challenges faced by drivers, delivery partners, 
              and other gig professionals, and we've built a platform that offers flexible, transparent, and 
              fair insurance coverage.
            </p>
          </Card>
        </section>

        <section className="about-section">
          <h2>Why InsureGig?</h2>
          <div className="features-grid">
            <Card title="Parametric Insurance">
              <p>Smart insurance that pays based on specific triggers, ensuring you get covered when you need it most.</p>
            </Card>
            <Card title="AI-Powered Pricing">
              <p>Machine learning algorithms calculate fair premiums based on your actual risk profile and driving patterns.</p>
            </Card>
            <Card title="Weekly Payments">
              <p>Pay only for the weeks you're working. No wasted money on days you're not active.</p>
            </Card>
            <Card title="Instant Claims">
              <p>Quick claim processing with automatic approval for qualifying incidents.</p>
            </Card>
            <Card title="Risk Analytics">
              <p>Real-time risk assessment helps you stay safe and reduce insurance costs.</p>
            </Card>
            <Card title="24/7 Support">
              <p>Our dedicated support team is always here to help you with any questions or issues.</p>
            </Card>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Technology</h2>
          <Card>
            <h3>Advanced AI & Machine Learning</h3>
            <p>
              We leverage cutting-edge artificial intelligence to:
            </p>
            <ul className="tech-list">
              <li>Predict risk with 95% accuracy using real-time data</li>
              <li>Personalize premiums based on individual driving patterns</li>
              <li>Detect fraudulent claims automatically</li>
              <li>Provide real-time safety recommendations</li>
              <li>Optimize insurance coverage for each worker</li>
            </ul>
          </Card>
        </section>

        <section className="about-section">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">50,000+</div>
              <div className="stat-text">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className="stat-text">Claim Approval Rate</div>
            </div>
            <div className="stat">
              <div className="stat-number">₹28.45 Cr</div>
              <div className="stat-text">Total Payouts</div>
            </div>
            <div className="stat">
              <div className="stat-number">4.9/5</div>
              <div className="stat-text">Customer Rating</div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Team</h2>
          <Card>
            <p>
              InsureGig was founded by a team of insurance experts, AI engineers, and gig economy professionals 
              who understood the gap in the market. We're committed to making insurance simple, fair, and accessible 
              for everyone in the gig economy.
            </p>
          </Card>
        </section>

        <section className="cta-section">
          <h2>Ready to Get Protected?</h2>
          <p>Join thousands of gig workers who trust InsureGig</p>
          <Link to="/dashboard">
            <Button variant="primary" size="lg">Go to Dashboard</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
