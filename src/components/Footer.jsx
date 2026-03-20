import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About InsureGig</h3>
            <p>AI-powered parametric insurance platform for gig workers providing reliable coverage and fair pricing.</p>
          </div>
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>Weekly Premium Model</li>
              <li>AI Recommendations</li>
              <li>Parametric Triggers</li>
              <li>Fast Claims</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Email: support@insuregig.com</li>
              <li>Phone: 1-800-INSURE</li>
              <li>Hours: 24/7 Support</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} InsureGig. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
