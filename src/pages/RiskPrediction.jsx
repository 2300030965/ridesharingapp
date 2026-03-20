import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import './RiskPrediction.css';

export default function RiskPrediction() {
  const [inputs, setInputs] = useState({
    traffic: 'medium',
    weather: 'clear',
    speed: 50,
    timeOfDay: 'day',
    roadType: 'regular'
  });

  const [riskResult, setRiskResult] = useState(null);

  const calculateRisk = () => {
    let riskScore = 50; // Base risk score (0-100)

    // Traffic factor (0-30 points)
    const trafficFactors = {
      low: 5,
      medium: 15,
      heavy: 30
    };

    // Weather factor (0-25 points)
    const weatherFactors = {
      clear: 0,
      rain: 15,
      flood: 25
    };

    // Speed factor (0-20 points)
    let speedFactor = 0;
    if (inputs.speed > 80) speedFactor = 20;
    else if (inputs.speed > 60) speedFactor = 15;
    else if (inputs.speed > 40) speedFactor = 10;
    else speedFactor = 5;

    // Time of day factor (0-10 points)
    const timeFactors = {
      night: 10,
      day: 3,
      evening: 8
    };

    // Road type factor (0-15 points)
    const roadFactors = {
      highway: 5,
      regular: 10,
      narrow: 15
    };

    const trafficScore = trafficFactors[inputs.traffic];
    const weatherScore = weatherFactors[inputs.weather];
    const timeScore = timeFactors[inputs.timeOfDay];
    const roadScore = roadFactors[inputs.roadType];

    riskScore = trafficScore + weatherScore + speedFactor + timeScore + roadScore;
    riskScore = Math.min(100, riskScore);

    let riskLevel = 'Low';
    let riskColor = 'low';
    if (riskScore > 70) {
      riskLevel = 'High';
      riskColor = 'high';
    } else if (riskScore > 40) {
      riskLevel = 'Medium';
      riskColor = 'medium';
    }

    const factors = [
      { name: 'Traffic', score: trafficScore, value: inputs.traffic },
      { name: 'Weather', score: weatherScore, value: inputs.weather },
      { name: 'Speed', score: speedFactor, value: `${inputs.speed} km/h` },
      { name: 'Time', score: timeScore, value: inputs.timeOfDay },
      { name: 'Road', score: roadScore, value: inputs.roadType }
    ];

    const recommendations = generateRecommendations(riskScore, inputs);

    setRiskResult({
      riskLevel,
      riskColor,
      riskScore,
      factors,
      recommendations,
      premium: calculatePremiumAdjustment(riskScore)
    });
  };

  const generateRecommendations = (score, inputs) => {
    const tips = [];

    if (inputs.traffic === 'heavy') {
      tips.push('✓ Avoid peak hours if possible');
      tips.push('✓ Maintain safe distance from other vehicles');
      tips.push('✓ Use headlights even during day');
    }

    if (inputs.weather !== 'clear') {
      tips.push('✓ Reduce speed in wet conditions');
      tips.push('✓ Use windshield wipers');
      tips.push('✓ Take breaks more frequently');
    }

    if (inputs.speed > 70) {
      tips.push('✓ Reduce speed to safe limits');
      tips.push('✓ Maintain better road awareness');
    }

    if (inputs.timeOfDay === 'night') {
      tips.push('✓ Use high beam lights carefully');
      tips.push('✓ Increase alertness for sleepiness');
      tips.push('✓ Avoid long routes during night');
    }

    if (inputs.roadType === 'narrow') {
      tips.push('✓ Extra vigilance on turns');
      tips.push('✓ Go slow on curves');
      tips.push('✓ Watch for pedestrians');
    }

    if (tips.length === 0) {
      tips.push('✓ Good driving conditions - maintain awareness');
      tips.push('✓ Follow traffic rules');
      tips.push('✓ Keep emergency contacts ready');
    }

    return tips;
  };

  const calculatePremiumAdjustment = (score) => {
    let adjustment = 0;
    if (score > 70) adjustment = 299;
    else if (score > 40) adjustment = 199;
    else adjustment = 99;
    return adjustment;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'speed' ? parseInt(value) : value
    }));
  };

  const handlePredict = () => {
    calculateRisk();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="risk-prediction">
      <div className="risk-container">
        <div className="header-section">
          <h1>📊 AI Risk Prediction</h1>
          <p>Analyze road conditions and get real-time risk assessment</p>
        </div>

        <div className="risk-grid">
          {/* Input Card */}
          <Card title="Current Conditions" className="input-card">
            <div className="input-group">
              <label>Traffic Condition</label>
              <select 
                name="traffic" 
                value={inputs.traffic}
                onChange={handleChange}
                className="input-select"
              >
                <option value="low">🟢 Low Traffic</option>
                <option value="medium">🟡 Medium Traffic</option>
                <option value="heavy">🔴 Heavy Traffic</option>
              </select>
            </div>

            <div className="input-group">
              <label>Weather</label>
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
            </div>

            <div className="input-group">
              <label>Driving Speed: {inputs.speed} km/h</label>
              <input 
                type="range" 
                name="speed" 
                min="10" 
                max="120" 
                value={inputs.speed}
                onChange={handleChange}
                className="input-range"
              />
              <div className="speed-labels">
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
              </div>
            </div>

            <div className="input-group">
              <label>Time of Day</label>
              <select 
                name="timeOfDay" 
                value={inputs.timeOfDay}
                onChange={handleChange}
                className="input-select"
              >
                <option value="day">☀️ Day</option>
                <option value="evening">🌅 Evening</option>
                <option value="night">🌙 Night</option>
              </select>
            </div>

            <div className="input-group">
              <label>Road Type</label>
              <select 
                name="roadType" 
                value={inputs.roadType}
                onChange={handleChange}
                className="input-select"
              >
                <option value="highway">🛣️ Highway</option>
                <option value="regular">🛣️ Regular Road</option>
                <option value="narrow">🛣️ Narrow Road</option>
              </select>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              onClick={handlePredict}
              className="predict-button"
            >
              Predict Risk
            </Button>
          </Card>

          {/* Result Card */}
          <Card title="Risk Assessment" className="result-card">
            {riskResult ? (
              <div className="risk-content">
                <div className="risk-meter">
                  <div className={`risk-level risk-${riskResult.riskColor}`}>
                    {riskResult.riskLevel}
                  </div>
                  <div className="risk-score-display">
                    <div className="risk-score-bar">
                      <div 
                        className={`risk-score-fill risk-fill-${riskResult.riskColor}`}
                        style={{ width: `${riskResult.riskScore}%` }}
                      ></div>
                    </div>
                    <span className="risk-score-number">{riskResult.riskScore}/100</span>
                  </div>
                </div>

                <div className="risk-interpretation">
                  {riskResult.riskScore < 40 && (
                    <p className="interpretation-text">✓ Safe to drive. Maintain current practices.</p>
                  )}
                  {riskResult.riskScore >= 40 && riskResult.riskScore <= 70 && (
                    <p className="interpretation-text">⚠️ Moderate risk. Take extra precautions.</p>
                  )}
                  {riskResult.riskScore > 70 && (
                    <p className="interpretation-text">⛔ High risk. Consider postponing ride.</p>
                  )}
                </div>

                <div className="factors-breakdown">
                  <h3>Risk Factors</h3>
                  {riskResult.factors.map((factor, idx) => (
                    <div key={idx} className="factor-row">
                      <div className="factor-info">
                        <span className="factor-name">{factor.name}</span>
                        <span className="factor-value">{factor.value}</span>
                      </div>
                      <div className="factor-score">
                        <span className="score">{factor.score} pts</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider"></div>

                <div className="recommendations">
                  <h3>Safety Recommendations</h3>
                  <ul className="recommendations-list">
                    {riskResult.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="premium-info">
                  <h3>Recommended Premium</h3>
                  <div className="premium-box">
                    <span className="premium-text">₹{riskResult.premium}/week</span>
                    {riskResult.riskScore > 70 && (
                      <span className="premium-alert">Adjust plan for risk level</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <p>Enter current driving conditions to get AI risk prediction.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Risk Management Tips */}
        <Card title="Risk Management Guide" className="guide-card">
          <div className="guide-grid">
            <div className="guide-item">
              <h4>🟢 Low Risk Actions (Score 0-40)</h4>
              <ul>
                <li>Continue normal operations</li>
                <li>Regular vehicle maintenance</li>
                <li>Follow speed limits</li>
                <li>Check weather before routes</li>
              </ul>
            </div>
            <div className="guide-item">
              <h4>🟡 Medium Risk Actions (Score 41-70)</h4>
              <ul>
                <li>Reduce speed by 10-15%</li>
                <li>Increase following distance</li>
                <li>Take frequent breaks</li>
                <li>Avoid complex routes</li>
              </ul>
            </div>
            <div className="guide-item">
              <h4>🔴 High Risk Actions (Score 71-100)</h4>
              <ul>
                <li>Consider not driving</li>
                <li>Delay non-urgent rides</li>
                <li>Extra vehicle checks</li>
                <li>Alert customer support</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
