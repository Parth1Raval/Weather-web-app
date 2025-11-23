import React from 'react';
import { Sunrise, Sunset, Eye, Gauge, Wind, Droplets, CloudRain, Navigation } from 'lucide-react';

const DetailedWeatherInfo = ({ weatherData }) => {
  if (!weatherData) return null;

  const { 
    feelsLike, 
    pressure, 
    visibility, 
    sunrise, 
    sunset, 
    windSpeed, 
    windDirection,
    humidity,
    temperature 
  } = weatherData;

  const getWindDirection = (deg) => {
    if (!deg) return 'N/A';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const getUVIndex = () => {
    const hour = new Date().getHours();
    if (hour >= 10 && hour <= 16) return 'High (7-8)';
    if (hour >= 8 && hour <= 18) return 'Moderate (4-6)';
    return 'Low (1-3)';
  };

  const getDewPoint = (temp, humidity) => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return Math.round((b * alpha) / (a - alpha));
  };

  const detailItems = [
    {
      icon: Thermometer,
      label: 'Feels Like',
      value: feelsLike ? `${Math.round(feelsLike)}°C` : 'N/A',
      color: 'orange',
      description: 'Perceived temperature'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: pressure ? `${pressure} hPa` : 'N/A',
      color: 'purple',
      description: pressure > 1013 ? 'High pressure' : 'Low pressure'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: visibility ? `${visibility} km` : 'N/A',
      color: 'blue',
      description: visibility >= 10 ? 'Excellent' : visibility >= 5 ? 'Good' : 'Poor'
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: sunrise || 'N/A',
      color: 'yellow',
      description: 'Morning'
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: sunset || 'N/A',
      color: 'orange',
      description: 'Evening'
    },
    {
      icon: Navigation,
      label: 'Wind Direction',
      value: getWindDirection(windDirection),
      color: 'green',
      description: `${windDirection || 0}° degrees`
    },
    {
      icon: CloudRain,
      label: 'Dew Point',
      value: `${getDewPoint(temperature, humidity)}°C`,
      color: 'cyan',
      description: 'Condensation point'
    },
    {
      icon: Gauge,
      label: 'UV Index',
      value: getUVIndex(),
      color: 'red',
      description: 'Sun exposure level'
    }
  ];

  const colorClasses = {
    orange: 'from-orange-50 to-red-50 text-orange-600',
    purple: 'from-purple-50 to-indigo-50 text-purple-600',
    blue: 'from-blue-50 to-cyan-50 text-blue-600',
    yellow: 'from-yellow-50 to-amber-50 text-yellow-600',
    green: 'from-green-50 to-emerald-50 text-green-600',
    cyan: 'from-cyan-50 to-blue-50 text-cyan-600',
    red: 'from-red-50 to-pink-50 text-red-600'
  };

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Detailed Weather Information</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {detailItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${colorClasses[item.color]} p-4 rounded-lg hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
              </div>
              <div className="text-xl font-bold mb-1">
                {item.value}
              </div>
              <div className="text-xs text-gray-500">
                {item.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Thermometer = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export default DetailedWeatherInfo;