import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import './Calculator.css';

export default function Calculator() {
  const [inputs, setInputs] = useState({
    weather: 'clear',
    pollution: 'low',
    zoneRisk: 'low',
    experience: 'experienced',
    drivingScore: 80
  });

  const [result, setResult] = useState(null);

  // AI Simulation Logic for Premium Calculation
  const calculatePremium = () => {
    let basePremium = 150; // Base weekly premium

    // Weather Impact (30-60% increase)
    const weatherModifiers = {
      clear: 1.0,
      rain: 1.3,
      flood: 1.6
    };

    // Pollution Impact (10-40% increase)
    const pollutionModifiers = {
      low: 1.0,
      medium: 1.15,
      high: 1.3
    };

    // Zone Risk Impact (20-50% increase)
    const zoneRiskModifiers = {
      low: 1.0,
      medium: 1.25,
      high: 1.5
    };

    // Driver Experience (discount 0-15%)
    const experienceDiscount = inputs.experience === 'expert' ? 0.9 : inputs.experience === 'experienced' ? 0.95 : 1.0;

    // Driving Score (additional 0-10% discount)
    const scoreDiscount = 1 - (inputs.drivingScore / 1000);

    // Calculate final premium
    const weatherFactor = weatherModifiers[inputs.weather];
    const pollutionFactor = pollutionModifiers[inputs.pollution];
    const zoneRiskFactor = zoneRiskModifiers[inputs.zoneRisk];
    
    let premium = basePremium * weatherFactor * pollutionFactor * zoneRiskFactor * experienceDiscount * (1 - scoreDiscount);
    
    // Round to nearest 10
    premium = Math.ceil(premium / 10) * 10;

    // Generate reasoning
    const reasons = [];
    
    if (weatherFactor > 1.0) {
      reasons.push(`✓ ${inputs.weather.toUpperCase()} weather: +${Math.round((weatherFactor - 1) * 100)}%`);
    }
    
    if (pollutionFactor > 1.0) {
      reasons.push(`✓ ${inputs.pollution.toUpperCase()} pollution: +${Math.round((pollutionFactor - 1) * 100)}%`);
    }
    
    if (zoneRiskFactor > 1.0) {
      reasons.push(`✓ ${inputs.zoneRisk.toUpperCase()} zone risk: +${Math.round((zoneRiskFactor - 1) * 100)}%`);
    }
    
    if (experienceDiscount < 1.0 || scoreDiscount > 0) {
      const discount = Math.round((1 - experienceDiscount * (1 - scoreDiscount)) * 100);
      reasons.push(`✓ Experience & driving score: -${discount}%`);
    }

    setResult({
      premium: Math.max(premium, 99), // Minimum premium
      reasons,
      coverage: premiumToCoverage(premium)
    });
  };

  const premiumToCoverage = (premium) => {
    if (premium < 150) return '₹10,000';
    if (premium < 250) return '₹25,000';
    return '₹50,000';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'drivingScore' ? parseInt(value) : value
    }));
  };

  const handleCalculate = () => {
    calculatePremium();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <div className="header-section">
          <h1>🤖 AI Premium Calculator</h1>
          <p>Enter your details to get an AI-calculated personalized premium quote</p>
        </div>

        <div className="calculator-grid">
          {/* Input Card */}
          <Card title="Your Information" className="input-card">
            <div className="input-group">
              <label>Weather Condition</label>
              <select 
                name="weather" 
                value={inputs.weather}
                onChange={handleChange}
                className="input-select"
              >
                <option value="clear">☀️ Clear</option>
                <option value="rain">🌧️ Rain</option>
                <option value="flood">🌊 Flood</option>
              </select>
              <span className="input-hint">Weather impacts accident risk</span>
            </div>

            <div className="input-group">
              <label>Air Pollution Level</label>
              <select 
                name="pollution" 
                value={inputs.pollution}
                onChange={handleChange}
                className="input-select"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <span className="input-hint">Pollution affects visibility and health</span>
            </div>

            <div className="input-group">
              <label>Zone Risk Level</label>
              <select 
                name="zoneRisk" 
                value={inputs.zoneRisk}
                onChange={handleChange}
                className="input-select"
              >
                <option value="low">🟢 Low Risk</option>
                <option value="medium">🟡 Medium Risk</option>
                <option value="high">🔴 High Risk</option>
              </select>
              <span className="input-hint">Based on crime and accident rates in your area</span>
            </div>

            <div className="input-group">
              <label>Your Experience Level</label>
              <select 
                name="experience" 
                value={inputs.experience}
                onChange={handleChange}
                className="input-select"
              >
                <option value="novice">🆕 Novice (0-1 years)</option>
                <option value="experienced">⭐ Experienced (1-5 years)</option>
                <option value="expert">⭐⭐⭐ Expert (5+ years)</option>
              </select>
              <span className="input-hint">More experience gets better rates</span>
            </div>

            <div className="input-group">
              <label>Driving Safety Score: {inputs.drivingScore}/100</label>
              <input 
                type="range" 
                name="drivingScore" 
                min="0" 
                max="100" 
                value={inputs.drivingScore}
                onChange={handleChange}
                className="input-range"
              />
              <div className="score-labels">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
              <span className="input-hint">Based on traffic violations and accident history</span>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleCalculate}
              className="calc-button"
            >
              Calculate Premium
            </Button>
          </Card>

          {/* Result Card */}
          <Card title="Your Premium Quote" className="result-card">
            {result ? (
              <div className="result-content">
                <div className="premium-display">
                  <span className="premium-label">Weekly Premium</span>
                  <div className="premium-amount">₹{result.premium}</div>
                  <span className="premium-subtext">≈ ₹{Math.round(result.premium * 4.33)}/month</span>
                </div>

                <div className="coverage-display">
                  <span className="coverage-label">Estimated Coverage</span>
                  <div className="coverage-amount">{result.coverage}</div>
                </div>

                <div className="divider"></div>

                <div className="reasons-section">
                  <h3>Why This Price?</h3>
                  <div className="reasons-list">
                    <div className="reason-item base">
                      <span>Base Premium:</span>
                      <span>₹150</span>
                    </div>
                    {result.reasons.map((reason, idx) => (
                      <div key={idx} className="reason-item">
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="risk-assessment">
                  <h3>Risk Assessment</h3>
                  <div className="risk-grid">
                    <div className="risk-item">
                      <Badge label={inputs.weather.toUpperCase()} type="info" />
                      <span>Weather</span>
                    </div>
                    <div className="risk-item">
                      <Badge label={inputs.pollution.toUpperCase()} type="info" />
                      <span>Pollution</span>
                    </div>
                    <div className="risk-item">
                      <Badge label={inputs.zoneRisk.toUpperCase()} type="info" />
                      <span>Zone Risk</span>
                    </div>
                    <div className="risk-item">
                      <Badge label={inputs.experience.toUpperCase()} type="success" />
                      <span>Experience</span>
                    </div>
                  </div>
                </div>

                <div className="next-action">
                  <h3>Happy with this quote?</h3>
                  <Button variant="secondary" size="lg">Apply Now</Button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <p>Fill in your details and click "Calculate Premium" to see your personalized quote.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Info Section */}
        <Card title="How AI Calculates Your Premium" className="info-card">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">🌦️</div>
              <h4>Weather Analysis</h4>
              <p>Our AI analyzes real-time weather data. Rainy and flood conditions increase risk by up to 60%.</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🌫️</div>
              <h4>Pollution Monitoring</h4>
              <p>High pollution levels reduce visibility and affect driving safety. Premium adjusts accordingly.</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <h4>Zone Risk Detection</h4>
              <p>AI analyzes historical accident and crime data in your area to assess local risk levels.</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🎖️</div>
              <h4>Experience Rewards</h4>
              <p>Your driving experience and safety score give you discounts up to 15% off base premium.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
