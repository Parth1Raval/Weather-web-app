import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap, CloudRain, Wind, Snowflake, Sun, X } from 'lucide-react';

const WeatherAlerts = ({ weatherData }) => {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    if (weatherData) {
      generateAlerts(weatherData);
    }
  }, [weatherData]);

  const generateAlerts = (data) => {
    const newAlerts = [];
    
    // Temperature alerts
    if (data.temperature > 35) {
      newAlerts.push({
        id: 'heat-warning',
        type: 'warning',
        icon: Sun,
        title: 'Extreme Heat Warning',
        message: `Temperature of ${data.temperature}°C poses health risks. Stay hydrated and avoid prolonged sun exposure.`,
        severity: 'high',
        color: 'red'
      });
    } else if (data.temperature < 0) {
      newAlerts.push({
        id: 'freeze-warning',
        type: 'warning',
        icon: Snowflake,
        title: 'Freezing Temperature Alert',
        message: `Sub-zero temperature of ${data.temperature}°C. Protect pipes and dress warmly.`,
        severity: 'medium',
        color: 'blue'
      });
    }

    // Wind alerts
    if (data.windSpeed > 50) {
      newAlerts.push({
        id: 'wind-warning',
        type: 'warning',
        icon: Wind,
        title: 'High Wind Advisory',
        message: `Wind speeds of ${data.windSpeed} km/h may cause property damage. Secure loose objects.`,
        severity: 'high',
        color: 'orange'
      });
    }

    // Weather condition alerts
    if (data.condition.includes('storm') || data.condition.includes('thunder')) {
      newAlerts.push({
        id: 'storm-warning',
        type: 'danger',
        icon: Zap,
        title: 'Thunderstorm Alert',
        message: 'Severe thunderstorm conditions detected. Seek shelter immediately and avoid outdoor activities.',
        severity: 'critical',
        color: 'purple'
      });
    }

    if (data.condition.includes('rain') && data.windSpeed > 30) {
      newAlerts.push({
        id: 'severe-weather',
        type: 'warning',
        icon: CloudRain,
        title: 'Severe Weather Conditions',
        message: 'Heavy rain combined with strong winds. Exercise caution when driving.',
        severity: 'medium',
        color: 'blue'
      });
    }

    // Air quality simulation
    const mockAQI = Math.floor(Math.random() * 200) + 50;
    if (mockAQI > 150) {
      newAlerts.push({
        id: 'air-quality',
        type: 'health',
        icon: AlertTriangle,
        title: 'Poor Air Quality',
        message: `AQI of ${mockAQI} detected. Limit outdoor activities and consider wearing a mask.`,
        severity: 'medium',
        color: 'yellow'
      });
    }

    setAlerts(newAlerts.filter(alert => !dismissed.has(alert.id)));
  };

  const dismissAlert = (alertId) => {
    setDismissed(prev => new Set([...prev, alertId]));
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'from-green-500 to-emerald-600',
      medium: 'from-yellow-500 to-orange-500',
      high: 'from-orange-500 to-red-500',
      critical: 'from-red-500 to-purple-600'
    };
    return colors[severity] || colors.medium;
  };

  const getSeverityBorder = (severity) => {
    const borders = {
      low: 'border-green-500/50',
      medium: 'border-yellow-500/50',
      high: 'border-orange-500/50',
      critical: 'border-red-500/50'
    };
    return borders[severity] || borders.medium;
  };

  if (alerts.length === 0) {
    return (
      <div className="premium-card">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">Weather Alerts</h3>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-gray-300">No active weather alerts</p>
          <p className="text-sm text-gray-400 mt-1">All conditions are normal</p>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <h3 className="text-xl font-bold text-white">Weather Alerts</h3>
        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs font-medium">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <div
              key={alert.id}
              className={`relative p-4 rounded-xl border ${getSeverityBorder(alert.severity)} bg-gradient-to-r ${getSeverityColor(alert.severity)}/10 backdrop-blur-sm`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getSeverityColor(alert.severity)}/20`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{alert.title}</h4>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getSeverityColor(alert.severity)} text-white`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          Alerts are automatically generated based on current weather conditions
        </p>
      </div>
    </div>
  );
};

export default WeatherAlerts;