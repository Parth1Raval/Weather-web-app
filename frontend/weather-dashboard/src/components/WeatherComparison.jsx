import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const WeatherComparison = ({ weatherData }) => {
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    if (!weatherData) return;
    // Get yesterday's data from localStorage
    const yesterday = localStorage.getItem('yesterdayWeather');
    if (yesterday) {
      setComparison(JSON.parse(yesterday));
    }
    
    // Save today's data for tomorrow
    localStorage.setItem('yesterdayWeather', JSON.stringify({
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      date: new Date().toDateString()
    }));
  }, [weatherData]);

  if (!weatherData) return null;

  const getChange = (current, previous) => {
    if (!previous) return null;
    const diff = current - previous;
    return {
      value: Math.abs(diff).toFixed(1),
      trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
      percentage: ((Math.abs(diff) / previous) * 100).toFixed(0)
    };
  };

  if (!comparison) {
    return (
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Weather Comparison</h3>
        <p className="text-gray-600 text-center py-8">
          Come back tomorrow to see how weather has changed!
        </p>
      </div>
    );
  }

  const tempChange = getChange(weatherData.temperature, comparison.temperature);
  const humidityChange = getChange(weatherData.humidity, comparison.humidity);
  const windChange = getChange(weatherData.windSpeed, comparison.windSpeed);

  const comparisons = [
    {
      label: 'Temperature',
      current: `${weatherData.temperature}°C`,
      change: tempChange,
      unit: '°C'
    },
    {
      label: 'Humidity',
      current: `${weatherData.humidity}%`,
      change: humidityChange,
      unit: '%'
    },
    {
      label: 'Wind Speed',
      current: `${weatherData.windSpeed} km/h`,
      change: windChange,
      unit: ' km/h'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-blue-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-red-600 bg-red-50';
    if (trend === 'down') return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Weather Comparison</h3>
      <p className="text-sm text-gray-600 mb-4">vs Yesterday ({comparison.date})</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisons.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">{item.label}</div>
            <div className="text-2xl font-bold text-gray-800 mb-3">{item.current}</div>
            
            {item.change && (
              <div className={`flex items-center gap-2 p-2 rounded-lg ${getTrendColor(item.change.trend)}`}>
                {getTrendIcon(item.change.trend)}
                <div className="text-sm">
                  <span className="font-bold">{item.change.value}{item.unit}</span>
                  <span className="ml-1">({item.change.percentage}%)</span>
                  <div className="text-xs">
                    {item.change.trend === 'up' ? 'Higher' : item.change.trend === 'down' ? 'Lower' : 'Same'} than yesterday
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherComparison;