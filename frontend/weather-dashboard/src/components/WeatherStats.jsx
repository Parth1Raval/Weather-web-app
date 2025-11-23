import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const WeatherStats = ({ weatherData }) => {
  if (!weatherData) return null;

  const { temperature, humidity, windSpeed, pressure } = weatherData;

  const getComfortLevel = () => {
    if (temperature >= 20 && temperature <= 26 && humidity >= 30 && humidity <= 60) {
      return { level: 'Comfortable', color: 'green', icon: '😊' };
    } else if (temperature > 30 || humidity > 70) {
      return { level: 'Uncomfortable', color: 'red', icon: '😓' };
    } else if (temperature < 10) {
      return { level: 'Cold', color: 'blue', icon: '🥶' };
    }
    return { level: 'Moderate', color: 'yellow', icon: '😐' };
  };

  const getAirQuality = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    if (random <= 50) return { quality: 'Good', color: 'green', value: random };
    if (random <= 100) return { quality: 'Moderate', color: 'yellow', value: random };
    return { quality: 'Poor', color: 'red', value: random };
  };

  const comfort = getComfortLevel();
  const airQuality = getAirQuality();

  const stats = [
    {
      label: 'Comfort Level',
      value: comfort.level,
      icon: comfort.icon,
      color: comfort.color,
      description: 'Based on temp & humidity'
    },
    {
      label: 'Air Quality Index',
      value: airQuality.value,
      icon: '🌬️',
      color: airQuality.color,
      description: airQuality.quality
    },
    {
      label: 'Weather Trend',
      value: pressure > 1013 ? 'Improving' : 'Declining',
      icon: pressure > 1013 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />,
      color: pressure > 1013 ? 'green' : 'orange',
      description: 'Pressure based'
    },
    {
      label: 'Activity Level',
      value: windSpeed < 20 && temperature > 15 && temperature < 30 ? 'Ideal' : 'Caution',
      icon: <Activity className="w-6 h-6" />,
      color: windSpeed < 20 ? 'green' : 'orange',
      description: 'For outdoor activities'
    }
  ];

  const colorClasses = {
    green: 'from-green-50 to-emerald-50 text-green-600 border-green-200',
    yellow: 'from-yellow-50 to-amber-50 text-yellow-600 border-yellow-200',
    red: 'from-red-50 to-pink-50 text-red-600 border-red-200',
    blue: 'from-blue-50 to-cyan-50 text-blue-600 border-blue-200',
    orange: 'from-orange-50 to-red-50 text-orange-600 border-orange-200'
  };

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Weather Statistics & Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${colorClasses[stat.color]} p-4 rounded-lg border-2 hover:shadow-lg transition-all`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              <div className="text-2xl">
                {typeof stat.icon === 'string' ? stat.icon : stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherStats;