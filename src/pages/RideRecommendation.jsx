import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import './RideRecommendation.css';

export default function RideRecommendation() {
  const [inputs, setInputs] = useState({
    distance: 5,
    traffic: 'medium',
    weather: 'clear'
  });

  const [recommendation, setRecommendation] = useState(null);

  const getRideRecommendation = () => {
    let recommended = 'Auto';
    let explanation = '';
    let benefits = [];
    let riskLevel = 'medium';

    // Logic for ride recommendation
    if (inputs.traffic === 'low' && inputs.distance < 3) {
      recommended = 'Bike';
      explanation = 'Light traffic and short distance. Bike is fastest and most economical.';
      benefits = ['Fastest delivery', 'Avoid traffic', 'Low fuel cost', 'Agile navigation'];
      riskLevel = 'low';
    } else if (inputs.traffic === 'low' && inputs.distance >= 3 && inputs.distance <= 10) {
      recommended = 'Auto';
      explanation = 'Light traffic with moderate distance. Auto provides good speed and passenger comfort.';
      benefits = ['Good speed', 'Fair pricing', 'Moderate cost', 'Passenger comfort'];
      riskLevel = 'low';
    } else if (inputs.traffic === 'low' && inputs.distance > 10) {
      recommended = 'Cab';
      explanation = 'Light traffic with long distance. Cab offers best comfort and safety for distance.';
      benefits = ['Maximum comfort', 'Secure journey', 'Long distance', 'AC comfort'];
      riskLevel = 'low';
    } else if (inputs.traffic === 'medium' && inputs.distance <= 5) {
      recommended = 'Auto';
      explanation = 'Moderate traffic. Auto maneuvers well and provides good speed.';
      benefits = ['Traffic agility', 'Quick navigation', 'Fair earnings', 'Reliable'];
      riskLevel = 'medium';
    } else if (inputs.traffic === 'medium' && inputs.distance > 5) {
      recommended = 'Cab';
      explanation = 'Moderate traffic with longer distance. Cab balances comfort and efficiency.';
      benefits = ['Steady earnings', 'AC comfort', 'Passenger trust', 'Professional'];
      riskLevel = 'medium';
    } else if (inputs.traffic === 'heavy' && inputs.distance <= 3) {
      recommended = 'Bike';
      explanation = 'Heavy traffic. Bike is fastest way to navigate congested roads.';
      benefits = ['Fastest option', 'Beat traffic', 'Minimal accidents', 'Quick earnings'];
      riskLevel = 'medium-high';
    } else {
      recommended = 'Auto';
      explanation = 'Heavy traffic with distance. Auto provides best balance of speed and safety.';
      benefits = ['Better maneuvering', 'Good visibility', 'Reliable earnings', 'Traffic navigation'];
      riskLevel = 'medium-high';
    }

    // Weather adjustments
    if (inputs.weather === 'rain') {
      if (recommended === 'Bike') {
        recommended = 'Auto';
        explanation = explanation.replace('Bike', 'Auto') + ' Rain makes bike unsafe.';
        riskLevel = 'high';
      }
      benefits.push('🌧️ Weather protection');
    } else if (inputs.weather === 'flood') {
      recommended = 'Cab';
      explanation = 'Severe flooding. Cab has better ground clearance and safety.';
      benefits = ['Better traction', 'Higher clearance', 'Safe passage', 'Customer trust'];
      riskLevel = 'high';
    }

    setRecommendation({
      rideType: recommended,
      explanation,
      benefits,
      distance: inputs.distance,
      traffic: inputs.traffic,
      weather: inputs.weather,
      riskLevel,
      estimatedEarnings: getEstimatedEarnings(recommended, inputs.distance),
      estimatedTime: getEstimatedTime(recommended, inputs.distance, inputs.traffic),
      safetyTips: getSafetyTips(recommended, inputs.weather)
    });
  };

  const getEstimatedEarnings = (rideType, distance) => {
    let baseRate = 10; // Base per km
    if (rideType === 'Bike') baseRate = 8;
    else if (rideType === 'Auto') baseRate = 12;
    else if (rideType === 'Cab') baseRate = 15;

    return Math.round(baseRate * distance + 30); // 30 is minimum charge
  };

  const getEstimatedTime = (rideType, distance, traffic) => {
    let speedKmPerHour = 30;
    if (rideType === 'Bike') speedKmPerHour = 40;
    else if (rideType === 'Auto') speedKmPerHour = 25;
    else if (rideType === 'Cab') speedKmPerHour = 30;

    let multiplier = 1;
    if (traffic === 'medium') multiplier = 1.3;
    else if (traffic === 'heavy') multiplier = 1.8;

    const minutes = Math.round((distance / speedKmPerHour) * 60 * multiplier);
    return `${minutes} mins`;
  };

  const getSafetyTips = (rideType, weather) => {
    const baseTips = {
      Bike: ['Wear helmet', 'Check brakes', 'Use signals', 'Avoid blind spots'],
      Auto: ['Check mirrors', 'Follow traffic rules', 'Distance from vehicles', 'Smooth cornering'],
      Cab: ['Proper lights', 'Gentle acceleration', 'Monitor fuel', 'Check tire pressure']
    };

    let tips = baseTips[rideType] || [];

    if (weather === 'rain') {
      tips.push('Reduce speed', 'Use wipers', 'Avoid water patches');
    } else if (weather === 'flood') {
      tips.push('Avoid flooded areas', 'Use emergency lights', 'Call customer');
    }

    return tips;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === 'distance' ? parseInt(value) : value
    }));
  };

  const handleGetRecommendation = () => {
    getRideRecommendation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="ride-recommendation">
      <div className="ride-container">
        <div className="header-section">
          <h1>🚗 Smart Ride Recommendation</h1>
          <p>AI-powered system to suggest the best ride for maximum earnings and safety</p>
        </div>

        <div className="ride-grid">
          {/* Input Card */}
          <Card title="Enter Trip Details" className="input-card">
            <div className="input-group">
              <label>Distance: {inputs.distance} km</label>
              <input 
                type="range" 
                name="distance" 
                min="1" 
                max="50" 
                value={inputs.distance}
                onChange={handleChange}
                className="input-range"
              />
              <div className="distance-labels">
                <span>Short</span>
                <span>Medium</span>
                <span>Long</span>
              </div>
            </div>

            <div className="input-group">
              <label>Traffic Condition</label>
              <select 
                name="traffic" 
                value={inputs.traffic}
                onChange={handleChange}
                className="input-select"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="heavy">🔴 Heavy</option>
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

            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleGetRecommendation}
              className="recommendation-button"
            >
              Get Recommendation
            </Button>
          </Card>

          {/* Result Card */}
          <Card title="Recommended Ride" className="result-card">
            {recommendation ? (
              <div className="recommendation-content">
                <div className="ride-type-display">
                  <div className={`ride-icon ride-${recommendation.rideType.toLowerCase()}`}>
                    {recommendation.rideType === 'Bike' && '🏍️'}
                    {recommendation.rideType === 'Auto' && '🚙'}
                    {recommendation.rideType === 'Cab' && '🚖'}
                  </div>
                  <div className="ride-name">{recommendation.rideType}</div>
                  <Badge label={recommendation.riskLevel.replace('-', ' ').toUpperCase()} type="info" />
                </div>

                <p className="explanation">{recommendation.explanation}</p>

                <div className="metrics-grid">
                  <div className="metric">
                    <span className="metric-label">Est. Earnings</span>
                    <span className="metric-value">₹{recommendation.estimatedEarnings}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Est. Time</span>
                    <span className="metric-value">{recommendation.estimatedTime}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Distance</span>
                    <span className="metric-value">{recommendation.distance} km</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="benefits-section">
                  <h3>Benefits of This Ride</h3>
                  <ul className="benefits-list">
                    {recommendation.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <span className="checkmark">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="safety-tips">
                  <h3>Safety Tips</h3>
                  <ul className="tips-list">
                    {recommendation.safetyTips.map((tip, idx) => (
                      <li key={idx}>
                        <span className="tip-icon">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="success" size="lg" className="accept-button">
                  Accept Recommendation
                </Button>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🤖</div>
                <p>Enter your trip details and click "Get Recommendation" for AI-powered suggestions.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Comparison Section */}
        <Card title="Ride Type Comparison" className="comparison-card">
          <div className="comparison-table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Ride Type</th>
                  <th>Average Speed</th>
                  <th>Best For</th>
                  <th>Avg Earnings/km</th>
                  <th>Weather Safe</th>
                  <th>Passenger Comfort</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🏍️ Bike</td>
                  <td>40 km/h</td>
                  <td>Short, light traffic</td>
                  <td>₹8</td>
                  <td>❌</td>
                  <td>⭐</td>
                </tr>
                <tr>
                  <td>🚙 Auto</td>
                  <td>25 km/h</td>
                  <td>Medium distance</td>
                  <td>₹12</td>
                  <td>✅</td>
                  <td>⭐⭐</td>
                </tr>
                <tr>
                  <td>🚖 Cab</td>
                  <td>30 km/h</td>
                  <td>Long distance</td>
                  <td>₹15</td>
                  <td>✅</td>
                  <td>⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tips Section */}
        <div className="tips-grid">
          <Card title="💡 Pro Tips for Maximum Earnings">
            <ul>
              <li>Early morning rides have less traffic and higher demand</li>
              <li>Monitor weather forecasts to plan your rides safely</li>
              <li>Heavy traffic areas can mean higher fares but more safety risks</li>
              <li>Use recommended ride types to optimize time and earnings</li>
              <li>Keep your vehicle well-maintained for safety</li>
            </ul>
          </Card>

          <Card title="⚠️ Risk Management">
            <ul>
              <li>Never ride in extreme weather without proper protection</li>
              <li>Follow traffic rules to get insurance discounts</li>
              <li>Take breaks on long routes to avoid fatigue</li>
              <li>Keep emergency contacts and insurance details handy</li>
              <li>Maintain distance from other vehicles in heavy traffic</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
